import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const createConnection = async () => {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		});
		console.log("✅ Connecté à MySQL");
		return connection;
	} catch (error) {
		console.error("❌ Erreur de connexion MySQL:", error);
	}
};
