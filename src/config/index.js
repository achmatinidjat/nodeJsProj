const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT, 10),
        mongoPort: parseInt(process.env.MONGO_PORT, 10),
        resDir: process.env.RESOURCE_DIR
    },

    storage:multer.discStorage(
        {
            destination: function (req,file,cb) {
                cb(null, process.env.RESOURCE_DIR);
                },

        filename: function (req, file, cb) {
        const splittedName = file.originalname.split(".");
        const ext = splittedName[splittedName.length - 1];
        const fileName = "course" + req.params.id + "image-"+ Date.now() + "."+ ext;
        file.originalname = fileName;
        cb(null,fileName)
        }
      }
    ),

    fileFilter: (req, file, cb)=>{
        if(file.mimeType === "image/png" || file.mimeType === "image/jpg"||file.mimeType === "image/jpeg"){
            cb(null,true);
        }else{
            cb(null, false);
        }
    },

    limits: {
        filesize: 2097152,

        files: 1
    }

};