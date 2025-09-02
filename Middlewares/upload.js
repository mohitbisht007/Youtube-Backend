import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv"

dotenv.config()

//cloudinary configaration
cloudinary.config({
  cloud_name: "dnjblwegj",
  api_key: "298353169876335",
  api_secret: process.env.CLOUD_API_SECRET,
});

//cloudnary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "channels", // all images go inside this folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});


//uploads
const upload = multer({ storage });

export default upload;