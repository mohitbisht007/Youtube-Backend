import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dnjblwegj",
  api_key: "298353169876335",
  api_secret: "8S2ioyseCjF6gVZZI8QSHLGH5Jc",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "channels", // all images go inside this folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;