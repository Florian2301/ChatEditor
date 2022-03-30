export function insertToNewPosition(allMessages, newMessage, sortMessage, replaceMessageNumber, positionPhil, name, color) {
    // array to store new order of messages
    let newMessagesArray = [];
    // push message with new number into the rest of messages
    allMessages.map((message) => {
        // find all messages below the replacing one and store it in array
        if (message.messagenumber < replaceMessageNumber) {
            newMessagesArray.push(message);
        }
        // create new message with new number and find replaced message and set a new number for this one
        if (message.messagenumber === replaceMessageNumber) {
            newMessagesArray.push(
            // new message
            {
                messagenumber: replaceMessageNumber,
                name: name,
                text: newMessage,
                color: color,
                position: positionPhil,
                repliedmessage: [],
            }, 
            // set new number for replaced message
            {
                messagenumber: replaceMessageNumber + 1,
                name: message.name,
                text: message.text,
                color: message.color,
                position: message.position,
                repliedmessage: message.repliedmessage,
            });
        }
        // get the rest of the messages and set new numbers to them
        if (message.messagenumber >= sortMessage) {
            sortMessage++;
            newMessagesArray.push({
                messagenumber: sortMessage,
                name: message.name,
                text: message.text,
                color: message.color,
                position: message.position,
                repliedmessage: message.repliedmessage,
            });
        }
        return newMessagesArray;
    });
    return newMessagesArray;
}
export function repliedMessage(allMessages, messagenumber, sendMessage, number, positionPhil, name, color) {
    let replyToMessage = [];
    // create replied message
    allMessages.map((message) => {
        if (message.messagenumber === messagenumber) {
            replyToMessage = [
                message.messagenumber.toString(),
                message.color,
                message.name,
                message.text
            ];
        }
        return replyToMessage;
    });
    // create new message with replied message
    allMessages.push({
        messagenumber: number,
        name: name,
        text: sendMessage,
        color: color,
        position: positionPhil,
        repliedmessage: replyToMessage,
    });
    return allMessages;
}
//# sourceMappingURL=Functions.js.map