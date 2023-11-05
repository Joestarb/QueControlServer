import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import mysql from 'mysql2';

import CheeseRouter from './routes/cheese.routes.js';
import imagen from './routes/imagen.routes.js';
import userRouter from './routes/user.routes.js';

// require('dotenv').config();

// inizializando express
const app = express();
app.use(
    express.json()
)
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('../../uploads'));
// Establecer conexión con la base de datos
export const conexion = mysql.createConnection({
    server: 'localhost',
    user: 'root',
    password: 'arbeybachi1',
    database: 'queControl',
});

// Establecer la conexión
conexion.connect((err) => {
    if (err) {
        console.log(err);
    }else {
        console.log("La conexión se establecio correctamente");
    }
});
app.get('/', (req, res) => {
    res.send('Servidor corriendo en el navegador');
});
app.use(imagen)
app.use(userRouter);
app.use(CheeseRouter);
app.listen(3000, () => {
    console.log('Servidor disponible');
})
