import type { Request, Response } from "express";
import { weatherRepository } from "./weatherRepository";

const weatherActions = {
	// Récupérer toutes les villes avec leur météo
	async getWeather(req: Request, res: Response) {
		try {
			const weatherData = await weatherRepository.getAllWeather();
			res.json(weatherData);
		} catch (error) {
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des données météo." });
		}
	},

	// Récupérer une ville spécifique
	async getWeatherById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number.parseInt(req.params.id);
			const weather = await weatherRepository.getWeatherById(id);
			if (!weather) {
				res.status(404).json({ message: "Ville non trouvée" });
				return;
			}
			res.json(weather);
		} catch (error) {
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération de la ville." });
		}
	},

	// Récupérer la météo pour 7 jours d'une ville
	async getWeatherFor7Days(req: Request, res: Response): Promise<void> {
		try {
			const id = Number.parseInt(req.params.id);
			const weather = await weatherRepository.getWeatherFor7Days(id);
			if (!Array.isArray(weather) || !weather.length) {
				res.status(404).json({ message: "Ville non trouvée" });
			}
			res.json(weather);
		} catch (error) {
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération de la météo." });
		}
	},

	// Ajouter une ville
	async addCity(req: Request, res: Response): Promise<void> {
		try {
			const { name, country, minTemp, maxTemp, iconId } = req.body;
			if (
				!name ||
				!country ||
				minTemp === undefined ||
				maxTemp === undefined ||
				!iconId
			) {
				res.status(400).json({ error: "Données manquantes" });
				return;
			}
			const result = await weatherRepository.addCity(
				name,
				country,
				minTemp,
				maxTemp,
				iconId,
			);
			res
				.status(201)
				.json({ message: "Ville ajoutée avec succès", id: result.insertId });
		} catch (error) {
			res.status(500).json({ error: "Erreur lors de l'ajout de la ville." });
		}
	},

	// Ajouter une prévision météo pour une ville
	async addWeatherForecast(req: Request, res: Response): Promise<void> {
		try {
			const { citiesId, forecasts } = req.body;
			if (!citiesId || !forecasts || !Array.isArray(forecasts)) {
				res.status(400).json({ error: "Données invalides" });
			}

			for (const forecast of forecasts) {
				const { date, minTemp, maxTemp, iconId } = forecast;
				await weatherRepository.addForecast(
					citiesId,
					date,
					minTemp,
					maxTemp,
					iconId,
				);
			}

			res.status(201).json({ message: "Prévisions ajoutées avec succès" });
		} catch (error) {
			res.status(500).json({ error: "Erreur lors de l'ajout des prévisions." });
		}
	},

	// Mettre à jour une ville
	async updateCity(req: Request, res: Response) {
		try {
			const id = Number.parseInt(req.params.id);
			const { name, country, minTemp, maxTemp, iconId } = req.body;
			const result = await weatherRepository.updateCity(
				id,
				name,
				country,
				minTemp,
				maxTemp,
				iconId,
			);
			res.json({ message: "Ville mise à jour avec succès" });
		} catch (error) {
			res
				.status(500)
				.json({ error: "Erreur lors de la mise à jour de la ville." });
		}
	},

	// Supprimer une ville
	async deleteCity(req: Request, res: Response) {
		try {
			const id = Number.parseInt(req.params.id);
			await weatherRepository.deleteCity(id);
			res.json({ message: "Ville supprimée avec succès" });
		} catch (error) {
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression de la ville." });
		}
	},
};

export default weatherActions;
