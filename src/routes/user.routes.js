import { Router } from "express";

import { getUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario, login } from "../controllers/user.controller.js";

const router = Router();

router.get('/usuarios',getUsuarios);
router.get('/usuarios/:id',getUsuario);
router.post('/usuarios',createUsuario);
router.delete('/usuario/:id',deleteUsuario);
router.put('/usuarios/:id',updateUsuario); 
router.post('/login',login);


export default router;