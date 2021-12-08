require('dotenv').config()
const { Client, FileContent, TextContent, WebhookController } = require('@zenvia/sdk');
const dataRecognition = require('./public/dataRecognition');
const upload = require('./src/s3/s3')

const client = new Client(process.env.ZENVIA_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const webhook = new WebhookController({
  channel: 'whatsapp',
  messageEventHandler: async (messageEvent) => {
    let content = [];

    if (messageEvent.message.contents[0].type === 'file' && messageEvent.message.contents[0].fileMimeType.includes('image')) {
        try {
            console.log(messageEvent.message.contents)
            await dataRecognition(messageEvent.message.contents[0].fileUrl)
            
            const file = {path: 'resultImage.png', filename: 'resultImage.png'}
            const {Location} = await upload(file)

            content.push(new TextContent('Imagem da face'))

            content.push(new FileContent(Location, 'image/png'));

            content.push(new TextContent('Link de download da imagem'))

            content.push(new TextContent(Location))
            
        } catch (err) {
            console.log(err)
            content = [new TextContent('Houve um problema ao processar a imagem.')];
        }
    }

    whatsapp.sendMessage(messageEvent.message.to, messageEvent.message.from, ...content)
    .then((response) => {
      console.debug('Response:', response);
    });
  },
});

webhook.on('listening', () => {
  console.info('Webhook is listening');
});

webhook.init();