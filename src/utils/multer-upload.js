import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination: './files/',
        filename: function (req, file, cb) {
            const filenameSplit = file.originalname.split('.');
            const extensions = filenameSplit[filenameSplit.length - 1];
            cb( null,Date.now()+"."+extensions);
        }
    }
);

export const upload = multer({ storage });