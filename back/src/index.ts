import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createConnection } from "./db";
import router from "./router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

createConnection(); // Connexion MySQL

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
