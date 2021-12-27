import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Message.css'
import { connect } from 'react-redux'
import { updateChat } from '../../redux/actions/chat'
import {
  editDraft,
  deleteDraftMessage,
  updateDraft,
} from '../../redux/actions/draft'

export function Message(props) {
  const KEY_ESC = 27

  const messageRef = useRef()
  const numberRef = useRef()
  const editRef = useRef()

  const [editmode, setEditmode] = useState(false)

  const draftEditMode = props.draft.draftEditmode

  // sets editmode to edit message and scrolls message into view
  function clickEdit() {
    setEditmode(!editmode)
    setTimeout(() => {
      editRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
    }, 500)
  }

  // catches key-event (esc/enter)
  function keyEventTextarea(event) {
    if (event.keyCode === KEY_ESC) {
      // clear data
      messageRef.current.value = null
      numberRef.current.value = null
      setEditmode(!editmode)
    }
  }

  // function save changes of message
  function editMessage() {
    const message = messageRef.current.value
    const number = props.number
    const chatId = props.chatid

    let selectedNumber = 0
    if (draftEditMode) {
      selectedNumber = parseInt(numberRef.current.value)
    }

    // message must have a content
    if (!messageRef.current.value) {
      alert('Message cannot be blank')
      return
    }
    // check if draft and update only text
    if (props.draft.draftEditmode && selectedNumber === number) {
      props.editDraft(chatId, number, message)
      props.scrollTo(number)
    }
    // check if draft and update message and selected number
    if (props.draft.draftEditmode && selectedNumber !== number) {
      setNewNumberAndEditDraft(selectedNumber, message)
    }
    if (props.chat.chatEditmode) {
      // check if chat and update only text
      props.updateChat(chatId, number, message)
      props.scrollTo(number)
    }
  }

  // find messages and change the messagenumber
  function setNewNumberAndEditDraft(selectednumber, editedMessage) {
    const newMessageNumber = selectednumber
    const oldMessageNumber = props.number
    let shiftMessage = {}
    let changeMessage = {}
    let messages = props.draft.messages
    let indexShift = 0
    let indexChange = 0
    let findIndexShift
    let findIndexChange

    //changing messagenumber descending
    if (oldMessageNumber > newMessageNumber) {
      messages.map((message) => {
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
      messages.map((message) => {
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
    sortMessagesNewNumber(messages, newMessageNumber)
  }

  //function to sort all message and give them a new number in order
  function sortMessagesNewNumber(messages, newMessageNumber) {
    let number = 1
    let newNumbers = {}
    let newMessages = []
    // function to compare messagenumbers
    function compare(a, b) {
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
    messages.map((message) => {
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
    //update draft in database
    props.updateDraft(
      props.draft.draftId,
      props.draft.title,
      props.draft.author,
      props.draft.date,
      props.draft.language,
      props.draft.tags,
      props.draft.description,
      props.draft.philosopher,
      newMessages,
      props.draft.admin
    )
    // to scroll to message with new number
    setTimeout(() => {
      props.scrollTo(newMessageNumber)
    }, 1000)

    // clear data
    messageRef.current.value = null
    numberRef.current.value = null
    setEditmode(!editmode)
  }

  //delete a single message
  function deleteMessage() {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      const chatId = props.chatid
      const messageId = props.messageId
      let messages = props.draft.messages
      let messageNewNumber = {}
      let newMessages = []
      let messagenumber = 1
      // find the message to be deleted and filter out
      messages.map((message) => {
        if (message._id !== messageId) {
          // set a new messagenumber to all messages
          messageNewNumber = {
            messagenumber: messagenumber++,
            name: message.name,
            text: message.text,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          }
          // array with all messages except deleted one
          newMessages.push(messageNewNumber)
        }
        return newMessages
      })
      props.deleteDraftMessage(chatId, newMessages)
    } else {
      return
    }
  }

  //---------------- RENDER ------------------------------------------

  return (
    <div
      className={`message ${
        props.user.loggedIn ? props.positionedit : props.position
      }`}
      id={props.messageId}
      ref={props.scroll}
    >
      {props.repliedmessage[0] ? (
        <div className="repliedmessage">
          <p className="replydetails">
            <span
              className="replyspan"
              id="replyspan-number"
              onClick={() => props.replyTo(props.repliedmessage[0])}
            >
              # {props.repliedmessage[0]}
            </span>{' '}
            from{' '}
            <span className={`replyspan color-${props.repliedmessage[1]}`}>
              {props.repliedmessage[2]}
            </span>
            :
          </p>
          <p className="replytext">{props.repliedmessage[3]}</p>
        </div>
      ) : null}
      <div className={'message-header'}>
        <p
          className={`message-name ${
            props.user.loggedIn ? props.coloredit : props.color
          }`}
        >
          {props.name}:
        </p>
        {props.user.userId === props.userid ? (
          !editmode ? (
            <p
              className={`edit-message-dropdown ${
                editmode ? 'edit-message-dropdown-active' : null
              }`}
              onClick={() => clickEdit()}
            >
              Edit
            </p>
          ) : (
            <p
              className={`edit-message-dropdown ${
                editmode ? 'edit-message-dropdown-active' : null
              }`}
              onClick={() => editMessage()}
            >
              Save
            </p>
          )
        ) : null}
        {props.user.userId === props.userid && props.draft.draftEditmode ? (
          <p className="edit-message-delete" onClick={deleteMessage}>
            Delete
          </p>
        ) : null}
        <div className="message-number"># {props.number}</div>
      </div>
      {editmode ? (
        <div className="edit-message">
          {props.draft.draftEditmode ? (
            <div className="edit-number">
              <label className="label-edit-number">change to #</label>
              <select
                className="select-edit-number"
                type="number"
                ref={numberRef}
                defaultValue={props.number}
                onKeyDown={keyEventTextarea}
              >
                {props.draft.messages.map((message) => {
                  return (
                    <option value={message.messagenumber} key={uuidv4()}>
                      {message.messagenumber}
                    </option>
                  )
                })}
              </select>
            </div>
          ) : null}

          <textarea
            className="edit-message-textarea"
            type="text"
            ref={messageRef}
            onKeyDown={keyEventTextarea}
            defaultValue={props.text}
          ></textarea>
        </div>
      ) : null}
      <div>
        <div ref={editRef} className="message-text">
          {props.text}
        </div>
      </div>
    </div>
  )
}

//----------- REDUX ----------------------------------------------------

const mapStateToProps = (state) => ({
  chat: state.chat,
  draft: state.draft,
  user: state.user,
})

const mapDispatchToProps = {
  editDraft: editDraft,
  updateChat: updateChat,
  deleteDraftMessage: deleteDraftMessage,
  updateDraft: updateDraft,
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
