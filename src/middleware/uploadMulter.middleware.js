import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error('El archivo debe ser una imagen.'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  },
  name: 'thumbnail' 
});
