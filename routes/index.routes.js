const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const cloudinary = require('../config/cloudinary.config');
const path = require('path');
const fileModel = require('../models/files.model')
const authMiddleware = require('../middlewares/auth');
const fs = require('fs');
const { utils } = cloudinary;
const mongoose = require('mongoose');




router.get('/home', authMiddleware, async (req, res) => {
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFiles)

    res.render('home', {
        files: userFiles
    });

});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_files', // optional: to keep things organized
        resource_type: 'auto'
    });

    const newFile = await fileModel.create({
        // path: req.file.path,
        // public_id: req.file.filename,
        // originalname: req.file.originalname,
        // user: req.user.userId
        path: result.secure_url,
        publicId: result.public_id,
        originalname: req.file.originalname,
        user: req.user.userId
    })
    console.log("File uploaded to Cloudinary:", newFile);

    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully');
        }
    }); // Delete the file from the server after uploading to cloudinary

    res.json(newFile)

})


router.get('/download/:id', authMiddleware, async (req, res) => {

    const fileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).json({ message: "Invalid file ID" });
    }

    try {
        const file = await fileModel.findById(fileId);
        if (!file) return res.status(404).json({ message: "File not found" });

        let fileUrl = file.path;

        if (fileUrl.includes("fl_attachment")) {
            fileUrl = fileUrl.replace("/fl_attachment", ""); // Removing the download flag
        }

        // Redirect to the file URL
        res.redirect(fileUrl);
    } catch (err) {
        console.error("Download Error:", err);
        res.status(500).json({ message: "Download failed" });
    }

})



module.exports = router;