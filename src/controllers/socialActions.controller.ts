import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getSocialActions = async (req: Request, res: Response) => {
  try {
    const socialActions = await prisma.socialAction.findMany();
    res.json(socialActions); // Retorna os dados em caso de sucesso
} catch (error) {
    console.error(error); // Para depuração
    res.status(500).json({ message: "Erro interno do servidor" });
}

};
