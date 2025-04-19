import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file);
//     cb(null, "./upload/temp");
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now();
//     cb(null, file.originalname);
//   },
// });
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
