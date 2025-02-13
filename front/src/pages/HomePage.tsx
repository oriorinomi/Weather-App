import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/images/ciel.png";

type City = {
	id: number;
	name: string;
	country: string;
	min_temp: number;
	max_temp: number;
	image_url: string;
};

type Forecast = {
	date: string;
	min_temp: number;
	max_temp: number;
	image_url: string;
};

const getDayName = (dateString: string) => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { weekday: "long" };
	return new Intl.DateTimeFormat("fr-FR", options).format(date);
};

const HomePage = () => {
	const { id } = useParams();
	console.log("ID récupéré :", id);

	const [city, setCity] = useState<City | null>(null);
	const [forecast, setForecast] = useState<Forecast[]>([]);

	useEffect(() => {
		// Récupérer les informations de la ville
		fetch(`http://localhost:3310/api/weather/${id}`)
			.then((response) => response.json())
			.then((data: City) => {
				console.log("Données ville :", data);
				setCity(data);
			})
			.catch((error) => console.error("Erreur récupération ville:", error));

		// Récupérer les prévisions sur 7 jours pour cette ville
		fetch(`http://localhost:3310/api/weather/${id}/forecast`)
			.then((response) => response.json())
			.then((data: Forecast[]) => setForecast(data))
			.catch((error) =>
				console.error("Error fetching weather forecast:", error),
			);
	}, [id]);

	return (
		<div
			className="p-10 flex flex-col items-center text-white min-h-screen w-auto"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="flex flex-col items-center bg-violet-400/25 p-10 rounded-3xl gap-3 w-full backdrop-blur-xs border border-purple-400">
				<h1 className="text-3xl">
					{city?.name}, {city?.country}
				</h1>
				<p>
					{city?.min_temp}°C - {city?.max_temp}°C
				</p>
				{city?.image_url && <img src={city.image_url} alt={city.name} />}
			</div>

			<section className="mt-10 flex flex-col items-center bg-violet-400/25 p-4 rounded-3xl w-full backdrop-blur-xs border border-purple-400">
				<ul className="flex flex-col gap-7">
					{forecast.map((day) => (
						<li
							key={day.date}
							className="flex gap-9 justify-between items-center"
						>
							<div className="w-7 h-7">
								<img src={day.image_url} alt="Weather Icon" />
							</div>
							<p>
								{getDayName(day.date)} : {day.min_temp}°C - {day.max_temp}°C
							</p>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default HomePage;
