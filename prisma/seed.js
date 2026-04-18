const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
    // Limpar dados existentes
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    // Criar utilizador de exemplo
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@exemplo.com",
            password: hashedPassword,
        },
    });

    // Criar tarefas de exemplo
    await prisma.task.createMany({
        data: [
            { title: "Estudar Node.js", description: "Ver documentação oficial", priority: "high" },
            { title: "Fazer exercícios", description: "30 minutos de cardio", priority: "medium", completed: true },
            { title: "Ler livro", priority: "low" },
        ],
    });

    console.log("✅ Seed concluído com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
