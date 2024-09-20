import multer, { MulterError } from "multer";
import path from "path";
import { brotliCompressSync, brotliDecompressSync } from "zlib";

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + path.basename(file.originalname));
    }
});

const multerUpload = multer({
    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
        }
        if (file.size > 20971520) {
            return cb(new MulterError("LIMIT_FILE_SIZE"))
        }

        return cb(null, true);

    }
}).single('pdf');

export default multerUpload
