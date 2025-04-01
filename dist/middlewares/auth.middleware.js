import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "defaultsecret";
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ message: "Acesso negado. Token não fornecido." });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};
