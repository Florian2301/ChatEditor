import {Messages, Philosopher} from '../../../redux/interfaces/interfaces'

export function setNewName(messages: Messages[], phil: Philosopher, editPhil: string) {
    let indexOfMessage: number
    messages.map((m: Messages) => {
            if (phil.name === m.name) {
              indexOfMessage = messages.indexOf(m)
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
              })
              return messages
            }
            return messages
          })
    return messages
}