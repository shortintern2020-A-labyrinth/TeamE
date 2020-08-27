/*
Author     : Masaki Miura
Contents   : Generate message for chat
*/

const generateMessage = (displayUsername, text) => {
    return {
        displayUsername,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
}