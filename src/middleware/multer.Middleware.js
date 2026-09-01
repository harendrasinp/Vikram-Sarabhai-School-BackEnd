
import multer from "multer";
import path from "path";
const storage = multer.memoryStorage();

// Image Upload
export const uploadImage = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
});

// PDF Upload
export const uploadPdf = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {

        const extension = path.extname(file.originalname).toLowerCase();

        if (
            file.mimetype === "application/pdf" ||
            extension === ".pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    },
});