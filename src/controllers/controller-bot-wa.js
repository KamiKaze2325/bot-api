import { convertBase64 } from "../utils/convert-base64.js";
import fs from 'fs'

const indexPage = (req, res) => {
  res.send({
    message: 'berhasil',
  });
};

const uploadPhoto = async (req, res) => {
  if (req.file) {
    return res.send({
      fileName: req.file.filename
    });
  }
  
  const { base64 } = req.body;

  const { fileName } = await convertBase64(base64)
  res.send({
    fileName
  })
}

const downloadFile = (req, res) => {
  const fileName = req.params.file;
  const filePath = `./files/${fileName}`;
  const file = fs.createReadStream(filePath);

  if(!file) res.status(404).send({message : "File not Found!"})
  
  file.on("end", (err) => {
      try {
          if (err) throw err;
          setTimeout(() =>
              {
                  console.log("file deleted!")
                  fs.unlink(filePath, (err) => {
                      if (err) throw err;
                  });
              }
          ,(10*60)*1000)
      } catch (error) {
          console.error(error)
      }
  });
  if (!fs.existsSync(filePath)) {
    res.status(404).send({ message: "File not Found!" });
    return;
  } else {
      res.set("Content-Type", "image/png");
      file.pipe(res);
  }
}

export default { indexPage, uploadPhoto, downloadFile };
