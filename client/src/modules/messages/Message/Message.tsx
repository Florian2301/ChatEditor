import './Message.css'

import {Messages, StateChat, StateDraft, StateUser} from '../../../redux/interfaces/interfaces'
import React, { useRef, useState } from 'react'
import {
  deleteDraftMessage,
  editDraft,
  updateDraft,
} from '../../../redux/actions/draft/draft'

import { updateChat } from '../../../redux/actions/chat/chat'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const Message = (props: {position?: string, positionedit?: string, color?: string, coloredit?: string, number: number, name: string, text: string, chatid: string, chatnumber: number | string, messageId: string, userid: string, scroll: any, repliedmessage: string[], replyTo: any, scrollTo: any}) => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)                                                                  

  // refs
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const numberRef = useRef<HTMLSelectElement>(null)
  const editRef = useRef<HTMLDivElement>(null)

  // useState
  const [editmode, setEditmode] = useState<boolean>(false)

  // editmode variable
  const draftEditMode: boolean = draft.draftEditmode

  // sets editmode to edit message and scrolls message into view
  function clickEdit() {
    setEditmode(!editmode)
    setTimeout(() => {
      editRef.current?
      editRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      }) : null
    }, 500)
  }

  // catches key-event (esc/enter)
  function keyEventMessage(event: React.KeyboardEvent<HTMLTextAreaElement | HTMLSelectElement> ) : void {
    if (event.code === 'Escape') {
      // clear data
      messageRef.current? messageRef.current.value = '' : null
      if (draft.draftEditmode) {
        numberRef.current? numberRef.current.value = '' : null
      }
      setEditmode(!editmode)
    }
  }

  // function save changes of message
  function editMessage() {
    const message = messageRef.current? messageRef.current.value : null
    const number = props.number
    const chatId = props.chatid

    let selectedNumber: number = 0
    if (draftEditMode) {
      selectedNumber = parseInt(numberRef.current? numberRef.current.value : '0')
    }

    // message must have a content
    if (!message || message === null) {
      alert('Message cannot be blank')
      return
    }
    // check if draft and update only text
    if (draft.draftEditmode && selectedNumber === number) {
      dispatch(editDraft(chatId, number, message))
      props.scrollTo(number)
    }
    // check if draft and update message and selected number
    if (draft.draftEditmode && selectedNumber !== number) {
      setNewNumberAndEditDraft(selectedNumber, message)
    }
    if (chat.chatEditmode) {
      // check if chat and update only text
      dispatch(updateChat(chatId, number, message))
      props.scrollTo(number)
    }
  }

  // find messages and change the messagenumber
  function setNewNumberAndEditDraft(selectednumber: number, editedMessage: string) {
    const newMessageNumber: number = selectednumber
    const oldMessageNumber: number = props.number
    let shiftMessage: Messages = draft.messages[0] // variable has te be implemented
    let changeMessage: Messages = draft.messages[0] // variable has te be implemented
    let messages: Messages[] = draft.messages
    let indexShift: number = 0
    let indexChange: number = 0
    let findIndexShift: Messages = draft.messages[0] // variable has te be implemented
    let findIndexChange: Messages = draft.messages[0] // variable has te be implemented

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
    sortMessagesNewNumber(messages, newMessageNumber)
  }

  //function to sort all message and give them a new number in order
  function sortMessagesNewNumber(messages: Messages[], newMessageNumber: number) {
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
    //update draft in database
    dispatch(updateDraft(
      draft.draftId,
      draft.title,
      draft.author,
      draft.published,
      draft.date,
      draft.language,
      draft.tags,
      draft.description,
      draft.philosopher,
      newMessages,
      draft.admin
    ))
    // to scroll to message with new number
    setTimeout(() => {
      props.scrollTo(newMessageNumber)
    }, 1000)

    // clear data
    messageRef.current? messageRef.current.value = '' : null
    numberRef.current? numberRef.current.value = '' : null
    setEditmode(!editmode)
  }

  //delete a single message
  function deleteMessage() {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      const chatId: string = props.chatid
      const messageId: string = props.messageId
      let messages: Messages[] = draft.messages
      let messageNewNumber: Messages
      let newMessages: Messages[] = []
      let messagenumber: number = 1
      // find the message to be deleted and filter out
      messages.map((message: Messages) => {
        if (message._id !== messageId) {
          // set a new messagenumber to all messages
          messageNewNumber = {
            _id: message._id,
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
      dispatch(deleteDraftMessage(chatId, newMessages))
    } else {
      return
    }
  }

  //---------------- RENDER ------------------------------------------

  return (
    <div
      className={`message ${
        user.loggedIn ? props.positionedit : props.position
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
            user.loggedIn ? props.coloredit : props.color
          }`}
        >
          {props.name}:
        </p>
        {user.userId === props.userid ? (
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
        {user.userId === props.userid && draft.draftEditmode ? (
          <p className="edit-message-delete" onClick={deleteMessage}>
            Delete
          </p>
        ) : null}
        <div className="message-number"># {props.number}</div>
      </div>
      {editmode ? (
        <div className="edit-message">
          {draft.draftEditmode ? (
            <div className="edit-number">
              <label className="label-edit-number">change to #</label>
              <select
                className="select-edit-number"
                ref={numberRef}
                defaultValue={props.number}
                onKeyDown={keyEventMessage}
              >
                {draft.messages.map((message: Messages) => {
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
            ref={messageRef}
            onKeyDown={keyEventMessage}
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

export default Message
