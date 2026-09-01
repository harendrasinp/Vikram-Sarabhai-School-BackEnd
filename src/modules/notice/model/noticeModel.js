import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    pdf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;