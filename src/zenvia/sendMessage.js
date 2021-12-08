const send = async (whatsapp, messageEvent, content) => {
    whatsapp.sendMessage(messageEvent.message.to, messageEvent.message.from, ...content)
        .then((response) => {
            console.debug('Response:', response);
    });
}

module.exports = send;