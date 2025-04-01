export const getSocialActions = async (req, res) => {
    try {
        const socialActions = await prisma.socialAction.findMany();
        res.json(socialActions);
    }
    catch (error) {
        console.error("Erro ao buscar ações sociais:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
