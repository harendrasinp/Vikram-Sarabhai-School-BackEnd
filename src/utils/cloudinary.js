import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import streamifier from "streamifier";

const configCloudinary=()=>{
     cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}
const uploadOnCloudinary = async (buffer,folderName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: `Rf-Gallery/${folderName.toUpperCase()}`,
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
export {cloudinary,configCloudinary}
export default uploadOnCloudinary;