export function setNewName(messages, phil, editPhil) {
    let indexOfMessage;
    messages.map((m) => {
        if (phil.name === m.name) {
            indexOfMessage = messages.indexOf(m);
            messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
            });
            return messages;
        }
        return messages;
    });
    return messages;
}
//# sourceMappingURL=Functions.js.map