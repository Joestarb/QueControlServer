import { Router } from "express";

import { getCheeses,getCheese, createCheese, updateCheese, deleteCheese } from "../controllers/cheese.controller.js";
import { autRequired } from "../middleware/validedToken.js";

const router = Router();

// router.get('/quesos',autRequired,getCheeses);
router.get('/quesos',getCheeses);
router.get('/queso/:id',getCheese);
router.post('/quesos',createCheese);
router.delete('/queso/:id',deleteCheese);
router.put('/queso/:id',updateCheese);

export default router;