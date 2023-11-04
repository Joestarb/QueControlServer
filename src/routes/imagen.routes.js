import { Router } from "express";
import path from "path";

import { upload } from "../controllers/image.controller.js"

const router = Router();

router.post('/imagenes',upload.single('file'), (req, res) =>{
    const filePath = req.file.path
    const fileName = `http://localhost:8082/uploads/${path.basename(filePath)}`; 
    res.send({data: 'imagen cargada',
    data: fileName});
})

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(__dirname + '/uploads/' + imageName);
  });

export default router;