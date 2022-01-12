const fs = require('fs');
const dir = require("../config").app.resDir;


class FileHandler {

    get(fileName, res, next) {

        try{

            const readStream = fs.createReadStream(`${dir}/${fileName}`);

            readStream.on('open', () => {

                readStream.pipe(res);

            });

            readStream.on('error', (err) => {

                next(err);

            });

        } catch(err){

            throw err;

        }
    }

    delete(fileName){

        if(fs.existsSync(`${dir}/${fileName}`)){

            fs.unlink(`${dir}/${fileName}`, (err) => {
                if(err){
                    throw err;
                }
            })
        }
    }

}

module.exports = new FileHandler();