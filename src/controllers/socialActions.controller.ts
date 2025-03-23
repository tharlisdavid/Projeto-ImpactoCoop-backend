export const getSocialActions = async (req: Request, res: Response) => {
  try {
    const socialActions = await prisma.socialAction.findMany();
    res.json(socialActions);
  } catch (error) {
    console.error("Erro ao buscar ações sociais:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
