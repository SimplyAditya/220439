import validateInput from "../middlewares/validation.js";
import calculateAverage from "../controllers/index.js";

import express from "express";
const router = express.Router();


router.get("/numbers/:numberid", validateInput, calculateAverage);

export default router;