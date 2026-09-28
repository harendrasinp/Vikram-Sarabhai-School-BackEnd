import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminDetail from "./src/modules/Authentication/model.js";

const createAdmin = async () => {
  try {
    const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vikramsarabhai.f1uftkd.mongodb.net/${process.env.DB_NAME}?appName=VssSchool`;

    await mongoose.connect(url);

    console.log("MongoDB connected successfully");

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await AdminDetail.create({
      username: "harendrasinh",
      email: "admin@vikramsarabhai.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully!");
    console.log(admin);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

createAdmin();