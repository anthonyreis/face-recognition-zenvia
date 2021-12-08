const deleteFile = async (drive, fileId) => {
    try {
      const response = await drive.files.delete({
        fileId,
      });
      console.log(response.data, response.status);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  module.exports = deleteFile;