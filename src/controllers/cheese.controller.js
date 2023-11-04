import { conexion } from "../index.js";

export const getCheeses = async (req, res) => {
    conexion.query('SELECT * FROM quesos', (err, results) => {
        if (err) {
            console.error('Error al obtener quesos:', err);
            res.status(500).json({ error: 'Error al obtener quesos' });
            return;
        }
        res.status(200).json(results);
    });
};

export const getCheese = async (req, res) => {
    const cheeseId = req.params.id;
    conexion.query('SELECT * FROM quesos WHERE idQueso = ?', [cheeseId], (err, results) => {
        if (err) {
            console.error('Error al obtener queso:', err);
            res.status(500).json({ error: 'Error al obtener queso' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Queso no encontrado' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

export const createCheese = async (req, res) => {
    const { nombreQueso, procedimientos, ingrediente_1, ingrediente_2, ingrediente_3, ingrediente_4, ingrediente_5, ingrediente_6, ingrediente_7, ingrediente_8, ingrediente_9, ingrediente_10 } = req.body;
    conexion.query(
        'INSERT INTO quesos (nombreQueso, procedimientos, ingrediente_1, ingrediente_2, ingrediente_3, ingrediente_4, ingrediente_5, ingrediente_6, ingrediente_7, ingrediente_8, ingrediente_9, ingrediente_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombreQueso, procedimientos, ingrediente_1, ingrediente_2, ingrediente_3, ingrediente_4, ingrediente_5, ingrediente_6, ingrediente_7, ingrediente_8, ingrediente_9, ingrediente_10],
        (err, results) => {
            if (err) {
                console.error('Error al crear queso:', err);
                res.status(500).json({ error: 'Error al crear queso' });
                return;
            }
            res.status(201).json({ message: 'Queso creado con éxito', id: results.insertId });
        }
    );
};

export const deleteCheese = async (req, res) => {
    const cheeseId = req.params.id;
    conexion.query('DELETE FROM quesos WHERE idQueso = ?', [cheeseId], (err, results) => {
        if (err) {
            console.error('Error al eliminar queso:', err);
            res.status(500).json({ error: 'Error al eliminar queso' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Queso no encontrado' });
        } else {
            res.status(200).json({ message: 'Queso eliminado con éxito' });
        }
    });
};

export const updateCheese = async (req, res) => {
    const cheeseId = req.params.id;
    const { nombreQueso, procedimientos, ingrediente_1, ingrediente_2, ingrediente_3, ingrediente_4, ingrediente_5, ingrediente_6, ingrediente_7, ingrediente_8, ingrediente_9, ingrediente_10 } = req.body; 
    conexion.query(
      'UPDATE quesos SET nombreQueso = ?, procedimientos = ?, ingrediente_1 = ?, ingrediente_2 = ?, ingrediente_3 = ?, ingrediente_4 = ?, ingrediente_5 = ?, ingrediente_6 = ?, ingrediente_7 = ?, ingrediente_8 = ?, ingrediente_9 = ?, ingrediente_10 = ? WHERE idQueso = ?',
      [nombreQueso, procedimientos, ingrediente_1, ingrediente_2, ingrediente_3, ingrediente_4, ingrediente_5, ingrediente_6, ingrediente_7, ingrediente_8, ingrediente_9, ingrediente_10, cheeseId],
      (err, results) => {
          if (err) {
              console.error('Error al actualizar queso:', err);
              res.status(500).json({ error: 'Error al actualizar queso' });
              return;
          }
          if (results.affectedRows === 0) {
              res.status(404).json({ message: 'Queso no encontrado' });
          } else {
              res.status(200).json({ message: 'Queso actualizado con éxito' });
          }
      }
  );
};
