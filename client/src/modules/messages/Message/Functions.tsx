import {Messages} from '../../../redux/interfaces/interfaces'

// find messages and change the messagenumber
export function selectNewNumberAndSortMessages(
    editedMessage: string, 
    newMessageNumber: number,
    oldMessageNumber: number,
    shiftMessage: Messages,
    changeMessage: Messages,
    messages: Messages[],
    findIndexShift: Messages,
    findIndexChange: Messages
    ) {
    
    let indexShift: number = 0
    let indexChange: number = 0
    
    //changing messagenumber descending
    if (oldMessageNumber > newMessageNumber) {
      messages.map((message: Messages) => {
        //find old message, which will be shifted
        if (message.messagenumber === newMessageNumber) {
          findIndexShift = message
          shiftMessage = {
            _id: message._id,
            messagenumber: newMessageNumber + 1,
            name: message.name,
            text: message.text,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          }
        }
        // find message to be changed and set new number
        if (message.messagenumber === oldMessageNumber) {
          findIndexChange = message
          changeMessage = {
            _id: message._id,
            messagenumber: newMessageNumber,
            name: message.name,
            text: editedMessage,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          }
        }
        return { findIndexShift, findIndexChange, shiftMessage, changeMessage }
      })
    }
    //changing messagenumber ascending
    if (oldMessageNumber < newMessageNumber) {
      messages.map((message: Messages) => {
        //find old message, which will be shifted
        if (message.messagenumber === newMessageNumber) {
          findIndexShift = message
          shiftMessage = {
            _id: message._id,
            messagenumber: newMessageNumber - 1,
            name: message.name,
            text: message.text,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          }
        }
        // find message to be changed and set new number
        if (message.messagenumber === oldMessageNumber) {
          findIndexChange = message
          changeMessage = {
            _id: message._id,
            messagenumber: newMessageNumber,
            name: message.name,
            text: editedMessage,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          }
        }
        return { findIndexShift, findIndexChange, shiftMessage, changeMessage }
      })
    }
    // find index of shifted and changed message
    indexShift = messages.indexOf(findIndexShift)
    indexChange = messages.indexOf(findIndexChange)
    // replace shifted and changed message
    messages.splice(indexShift, 1, shiftMessage)
    messages.splice(indexChange, 1, changeMessage)
    
    // function to sort the messages by number and set back input "change number"
    const newMessages = sortMessagesNewNumber(messages)

    return newMessages
}


//function to sort all message and give them a new number in order
function sortMessagesNewNumber(messages: Messages[]) {
    let number: number = 1
    let newNumbers: Messages
    let newMessages: Messages[] = []
    // function to compare messagenumbers
    function compare(a: any, b: any) {
      if (a.messagenumber < b.messagenumber) {
        return -1
      }
      if (a.messagenumber > b.messagenumber) {
        return 1
      }
      return 0
    }
    //sort result from "setNewNumber()"
    messages.sort(compare)
    //set new number ascending to all messages
    messages.map((message: Messages) => {
      newNumbers = {
        _id: message._id,
        messagenumber: number++,
        name: message.name,
        text: message.text,
        time: message.time,
        color: message.color,
        tags: message.tags,
        position: message.position,
        repliedmessage: message.repliedmessage,
      }
      newMessages.push(newNumbers)
      return newMessages
    })
    return newMessages
  }
