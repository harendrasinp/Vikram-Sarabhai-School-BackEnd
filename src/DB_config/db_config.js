import mongoose from "mongoose";
  
const connectDB = async () => {
    try {
        const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vikramsarabhai.f1uftkd.mongodb.net/${process.env.DB_NAME}?appName=VssSchool`;

        await mongoose.connect(url);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
export default connectDB;