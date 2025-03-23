import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

// Criar uma ação social
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const action = await prisma.socialAction.create({
      data: { title, description },
    });
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar ação social.", error });
  }
});

// Listar todas as ações sociais
router.get("/", async (req, res) => {
  try {
    const actions = await prisma.socialAction.findMany();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar ações sociais.", error });
  }
});

// Atualizar uma ação social
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const action = await prisma.socialAction.update({
      where: { id },
      data: { title, description },
    });

    res.json(action);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar ação social.", error });
  }
});

// Deletar uma ação social
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.socialAction.delete({ where: { id } });
    res.json({ message: "Ação social excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir ação social.", error });
  }
});

export default router;
