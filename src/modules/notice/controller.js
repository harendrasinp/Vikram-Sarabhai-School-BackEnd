import { uploadPdfOnCloudinary } from "../../utils/cloudinary.js";
import PdfRepository from "../notice/repository.js";
import uploadOnCloudinary, { cloudinary, configCloudinary } from "../../utils/cloudinary.js";
class PdfController {

    // Create PDF
    createPdf = async (req, res) => {
        configCloudinary()
        try {
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({
                    success: false,
                    message: "PDF name is required",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "PDF file is required",
                });
            }

            // Upload PDF to Cloudinary
            const response = await uploadPdfOnCloudinary(
                req.file.buffer,
                "pdf",
                req.file.originalname
            );

            if (!response) {
                return res.status(500).json({
                    success: false,
                    message: "PDF upload to Cloudinary failed",
                });
            }

            // Save Cloudinary URL in database
            const pdfData = {
                description,
                pdf: response.secure_url,
            };

            const pdf = await PdfRepository.createPdf(pdfData);

            return res.status(201).json({
                success: true,
                message: "PDF uploaded successfully",
                data: pdf,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    // Get All PDFs
    getAllPdfs = async (req, res) => {
        try {
            const pdfs = await PdfRepository.getAllPdfs();

            return res.status(200).json({
                success: true,
                data: pdfs,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    // Get PDF By ID
    getPdfById = async (req, res) => {
        try {
            const { id } = req.params;

            const pdf = await PdfRepository.getPdfById(id);

            if (!pdf) {
                return res.status(404).json({
                    success: false,
                    message: "PDF not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: pdf,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    // Update PDF
    updatePdf = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const pdfData = {
                name,
                pdf: req.file ? req.file.path : undefined,
            };

            const pdf = await PdfRepository.updatePdf(id, pdfData);

            if (!pdf) {
                return res.status(404).json({
                    success: false,
                    message: "PDF not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "PDF updated successfully",
                data: pdf,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    // Delete PDF
    deletePdf = async (req, res) => {
        try {
            const { id } = req.params;

            const pdf = await PdfRepository.deletePdf(id);

            if (!pdf) {
                return res.status(404).json({
                    success: false,
                    message: "PDF not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "PDF deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

export default new PdfController();