//viet api upload anh len aws s3
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const bucketName = process.env.S3_BUCKET_NAME;

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
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    return cb("Error: Images, Word, Excel, and PDF files only !!!");
}


const uploadImage = async (req, res) => {
    try {
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

            const { userId } = req.params;
            const file = req.file;
            const params = {
                Bucket: bucketName,
                Key: `${userId}/${file.originalname}`,
                Body: file.buffer,
                ACL: "public-read",
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Upload ảnh thất bại",
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Upload ảnh thành công",
                    data: data,
                });
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Upload ảnh thất bại",
        });
    }
};

module.exports = uploadImage;
