import multer, { MulterError } from "multer";
import { FILE_SIZE_LIMIT } from "./constant";


const multerUpload = multer({
    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
        }
        if (file.size > FILE_SIZE_LIMIT) {
            return cb(new MulterError("LIMIT_FILE_SIZE"))
        }

        return cb(null, true);

    }
}).single('pdf');

export default multerUpload
