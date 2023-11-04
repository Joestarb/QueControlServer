import express from 'express';
import multer  from 'multer';

const app = express();  

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads') // TODO Guardar imagen
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop() // TODO Extension de la imagen
        cb(null,`${Date.now()}.${ext}`) 
    }
});

 export const upload = multer({storage})


