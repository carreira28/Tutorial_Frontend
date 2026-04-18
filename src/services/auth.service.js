const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

const signup = async ({ name, email, password }) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        const error = new Error("Email já registado");
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return { id: newUser.id, name: newUser.name, email: newUser.email };
};

const signin = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const error = new Error("Credenciais inválidas");
        error.status = 401;
        throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        const error = new Error("Credenciais inválidas");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token };
};

const getProfile = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        const error = new Error("Utilizador não encontrado");
        error.status = 404;
        throw error;
    }

    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
};

module.exports = { signup, signin, getProfile };
