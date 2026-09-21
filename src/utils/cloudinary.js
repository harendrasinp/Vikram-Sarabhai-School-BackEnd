import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import streamifier from "streamifier";

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}
// image upload
const uploadOnCloudinary = async (buffer, folderName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: `Vikram_Sarabhai_Gallery/${folderName.toUpperCase()}`,
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}
// PDF Upload
const uploadPdfOnCloudinary = async (
    buffer,
    folderName = "PDF",
    originalName = "file.pdf"
) => {
    return new Promise((resolve, reject) => {

        const fileName = originalName
            .replace(/\.pdf$/i, "")
            .replace(/[^a-zA-Z0-9_-]/g, "_");

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: `Vikram_Sarabhai_PDF/${folderName.toUpperCase()}`,
                public_id: fileName,
                format: "pdf",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary PDF upload error:", error);
                    reject(error);
                } else {
                    console.log("PDF UPLOAD RESULT:", result);
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
export { cloudinary, configCloudinary, uploadPdfOnCloudinary };

export default uploadOnCloudinary