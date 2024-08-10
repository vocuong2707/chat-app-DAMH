
const multer = require("multer"); // Import thư viện multer để upload file
const AWS = require("aws-sdk"); // Import thư viện aws-sdk để sử dụng AWS S3
const path = require("path"); // Import thư viện path để xử lý đường dẫn file

// Khởi tạo AWS S3
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const bucketName = process.env.S3_BUCKET_NAME;

// Cấu hình multer
const storage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|doc|docx|txt|xls|xlsx|pdf|csv|json|mp4|mp3/; // Thêm các loại file mới vào regex
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb("Error: Images, Word, Excel, and PDF files only !!!");
}

const uploadFiles = async (req, res) => {
  try {
    // Gọi middleware multer ở đây để xử lý upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: "Lỗi trong quá trình upload ảnh",
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Upload ảnh thất bại",
        });
      }

      const { userId } = req.params; // Lấy id của người dùng từ request
      const fileUrl = req.file?.originalname.split("."); // Lấy tên file ảnh và tách ra để lấy loại file
      const fileType = fileUrl[fileUrl.length - 1]; // Lấy loại file từ tên file
      const filePath = `zalo/W${userId}_W${Date.now().toString()}.${fileType}`;

      const paramsS3 = {
        Bucket: bucketName,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      s3.upload(paramsS3, async (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Upload file thất bại",
          });
        }
        const url = data.Location; // Lấy đường dẫn ảnh từ AWS S3 sau khi upload
        return res.status(200).json({
          success: true,
          message: "Upload file thành công",
          fileUrl: url,
        });
      });
    });
  } catch (error) {
    res.send("Error");
  }
};

module.exports = uploadFiles;
