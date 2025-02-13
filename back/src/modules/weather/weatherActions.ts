import type { RequestHandler } from "express";
import weatherRepository from "./weatherRepository";

// Liste toutes les villes
const getAllWeather: RequestHandler = async (req, res) => {
	try {
		const cities = await weatherRepository.getAllWeather();
		res.json(cities);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Détails d'une ville
const getWeatherById: RequestHandler = async (req, res): Promise<void> => {
	const { id } = req.params;
	try {
		const city = await weatherRepository.getWeatherById(Number(id));
		if (!city) {
			res.status(404).json({ error: "City not found" });
			return;
		}
		res.json(city);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Ajouter une ville
const addCity: RequestHandler = async (req, res) => {
	const { name, country, minTemp, maxTemp, iconId } = req.body;
	try {
		const result = await weatherRepository.addCity(
			name,
			country,
			minTemp,
			maxTemp,
			iconId,
		);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Mettre à jour une ville
const updateCity: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const { name, country, minTemp, maxTemp, iconId } = req.body;
	try {
		const result = await weatherRepository.updateCity(
			Number(id),
			name,
			country,
			minTemp,
			maxTemp,
			iconId,
		);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Supprimer une ville
const deleteCity: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		await weatherRepository.deleteCity(Number(id));
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Prévisions sur 7 jours pour une ville
const getWeatherFor7Days: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const forecasts = await weatherRepository.getWeatherFor7Days(Number(id));
		res.json(forecasts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Ajouter une prévision météo
const addWeatherForecast: RequestHandler = async (req, res) => {
	const { cityId, date, minTemp, maxTemp, iconId } = req.body;
	try {
		const result = await weatherRepository.addForecast(
			cityId,
			date,
			minTemp,
			maxTemp,
			iconId,
		);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default {
	getAllWeather,
	getWeatherById,
	addCity,
	updateCity,
	deleteCity,
	getWeatherFor7Days,
	addWeatherForecast,
};
