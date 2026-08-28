import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const configCloudinary=()=>{
     cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}
const uploadOnCloudinary = async (localFilePath,folderName) => {
   configCloudinary()
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,
            { resource_type: "auto", folder: `Rf-Gallery/${folderName.toUpperCase()}` }
        )
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new Error("Cloudinary upload failed");
    }
}
export {cloudinary,configCloudinary}
export default uploadOnCloudinary;