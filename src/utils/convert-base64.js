import fs from 'fs/promises';

const convertBase64 = async (base64) => {
    const dateTime = new Date();
    const fileName = `${dateTime.getTime()}.png`;
    const binaryData = new Buffer(base64, 'base64').toString('binary');
    await fs.writeFile(`./files/${fileName}`, binaryData, "binary");
    return {
        fileName
    }
}

export {
    convertBase64
}