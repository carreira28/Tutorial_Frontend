const authService = require("../src/services/auth.service");

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Campos 'name', 'email' e 'password' são obrigatórios" });
        }

        const user = await authService.signup({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        if (error.status) return res.status(error.status).json({ message: error.message });
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Campos 'email' e 'password' são obrigatórios" });
        }

        const result = await authService.signin({ email, password });
        res.status(200).json(result);
    } catch (error) {
        if (error.status) return res.status(error.status).json({ message: error.message });
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        if (error.status) return res.status(error.status).json({ message: error.message });
        next(error);
    }
};

module.exports = { signup, signin, getProfile };
