import { Router } from "express";
import {
    createProducto,
    deleteProducto,
    getProducto,
    getProductos,
    updateProducto
} from "../controllers/productosInventario.js";

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', createProducto);
router.delete('/productos/:id', deleteProducto);
router.put('/productos/:id', updateProducto);

export default router;
