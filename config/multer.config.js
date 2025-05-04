const multer = require('multer');
const path = require('path');

// const storage = multer.memoryStorage(); // Store files in memory

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname)); // Append the original file extension
  }
});


const upload = multer({ storage: storage });

module.exports = upload;