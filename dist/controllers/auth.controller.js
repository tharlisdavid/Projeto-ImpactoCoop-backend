import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "defaultsecret";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "E-mail já cadastrado." });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res
            .status(201)
            .json({ message: "Usuário criado com sucesso!", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
            expiresIn: "2h",
        });
        res.json({ message: "Login bem-sucedido!", token });
    }
    catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error });
    }
};
