import cors from 'cors';
import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import cookieParser from 'cookieParser';

import userRouter from './routes/user.routes.js';
import CheeseRouter from './routes/cheese.routes.js';
import imagen from './routes/imagen.routes.js';

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
    password: '12345768',
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

app.use(imagen)
app.use(userRouter);
app.use(CheeseRouter);
app.listen(8082, () => {
    console.log('Servidor disponible');
})
