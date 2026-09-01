import express from "express";

import PdfController from "../notice/controller.js";
import { uploadPdf } from "../../middleware/multer.Middleware.js";

const NoticeRouter = express.Router();

// Upload PDF
NoticeRouter.post("/uploadPdf",uploadPdf.single("pdf"),PdfController.createPdf);

// Get all PDFs
NoticeRouter.get("/AllPdf",PdfController.getAllPdfs);



// Update PDF
NoticeRouter.put("/:id",uploadPdf.single("pdf"),PdfController.updatePdf);

// Delete PDF
NoticeRouter.delete("/:id", PdfController.deletePdf);

export default NoticeRouter;