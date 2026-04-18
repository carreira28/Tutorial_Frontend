const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const { errorMiddleware } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rotas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// 404 - Rota não encontrada
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware global de erro
app.use(errorMiddleware);

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Iniciar servidor apenas em desenvolvimento (local)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
    });
}

module.exports = app;
