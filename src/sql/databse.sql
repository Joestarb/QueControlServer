CREATE DATABASE queControl;
USE queControl;

SHOW TABLES;

CREATE TABLE IF NOT EXISTS user(
    idUser INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    contrasenia VARCHAR(50) NOT NULL,
    estatus BOOLEAN NOT NULL DEFAULT TRUE,
    perfil VARCHAR(20) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    infoAdicional VARCHAR(100)
);

INSERT INTO user (nombre, contrasenia, perfil, telefono) VALUES ('Octavio','Patito','Tavito','9983242074');
CREATE TABLE IF NOT EXISTS quesos(
    idQueso INT PRIMARY KEY AUTO_INCREMENT,
    nombreQueso VARCHAR(50) NOT NULL,
    procedimientos VARCHAR(150) NOT NULL,
    imagen VARCHAR(255),
    ingrediente_1 VARCHAR(20),
    ingrediente_2 VARCHAR(20),
    ingrediente_3 VARCHAR(20),
    ingrediente_4 VARCHAR(20),
    ingrediente_5 VARCHAR(20),
    ingrediente_6 VARCHAR(20),
    ingrediente_7 VARCHAR(20),
    ingrediente_8 VARCHAR(20),
    ingrediente_9 VARCHAR(20),
    ingrediente_10 VARCHAR(20)
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_producto TEXT,
    fecha_creacion DATE,
    nombre_producto VARCHAR(255),
    caducidad DATE,
    ubicacion_almacen VARCHAR(255),
    imagen_producto VARCHAR(255),
    comentarios TEXT,
    lote VARCHAR (20)
);

SELECT * FROM productos;

