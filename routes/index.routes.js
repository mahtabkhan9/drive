const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const cloudinary = require('../config/cloudinary.config');
const path = require('path');



router.get('/home', (req, res) => {
    res.render('home');
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file.path;

        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: 'drive'
        });

        console.log("Cloudinary Response: ", cloudinaryResponse);
        res.send({
            message: 'File uploaded successfully',
            cloudinaryUrl: cloudinaryResponse.secure_url,
        })
    } catch (error) {
        console.error("Error uploading file: ", error.message);
        res.status(500).send('Error uploading file');
    }
})


module.exports = router;