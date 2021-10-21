import { convertBase64 } from "../utils/convert-base64.js";

const indexPage = (req, res) => {
  res.send({
    message: 'berhasil',
  });
};

const uploadPhoto = async (req, res) => {
  const { base64 } = req.body;
  const { fileName } = await convertBase64(base64)
  res.send({
    fileName
  })
}

export default { indexPage, uploadPhoto };
