const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
});

// Create multer upload instance
const upload = multer({ storage });

// Handle POST request for image upload
router.post('/', upload.single('image'), (req, res) => {
  try{
    if (!req.file) {
      console.log("FILE NOT FOUND");
      return res.status(400).send('No image file');
    }
    const imageUrl = `/${req.file.path.replace(/\\/g, '/')}`;
    res.send(imageUrl);
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;