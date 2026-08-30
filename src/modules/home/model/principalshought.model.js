import mongoose from "mongoose";

const principalsThoughtData = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    thought: {
        type: String,
        required: true,
        trim: true
    },
    Image: {
        type: String,
        required: true,
        trim: true
    },
    cloudinary_id: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })
const principalthoughtModel = new mongoose.model("principalthought", principalsThoughtData)
export default principalthoughtModel
