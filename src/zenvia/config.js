const { Client } = require('@zenvia/sdk');

const config = () => {
    const client = new Client(process.env.ZENVIA_TOKEN);

    const whatsapp = client.getChannel('whatsapp');

    return whatsapp;
}

module.exports = config;