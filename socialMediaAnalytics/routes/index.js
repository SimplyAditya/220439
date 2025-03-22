import validateInput from "../middlewares/validation.js";
import express from "express";
import calculateTopUsers from "../controllers/users.js";
const router = express.Router();


router.get("/users", calculateTopUsers);
router.get("/posts", validateInput);

export default router;