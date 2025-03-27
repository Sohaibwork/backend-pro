import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // UPLOAD THE FILE ON CLOUDINARY
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);

    return response;
    // FILE HAS BEEN UPLOADED
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload got failed
    return null;
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { uploadOnCloudinary };
