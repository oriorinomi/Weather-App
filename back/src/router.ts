import express from "express";

const router = express.Router();
const app = express();

import weatherActions from "./modules/weather/weatherActions";

// Routes principales
router.get("/weather", weatherActions.getAllWeather);
router.get("/weather/:id", weatherActions.getWeatherById);
router.post("/weather", weatherActions.addCity);
router.put("/weather/:id", weatherActions.updateCity);
router.delete("/weather/:id", weatherActions.deleteCity);

// Routes pour la météo et les prévisions
router.get("/weather/:id/forecast", weatherActions.getWeatherFor7Days);
router.post("/weather/forecast", weatherActions.addWeatherForecast);

app.use("/api", router);

export default router;
