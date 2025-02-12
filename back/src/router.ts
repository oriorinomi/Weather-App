import express from "express";

const app = express();
app.use(express.json());

const router = express.Router();

import weatherActions from "./modules/weather/weatherActions";

router.get("/", weatherActions.getWeather);
router.get("/:id", weatherActions.getWeatherById);
router.post("/", weatherActions.addCity);
router.put("/:id", weatherActions.updateCity);
router.delete("/:id", weatherActions.deleteCity);

router.get("/weather/:id", weatherActions.getWeatherById);
router.get("/weather/:id/forecast", weatherActions.getWeatherFor7Days);
router.post("/weather", weatherActions.addCity);
router.post("/weather/forecast", weatherActions.addWeatherForecast);

export default router;
