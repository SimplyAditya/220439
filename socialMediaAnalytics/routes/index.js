import validateInput from "../middlewares/validation.js";
import express from "express";
import calculateTopUsers from "../controllers/users.js";
import calculateTopPosts from "../controllers/posts.js";
const router = express.Router();


router.get("/users", calculateTopUsers);
router.get("/posts", validateInput, calculateTopPosts);

export default router;