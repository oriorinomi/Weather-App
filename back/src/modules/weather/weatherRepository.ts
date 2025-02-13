import databaseClient from "../../database/client";
import type { Rows, Result } from "../../database/client";

type City = {
	id: number;
	name: string;
	country: string;
	min_temp: number;
	max_temp: number;
	image_url: string;
};

type Forecast = {
	city_id: number;
	date: string;
	min_temp: number;
	max_temp: number;
	image_url: string;
};

class WeatherRepository {
	// Lire toutes les villes
	async getAllWeather() {
		const [rows] = await databaseClient.query<Rows>(
			`SELECT cities.id, cities.name, cities.country, cities.min_temp, cities.max_temp, icons.image_url 
      FROM cities 
      JOIN icons ON cities.icon_id = icons.id`,
		);
		return rows as City[];
	}

	// Lire une ville par son ID
	async getWeatherById(id: number) {
		const [rows] = await databaseClient.query<Rows>(
			`SELECT cities.id, cities.name, cities.country, cities.min_temp, cities.max_temp, icons.image_url 
      FROM cities 
      JOIN icons ON cities.icon_id = icons.id 
      WHERE cities.id = ?`,
			[id],
		);
		return rows[0] as City;
	}

	// Récupérer la météo sur 7 jours pour une ville
	async getWeatherFor7Days(cityId: number) {
		const [rows] = await databaseClient.query<Rows>(
			`SELECT forecast.date, forecast.min_temp, forecast.max_temp, icons.image_url 
      FROM forecast 
      JOIN icons ON forecast.icon_id = icons.id 
      WHERE forecast.city_id = ? 
      ORDER BY forecast.date ASC`,
			[cityId],
		);
		return rows as Forecast[];
	}

	// Ajouter une ville
	async addCity(
		name: string,
		country: string,
		minTemp: number,
		maxTemp: number,
		iconId: number,
	) {
		const [result] = await databaseClient.query<Result>(
			`INSERT INTO cities (name, country, min_temp, max_temp, icon_id) 
      VALUES (?, ?, ?, ?, ?)`,
			[name, country, minTemp, maxTemp, iconId],
		);
		return result.insertId;
	}

	// Ajouter une prévision météo pour une ville
	async addForecast(
		cityId: number,
		date: string,
		minTemp: number,
		maxTemp: number,
		iconId: number,
	) {
		const [result] = await databaseClient.query<Result>(
			`INSERT INTO forecast (city_id, date, min_temp, max_temp, icon_id) 
      VALUES (?, ?, ?, ?, ?)`,
			[cityId, date, minTemp, maxTemp, iconId],
		);
		return result.insertId;
	}

	// Mettre à jour une ville
	async updateCity(
		id: number,
		name: string,
		country: string,
		minTemp: number,
		maxTemp: number,
		iconId: number,
	) {
		const [result] = await databaseClient.query<Result>(
			`UPDATE cities 
		  SET name = ?, country = ?, min_temp = ?, max_temp = ?, icon_id = ? 
		  WHERE id = ?`,
			[name, country, minTemp, maxTemp, iconId, id],
		);
		return result.affectedRows;
	}

	// Supprimer une ville
	async deleteCity(id: number) {
		const [result] = await databaseClient.query<Result>(
			"DELETE FROM cities WHERE id = ?",
			[id],
		);
		return result.affectedRows;
	}
}

export default new WeatherRepository();
