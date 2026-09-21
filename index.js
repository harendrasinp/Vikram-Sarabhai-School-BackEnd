import dotenv from "dotenv";
dotenv.config();  
import express from "express"
import cors from "cors"
import AuthRouter from "./src/modules/Authentication/routers.js"
import AboutRouter from "./src/modules/aboutUs/router.js"
import GalleryRouter from "./src/modules/gallery/router.js"
import ContactRouter from "./src/modules/contact/router.js"
import cookieParser from "cookie-parser";
import homeRouter from "./src/modules/home/router.js";
import NoticeRouter from "./src/modules/notice/router.js";
const app = express()

app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.31.136:3000',"https://vikram-sarabhai-school-bardoli.vercel.app/"],
    credentials: true
})) 

app.use(express.json());

app.use("/admin",AuthRouter)
app.use("/admin",AboutRouter)
app.use("/admin",GalleryRouter)
app.use("/admin",ContactRouter)
app.use("/admin",homeRouter)
app.use("/admin",NoticeRouter)


export default app