import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js"
import { upload } from "../../middleware/multer.Middleware.js"
import HomeController from "../home/controller.js"
const homeRouter=express.Router()

homeRouter.put("/principalThought",upload.single("image"),authMiddleware,HomeController.principalsThought)
homeRouter.get("/getprincipalThought",HomeController.getprincipalThought)
export default homeRouter