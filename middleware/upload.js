import multer from "multer";
// import crypto from "crypto";


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image");
    },
    filename: (req, file, cb) => {
        // const token = crypto.randomBytes(10).toString("hex");

        cb(null, new Date().toDateString() + "-" + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg";
    isImage ? cb(null, true) : cb(null, false);
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");

export default upload;
