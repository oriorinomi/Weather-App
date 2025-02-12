import databaseClient from "../../database/client";
import type { Rows, Result } from "../../database/client";

export const weatherRepository = {
	// Lire toutes les villes
	async getAllWeather() {
		const [rows] = await databaseClient.query(`
      SELECT cities.id, cities.name, cities.country, cities.min_temp, cities.max_temp, icons.image_url
      FROM cities
      JOIN icons ON cities.icon_id = icons.id
    `);
		return rows;
	},

	// Lire une ville par son ID
	async getWeatherById(id: number) {
		const [rows] = await databaseClient.query(
			`
      SELECT cities.id, cities.name, cities.country, cities.min_temp, cities.max_temp, icons.image_url
      FROM cities
      JOIN icons ON cities.icon_id = icons.id
      WHERE cities.id = ?
    `,
			[id],
		);
		return rows[0];
	},

	// Récupérer la météo sur 7 jour pour une ville
	async getWeatherFor7Days(citiesid: number) {
		const [rows] = await databaseClient.query(
			`
      SELECT date, min_temp, max_temp, icon_id
      FROM forecasts
      WHERE city_id = ?
      ORDER BY date ASC
    `,
			[citiesid],
		);
		return rows;
	},

	// Ajouter une ville
	async addCity(
		name: string,
		country: string,
		minTemp: number,
		maxTemp: number,
		iconId: number,
	) {
		const [result] = await databaseClient.query<Result>(
			`
      INSERT INTO cities (name, country, min_temp, max_temp, icon_id)
      VALUES (?, ?, ?, ?, ?)
    `,
			[name, country, minTemp, maxTemp, iconId],
		);

		return result;
	},

	// Ajouter une prévision météo pour une ville
	async addForecast(
		cityId: number,
		date: string,
		minTemp: number,
		maxTemp: number,
		iconId: number,
	) {
		const [result] = await databaseClient.query<Result>(
			`
      INSERT INTO forecasts (city_id, date, min_temp, max_temp, icon_id)
      VALUES (?, ?, ?, ?, ?)
    `,
			[cityId, date, minTemp, maxTemp, iconId],
		);
		return result;
	},

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
			`
      UPDATE cities
      SET name = ?, country = ?, min_temp = ?, max_temp = ?, icon_id = ?
      WHERE id = ?
    `,
			[name, country, minTemp, maxTemp, iconId, id],
		);

		return result;
	},

	// Supprimer une ville
	async deleteCity(id: number) {
		const [result] = await databaseClient.query<Result>(
			`
      DELETE FROM cities WHERE id = ?
    `,
			[id],
		);

		return result;
	},
};
