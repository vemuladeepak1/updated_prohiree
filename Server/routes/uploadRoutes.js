const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();


var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"public/profile")
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname)
  }
})
var upload = multer({storage:storage})

router.post("/resume", upload.single("file"), (req, res) => {
 
  const { file } = req;
  console.log(req.files)
  if (file.detectedFileExtension != ".pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
    )
      .then(() => {
        res.send({
          message: "File uploaded successfully",
          url: `/host/resume/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});


router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  console.log(file)
  res.json("success")
  // if (
  //   file.detectedFileExtension != ".jpeg" &&
  //   file.detectedFileExtension != ".png"
  // ) {
  //   res.status(400).json({
  //     message: "Invalid format",
  //   });
  // } else {
  //   const filename = `${uuidv4()}${file.detectedFileExtension}`;
  //   console.log(file.detectedFileExtension)
  //   pipeline(
  //     file.stream,
  //     fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
  //   )
  //     .then(() => {
  //       res.send({
  //         message: "Profile image uploaded successfully",
  //         url: `/host/profile/${filename}`,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         message: "Error while uploading",
  //       });
  //     });
  // }
});

module.exports = router;
