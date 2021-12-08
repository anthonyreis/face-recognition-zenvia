const { FileContent, TextContent, WebhookController } = require('@zenvia/sdk');
const dataRecognition = require('../../public/dataRecognition');
const upload = require('../s3/s3');
const send = require('./sendMessage')

const setWebHook = (whatsapp) => {
    const webhook = new WebhookController({
        channel: 'whatsapp',
        messageEventHandler: async (messageEvent) => {
            let content = [];

            try {
                if (messageEvent.message.contents[0].type === 'file' && messageEvent.message.contents[0].fileMimeType.includes('image')) {

                    await dataRecognition(messageEvent.message.contents[0].fileUrl)

                    const file = { path: 'resultImage.png', filename: 'resultImage.png' }
                    const { Location } = await upload(file)

                    content.push(new TextContent('Imagem da face'))

                    content.push(new FileContent(Location, 'image/png'));

                    content.push(new TextContent('Link de download da imagem'))

                    content.push(new TextContent(Location))
                }

                await send(whatsapp, messageEvent, content)
            } catch (err) {
                console.log(err)
                content = [new TextContent('Houve um problema ao processar a imagem.')];
            }
        },
    });

    return webhook;
}

module.exports = setWebHook;