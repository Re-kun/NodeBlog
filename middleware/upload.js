import multer from "multer";
import crypto from "crypto";


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image");
    },
    filename: (req, file, cb) => {
        const ekstension = file.originalname.split(".")[1];
        const filename = new Date().toDateString() + "-" + crypto.randomBytes(7).toString("hex") + "." + ekstension;
        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg";
    isImage ? cb(null, true) : cb(null, false);
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");

export default upload;
