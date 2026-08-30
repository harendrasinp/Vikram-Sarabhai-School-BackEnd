import uploadOnCloudinary, { cloudinary, configCloudinary } from "../../utils/cloudinary.js";
import principalthoughtModel from "./model/principalshought.model.js"
class HomeRepository {
    async principalsThoughtData(data) {
        configCloudinary()
        const response = await uploadOnCloudinary(data.file, "principal")
        const dbResponse = await principalthoughtModel.findOneAndUpdate(
            {},
            {
                name: data.name,
                thought: data.thought,
                Image: response.secure_url,
                cloudinary_id: response.public_id
            },
            {
                new: true,
                upsert: true
            }
        )
        return dbResponse;
    }
    async getPrincipalThought() {
        const response = await principalthoughtModel.findOne();
        return response;
    }
}
export default new HomeRepository()