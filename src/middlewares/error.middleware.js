const jwt = require("jsonwebtoken");

// Middleware de autenticação JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};

// Middleware global de erro
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Erro interno do servidor" });
};

module.exports = { authenticateToken, errorMiddleware };
