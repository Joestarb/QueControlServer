import { conexion } from "../index.js";

export const getProductos = async (req, res) => {
    conexion.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos' });
            return;
        }
        res.status(200).json(results);
    });
};

export const getProducto = async (req, res) => {
    const productoId = req.params.id;
    conexion.query('SELECT * FROM productos WHERE id = ?', [productoId], (err, results) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ error: 'Error al obtener producto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

export const createProducto = async (req, res) => {
    const {
        descripcion_producto,
        fecha_creacion,
        nombre_producto,
        caducidad,
        ubicacion_almacen,
        imagen_producto,
        comentarios
    } = req.body;

    const loteI = nombre_producto.slice(6) + fecha_creacion.slice(5) + caducidad.slice(5) + ubicacion_almacen.slice(0,3)
    const loteF = loteI.replace(/-/g, "").toUpperCase()

    conexion.query(
        'INSERT INTO productos (descripcion_producto, fecha_creacion, nombre_producto, caducidad, ubicacion_almacen, imagen_producto, comentarios, lote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [descripcion_producto, fecha_creacion, nombre_producto, caducidad, ubicacion_almacen, imagen_producto, comentarios, loteF],
        (err, results) => {
            if (err) {
                console.error('Error al crear producto:', err);
                res.status(500).json({ error: 'Error al crear producto' });
                return;
            }
            res.status(201).json({ message: 'Producto creado con éxito', id: results.insertId });
        }
    );
};

export const deleteProducto = async (req, res) => {
    const productoId = req.params.id;
    conexion.query('DELETE FROM productos WHERE id = ?', [productoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ error: 'Error al eliminar producto' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        }
    });
};

export const updateProducto = async (req, res) => {
    const productoId = req.params.id;
    const {
        descripcion_producto,
        fecha_creacion,
        nombre_producto,
        caducidad,
        ubicacion_almacen,
        imagen_producto,
        comentarios
    } = req.body;
    conexion.query(
        'UPDATE productos SET descripcion_producto = ?, fecha_creacion = ?, nombre_producto = ?, caducidad = ?, ubicacion_almacen = ?, imagen_producto = ?, comentarios = ? WHERE id = ?',
        [descripcion_producto, fecha_creacion, nombre_producto, caducidad, ubicacion_almacen, imagen_producto, comentarios, productoId],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar producto:', err);
                res.status(500).json({ error: 'Error al actualizar producto' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.status(200).json({ message: 'Producto actualizado con éxito' });
            }
        }
    );
};
