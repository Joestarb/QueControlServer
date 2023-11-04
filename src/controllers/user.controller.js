import { conexion } from "../index.js";
import { createAccessToken } from "../lib/jwt.js";

export const getUsuarios = async (req, res) => {
    conexion.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error al obtener usuarios:', err);
          res.status(500).json({ error: 'Error al obtener usuarios' });
          return;
        }
        res.status(200).json(results);
      });
};

export const getUsuario = async (req, res) => {
    const userId = req.params.id;
    conexion.query('SELECT * FROM user WHERE idUser = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).json({ error: 'Error al obtener usuario' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(results[0]);
      }
    });
};

export const createUsuario = async (req, res) => {
    const { nombre, contrasenia, estatus, perfil, telefono, infoAdicional } = req.body;
    conexion.query(
      'INSERT INTO user (nombre, contrasenia, estatus, perfil, telefono, infoAdicional) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, contrasenia, estatus, perfil, telefono, infoAdicional],
      (err, results) => {
        if (err) {
          console.error('Error al crear usuario:', err);
          res.status(500).json({ error: 'Error al crear usuario' });
          return;
        }
        res.status(201).json({ message: 'Usuario creado con éxito', id: results.insertId });
      }
      );
      const token = await createAccessToken({id: results.insertId.id});
      res.cookie("token", token);
      res.json({
        id: results.insertId.id,
        nombre: results.insertId.nombre,
        status: results.insertId.status,
        perfil: results.insertId.perfil,
      })
};

export const deleteUsuario = async (req, res) => {
    const userId = req.params.id;
    conexion.query('DELETE FROM user WHERE idUser = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      res.status(500).json({ error: 'Error al eliminar usuario' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    }
  });
};

export const updateUsuario = async (req, res) => {
    const userId = req.params.id;
  const { nombre, contrasenia, estatus, perfil, telefono, infoAdicional } = req.body;
  conexion.query(
    'UPDATE user SET nombre = ?, contrasenia = ?, estatus = ?, perfil = ?, telefono = ?, infoAdicional = ? WHERE idUser = ?',
    [nombre, contrasenia, estatus, perfil, telefono, infoAdicional, userId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ error: 'Error al actualizar usuario' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
      }
    }
  );
};

export const login = async (req, res) => {
  const [nombre,contrasenia] = req.body;
  try {
    const obtenerUsuario = await getUsuario(nombre);
    if (!obtenerUsuario) {
      return res.status(404).json({message:'Usuario no encontrado'});
    }
    if(contrasenia === obtenerUsuario.contrasenia) { 
      return res.status(404).json({message:'Contraseña incorrecta'});
    }
    const token = await createAccessToken({
      id: obtenerUsuario.id,
    })
    res.cookie("token",token);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}