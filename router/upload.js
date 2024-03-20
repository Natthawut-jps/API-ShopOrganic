const path = require('path');
const multer = require('multer');

// images
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/img')
        },
        filename: function (req, file, callback) {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            console.log(file.originalname)
            callback(null, new Date().toDateString()+"-"+file.originalname)
        },
    })
    const upload = multer({ storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        } 
    })



module.exports = upload;
