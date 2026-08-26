import uploadOnCloudinary, { cloudinary, configCloudinary } from "../../utils/cloudinary.js";
import galleryModel from "./models/Gallery.model.js";
import DropDownitemModel from "./models/dropdownItem.model.js";
class galleryRepository {
    async addtListItem(DropDownlistData) {
        const response = await DropDownitemModel.create(
            {
                DropDownItem: DropDownlistData.itemName.toUpperCase()

            }
        )
        return response
    }
    async uploadCloudinary(uploadData) {
        configCloudinary()
        console.log(uploadData.path)
        const response = await uploadOnCloudinary(uploadData.path, uploadData.category)
        const dbResponse = await galleryModel.create(
            {
                EventName: uploadData.category,
                Year: uploadData.year,
                Image: response.secure_url,
                cloudinary_id: response.public_id
            }
        )
        return dbResponse;
    }
    async getDropDownList() {
        const response = await DropDownitemModel.find()
        return response
    }
    async EditdropdowItem(oldName, newName) {
        configCloudinary()
        const oldEventName = oldName.toUpperCase();
        const newEventName = newName.toUpperCase();
        console.log(oldEventName)
        console.log(newEventName)

        await DropDownitemModel.findOneAndUpdate(
            { DropDownItem: oldEventName },
            { $set: { DropDownItem: newEventName } }
        );

        await galleryModel.updateMany(
            { EventName: oldEventName },
            { $set: { EventName: newEventName } }
        );
        await cloudinary.api.rename_folder(
            `Rf-Gallery/${oldEventName}`,
            `Rf-Gallery/${newEventName}`
        );

        return await DropDownitemModel.find();

    }
    async DeleteEvent(eventName) {
        const EventResponse = await DropDownitemModel.deleteOne({ DropDownItem: eventName })
        if (EventResponse.deletedCount === 0) {
            throw new Error("Event Not Deleted")
        }
        const EventDataResponse = await galleryModel.deleteMany({ EventName: eventName })
        return { success: true, message: "Event Deleted with all Images" }
    }
    async getEventTitle() {
        const response = await galleryModel.distinct("EventName")
        return response
    }
    async getTitleImage() {
        const response = await galleryModel.aggregate([
            {
                $sort: { createdAt: -1 } // Sabse latest record pehle
            },
            {
                $group: {
                    _id: "$EventName",
                    Image: { $first: "$Image" },
                    Year: { $first: "$Year" }
                }
            },
            {
                $project: {
                    _id: 0,
                    EventName: "$_id",
                    Image: 1,
                    Year: 1
                }
            }
        ]);

        return response;
    }
    async getYears(EventName) {
        const response = await galleryModel.aggregate([
            {
                $match: {
                    EventName: EventName
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $group: {
                    _id: "$Year",
                    Image: { $first: "$Image" },
                    Year: { $first: "$Year" },
                    EventName: { $first: "$EventName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Year: 1,
                    Image: 1,
                    EventName: 1
                }
            },
            {
                $sort: {
                    Year: -1
                }
            }
        ]);

        return response;
    }
    async getYearImage(EventName, selecterYear) {
        const response = await galleryModel.find({ EventName: EventName, Year: selecterYear })
        return response
    }
    async getEditImages(EditCategory, EditYear) {
        const response = await galleryModel.find({ EventName: EditCategory, Year: EditYear })
        return response
    }
    async deleteImage(imageId) {
        const imagedata = await galleryModel.findById(imageId)
        const result = await cloudinary.uploader.destroy(imagedata.cloudinary_id);
        const response = await galleryModel.findByIdAndDelete(imagedata._id)
        return response
    }
}
export default new galleryRepository()