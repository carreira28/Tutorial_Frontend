const prisma = require("../prisma/prismaClient");

const getAllTasks = async ({ completed } = {}) => {
    const where = {};
    if (completed !== undefined) {
        where.completed = completed === "true";
    }
    return await prisma.task.findMany({ where });
};

const getTaskStats = async () => {
    const total = await prisma.task.count();
    const completas = await prisma.task.count({ where: { completed: true } });
    const pendentes = await prisma.task.count({ where: { completed: false } });
    return { total, completas, pendentes };
};

const getTaskById = async (id) => {
    return await prisma.task.findUnique({ where: { id } });
};

const createTask = async ({ title, description, priority }) => {
    return await prisma.task.create({
        data: { title, description, priority },
    });
};

const updateTask = async (id, { title, description, completed, priority }) => {
    return await prisma.task.update({
        where: { id },
        data: { title, description, completed, priority },
    });
};

const toggleTask = async (id) => {
    const currentTask = await prisma.task.findUnique({ where: { id } });
    if (!currentTask) return null;

    return await prisma.task.update({
        where: { id },
        data: { completed: !currentTask.completed },
    });
};

const deleteTask = async (id) => {
    return await prisma.task.delete({ where: { id } });
};

module.exports = {
    getAllTasks,
    getTaskStats,
    getTaskById,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
};
