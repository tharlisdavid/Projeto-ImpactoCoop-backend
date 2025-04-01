import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import socialActionsRoutes from "./routes/socialActions.routes.js";
dotenv.config();
const app = express(); // ✅ Inicializa o Express primeiro!
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/social-actions", socialActionsRoutes); // ✅ Agora pode ser usada corretamente
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
