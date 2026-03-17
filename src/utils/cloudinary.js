import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath) return null
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"

        })
        console.log("file is uploaded on cloudinary ",
        response.url);
        return response;
        

    } catch (error) {
        fs.inlinkSync(localFilePath) // remove the locailysave temp file ad the upload aperation got failed
        return null;    
    }
}


export {uploadOnCloudinary}