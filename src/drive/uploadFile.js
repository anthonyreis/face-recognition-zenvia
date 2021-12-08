const path = require('path');
const fs = require('fs')

const uploadFile = async (fileName, drive) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'image/jpeg'
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(fileName)
            }
        })

        return response.data
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = uploadFile;