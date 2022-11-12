import multer from "multer";
import crypto from "crypto";
import moment from "moment-timezone";

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image");
    },
    filename: (req, file, cb) => {
        const ekstension = file.originalname.split(".")[1];
        const filename = moment().format("YYYYMMDD") + "-" + crypto.randomBytes(5).toString("hex") + "." + ekstension;
        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg";
    isImage ? cb(null, true) : cb(null, false);
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");

export default upload;
