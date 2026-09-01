import galleryRepository from "../gallery/repository.js"
class galleryController {
    async dropDownItem(req, res) {
        try {
            const { itemName } = req.body
            const response = await galleryRepository.addtListItem({ itemName })
            return res.status(200).json({ success: true, message: "New Function Added" })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async uploadImage(req, res) {
        try {
            const { category, year } = req.body
            if (!req.file || !category || !year) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Upload Image and Fill All Fields" })
            }
            const response = await galleryRepository.uploadCloudinary({
                category, 
                year, 
                buffer: req.file.buffer,
                originalname: req.file.originalname
            })
            return res.status(200).json({ 
                success: true, 
                message: "Image Uploaded Successfuly",
                responseData: response })

        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message })
        }
    }
    async getDropDownList(req, res) {
        try {
            const response = await galleryRepository.getDropDownList()
            return res.status(200).json({ success: true, data: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async EditdropdowItem(req, res) {
        try {
            const { oldName, newName } = req.body
            const response = await galleryRepository.EditdropdowItem(oldName, newName)
            res.status(200).json({ success: true, data: response })
        } catch (error) {
            res.status(400).json({ success: false, message: "Something Went Wrong" })
        }
    }
    async DeleteEvent(req, res) {
        try {
            const { eventName } = req.body
            const response = await galleryRepository.DeleteEvent(eventName)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async getEventTitle(req, res) {
        try {
            const response = await galleryRepository.getEventTitle()
            return res.status(200).json({ success: true, EventData: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async getTitleImage(req, res) {
        try {
            const response = await galleryRepository.getTitleImage()
            return res.status(200).json({ success: true, EventData: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async getYears(req, res) {
        try {
            const eventName = decodeURIComponent(req.params.event);
            const response = await galleryRepository.getYears(eventName)
            return res.status(200).json({ success: true, YearData: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async getYearImage(req, res) {
        try {
            const { eventName, year } = req.params
            if (!eventName || !year) {
                return res.status(400).json({ success: false, message: "Please Provide Event Name and Year" })
            }
            const response = await galleryRepository.getYearImage(eventName, year)
            return res.status(200).json({ success: true, data: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async getEditImages(req, res) {
        try {
            const { EditCategory, EditYear } = req.body
            const response = await galleryRepository.getEditImages(EditCategory, EditYear)
            return res.status(200).json({ success: true, data: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    async deleteImage(req, res) {
        try {
            const { imageId } = req.params
            const response = await galleryRepository.deleteImage(imageId)
            return res.status(200).json({ success: true, message: "Image Deleted Successfully", data: response })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
}
export default new galleryController()