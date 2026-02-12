import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// 1. Sirf Configuration Part (Docs wala code yahan use hoga)


console.log("Cloud Name from Env:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key from Env:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret from Env:", process.env.CLOUDINARY_API_SECRET);
// ---------------------------------------

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
// 2. Storage Setup (Multer ko batayein kahan upload karna hai)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "zarposh_products", // Cloudinary par folder ka naam
    allowed_formats: ["jpg", "png", "jpeg", "webp"], 
    public_id: (req, file) => {
      const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^\w.-]/g, "");
      return Date.now() + "-" + safeName;
    },
  },
});

// 3. Export
export const upload = multer({ storage });









// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^\w.-]/g, "")

//     cb(null, Date.now() + "-" + safeName);
//   },
// });

// export const upload = multer({ storage });
