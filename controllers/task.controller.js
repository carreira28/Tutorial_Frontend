const taskService = require("../services/task.service");

const validPriorities = ["low", "medium", "high"];

const getAll = async (req, res, next) => {
    try {
        console.log(req.user);
        const { completed } = req.query;
        const tasks = await taskService.getAllTasks({ completed });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

const getStats = async (req, res, next) => {
    try {
        console.log(req.user);
        const stats = await taskService.getTaskStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        console.log(req.user);
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        console.log(req.user);
        const { title, description, priority } = req.body;

        if (!title || !priority) {
            return res.status(400).json({ message: "title e priority são obrigatórios" });
        }
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ message: "priority inválida. Use: low, medium ou high" });
        }

        const newTask = await taskService.createTask({ title, description, priority });
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        console.log(req.user);
        const { title, description, completed, priority } = req.body;

        if (!title || !priority) {
            return res.status(400).json({ message: "title e priority são obrigatórios" });
        }
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ message: "priority inválida. Use: low, medium ou high" });
        }

        try {
            const updatedTask = await taskService.updateTask(req.params.id, { title, description, completed, priority });
            res.status(200).json(updatedTask);
        } catch (e) {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        next(error);
    }
};

const toggle = async (req, res, next) => {
    try {
        console.log(req.user);
        const updated = await taskService.toggleTask(req.params.id);
        if (!updated) return res.status(404).json({ message: "Tarefa não encontrada" });
        res.status(200).json(updated);
    } catch (e) {
        res.status(500).json({ message: "Erro ao alternar estado" });
    }
};

const remove = async (req, res, next) => {
    try {
        console.log(req.user);
        await taskService.deleteTask(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(404).json({ message: "Tarefa não existe" });
    }
};

module.exports = { getAll, getStats, getById, create, update, toggle, remove };
