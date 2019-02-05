const multer = require("multer");

exports.storeImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      logger.info('In store image');
      date = new Date();
      cb(
        null,
        "File-" +
        date.getDate() +
        date.getMonth() +
        date.getFullYear() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds() +
        "-" +
        file.originalname
      );
    }
  })
}).any();

exports.storeVideo = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      logger.info('in store video');
      date = new Date();
      cb(
        null,
        "Video-" +
        date.getDate() +
        date.getMonth() +
        date.getFullYear() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds() +
        "-" +
        file.originalname
      );
    }
  })
}).any();