const generatePublicUrl = async (fileId, drive) => {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        })

        return result.data
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = generatePublicUrl;