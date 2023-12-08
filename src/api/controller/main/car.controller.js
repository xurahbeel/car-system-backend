const Car = require('../../models/car.model')
const { uploadToCloudinary, multi_upload } = require("../../utils/upload");
const multer = require("multer");


exports.uploadMultiImage = async (req, res, next) => {
  try {
    multi_upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res
          .status(500)
          .send({
            error: { message: `Multer uploading error: ${err.message}` },
          })
          .end();
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log("here we are in : ", err);
        if (err.name == "ExtensionError") {
          // res
          //   .status(413)
          //   .send({ error: { message: err.message } })
          //   .end();
          return;
        } else {
          res
            .status(500)
            .send({
              error: { message: `unknown uploading error: ${err.message}` },
            })
            .end();
        }
        return;
      }
      // Everything went fine.
      // show file `req.files`
      // show body `req.body`
      const { carModel , price , phoneNumber , maxPictures} = req.body
      console.log("in-check-here ", req.files);
      imagesUpload = [];
      if (req.files) {
        let uploadPromises = req.files.map(async (file) => {
          try {
            let result = await uploadImage(file);
            imagesUpload.push(result);
          } catch (error) {
            console.error("Error uploading image: ", error);
          }
        });
        await Promise.all(uploadPromises);
      }


      const car = await Car.create({
        carModel , price , phoneNumber , maxPictures,
        gallery: imagesUpload,
      });
      console.log("car created: " , car);
      return res.status(200).json({car , message:"Car creted successfully"})
      // return globalServices.global.returnResponse(
      //   res,
      //   200,
      //   false,
      //   "Photo upload successfully",
      //   imagesUpload
      // );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const uploadImage = async (image) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      let icon = uploadToCloudinary(image.path);
       resolve(icon);
    }, 100 * Math.random())
  );
};