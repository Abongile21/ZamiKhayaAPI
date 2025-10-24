const cloudinary = require('cloudinary').v2;
require("dotenv").config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

exports.uploadToCloudinary = async (fileImage) => {
    try {
        // The 'fileImage' object contains the path to the temporary file
        const result = await cloudinary.uploader.upload(fileImage.tempFilePath, {
            folder: "project_uploads", // Optional: A folder in your Cloudinary account
            resource_type: "auto",      // Automatically detect file type
        });

        // The result contains the public URL in 'secure_url'
        return { Location: result.secure_url };

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error('Failed to upload file to Cloudinary.');
    }
};