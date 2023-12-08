const fs = require('fs')
const multer = require('multer')
const cloudinary = require('cloudinary')
const { resolve } = require('path')
const uploadsDir = './src/uploads/'
const imagesDir = `${uploadsDir}images`
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir)

        if (!fs.existsSync(imagesDir))
            fs.mkdirSync(imagesDir)

        cb(null, imagesDir)
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            cb(null, + Date.now() + '.' + extension);
        } else {
            return cb(
                new Error('Invalid file type, only JPEG, PNG and jpg is allowed!')
            );
        }
    }
})      

const upload = multer({ storage })
exports.cpUpload = upload.fields([
    { 
        name: 'image', 
        maxCount: 1 
    },
    { 
        name: 'thumbnail', 
        maxCount: 1 
    },
    { 
        name: 'screenShot',
        maxCount: 1 
    },
    { 
        name: 'icon',
        maxCount: 1 
    },
    { 
        name: 'files',
        maxCount: 1 
    },
    { 
        name: 'manifestFile',
        maxCount: 1 
    },
    { 
        name: 'crashLog',
        maxCount: 1 
    },
    { 
        name: 'profileImage',
        maxCount: 1 
    },
    { 
        name: 'avatar',
        maxCount: 1 
    },
    { 
        name: 'userImage',
        maxCount: 1 
    },
    {
        name: 'tutorialImage' ,
        maxCount: 1
    },
    {
        name: 'backgroundImage' ,
        maxCount: 1
    },
    {
        name: 'icon' ,
        maxCount: 1
    },  
    {
        name: 'homeSliderImage' ,
        maxCount: 1
    },  
    {
        name: 'homeSliderVideo' ,
        maxCount: 1
    } , 
    {
        name: 'eventImage' ,
        maxCount: 1
    }  
])
exports.uploadContentImage = upload.single('file')
exports.profileUpload = upload.single('photo')
exports.multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            console.log("Error")
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('gallery', 10)

 exports.uploadToCloudinary = async (data) => {
    const result =  await cloudinary.uploader.upload(data);
    console.log("result: ",result)
    return result?.secure_url;
}