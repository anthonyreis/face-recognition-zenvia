require('dotenv').config();
const whatsapp = require('./src/zenvia/config')();
const webhook = require('./src/zenvia/webHook')(whatsapp);

webhook.on('listening', () => {
  console.info('Webhook is listening');
});

webhook.init();