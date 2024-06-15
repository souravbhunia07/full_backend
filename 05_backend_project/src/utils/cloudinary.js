import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        }); // files has been uploaded to cloudinary
        // console.log("file is uploaded successfully", result.url);
        fs.unlinkSync(localFilePath); // delete the file from local storage as the operation is successful
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file from local storage as the operation is failed
        return null;
    }
}


export {uploadOnCloudinary};