import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toString() + '-' + file.originalname);
    }
})

// const fileFilter = (req, file, cb) => {
//     const isImage = file.mimetype === 'img/png' || file.mimetype === 'img/jpg' || file.mimetype === 'img/jpeg';
//     isImage ? cb(null, true) : cb(null, false);
// }

const upload = multer({ storage: fileStorage });

export default upload;