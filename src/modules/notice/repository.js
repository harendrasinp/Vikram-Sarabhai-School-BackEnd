import Pdf from "../notice/model/noticeModel.js";

class PdfRepository {
  // Create / Upload PDF
  async createPdf(data) {
    try {
      const pdf = await Pdf.create({
        description: data.description,
        pdf: data.pdf,
      });

      return pdf;
    } catch (error) {
      throw new Error(`Error while creating PDF: ${error.message}`);
    }
  }

  // Get all PDFs
  async getAllPdfs() {
    try {
      const pdfs = await Pdf.find().sort({ createdAt: -1 });

      return pdfs;
    } catch (error) {
      throw new Error(`Error while fetching PDFs: ${error.message}`);
    }
  }

  // Get PDF by ID
  async getPdfById(id) {
    try {
      const pdf = await Pdf.findById(id);

      return pdf;
    } catch (error) {
      throw new Error(`Error while fetching PDF: ${error.message}`);
    }
  }

  // Update PDF
  async updatePdf(id, data) {
    try {
      const pdf = await Pdf.findByIdAndUpdate(
        id,
        {
          name: data.name,
          pdf: data.pdf,
        },
        {
          new: true,
        }
      );

      return pdf;
    } catch (error) {
      throw new Error(`Error while updating PDF: ${error.message}`);
    }
  }

  // Delete PDF
  async deletePdf(id) {
    try {
      const pdf = await Pdf.findByIdAndDelete(id);

      return pdf;
    } catch (error) {
      throw new Error(`Error while deleting PDF: ${error.message}`);
    }
  }
}

export default new PdfRepository();