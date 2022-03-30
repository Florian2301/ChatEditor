import './Message.css'

import {Messages, StateChat, StateDraft, StateUser} from '../../../redux/interfaces/interfaces'
import React, { useRef, useState } from 'react'
import {
  deleteDraftMessage,
  editDraft,
  updateDraft,
} from '../../../redux/actions/draft/draft'

import {selectNewNumberAndSortMessages} from "./Functions"
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
  const chatEditmode: boolean = chat.chatEditmode

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
    const message: string | null = messageRef.current? messageRef.current.value : null
    const number: number = props.number
    const chatId: string = props.chatid

    let selectedNumber: number = 0
    
    // check if draftmode then get number select element
    if (draftEditMode) {
      selectedNumber = parseInt(numberRef.current? numberRef.current.value : '0')
    }

    // check: message must have a content
    if (!message || message === null) {
      alert('Message cannot be blank')
      return
    }

    // check if draftmode and update only text if messagenumber has not been changed
    if (draft.draftEditmode && selectedNumber === number) {
      dispatch(editDraft(chatId, number, message))
      props.scrollTo(number)
    }

    // check if draftmode and update message if a new messagenumber has been selected
    if (draft.draftEditmode && selectedNumber !== number) {
      const newMessageNumber: number = selectedNumber
      const oldMessageNumber: number = props.number
      let messages: Messages[] = draft.messages
      let shiftMessage: Messages = draft.messages[0] // variable has to be implemented
      let changeMessage: Messages = draft.messages[0] // variable has to be implemented
      let findIndexShift: Messages = draft.messages[0] // variable has to be implemented
      let findIndexChange: Messages = draft.messages[0] // variable has to be implemented

      // function to set a new number to a message and change text if text has been changed
      // and sort messages in new order
      const newMessages = selectNewNumberAndSortMessages(
          message, 
          newMessageNumber, 
          oldMessageNumber, 
          shiftMessage,
          changeMessage, 
          messages,
          findIndexShift,
          findIndexChange
          )
      
      // update draft in database
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

    // check if chatmode and update only text of message
    if (chatEditmode) {
      dispatch(updateChat(chatId, number, message))
      props.scrollTo(number)
    }
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
      }`}/* "positionedit" and "position" have different parameters bc "position" is in a formatted listgroup in chatbox component*/
      id={props.messageId}
      ref={props.scroll} /* "props.scroll" is a ref from chatbox component, either scroll to the end when a draft is loaded,
      or scroll to a new messages when its sent */
    >
      {/* section replied message */}
      {props.repliedmessage[0] ? ( // check if there is a replied message connected with the current message
        <div className="repliedmessage">
          <p className="replydetails">
            <span
              className="replyspan"
              id="replyspan-number"
              onClick={() => props.replyTo(props.repliedmessage[0])} // click to scroll to replied message
            >
              # {props.repliedmessage[0]} {/* message number of replied message*/}
            </span>{' '}
            from{' '}
            <span className={`replyspan color-${props.repliedmessage[1]}`} /* color of name */>
              {props.repliedmessage[2]} {/* name */}
            </span>
            :
          </p>
          <p className="replytext">{props.repliedmessage[3]}{/* text of replied message */}</p>
        </div>
      ) : null}
      {/* section current message */}
      <div className={'message-header'}>
        <p
          className={`message-name ${
            props.color
          }`} // color of name
        >
          {props.name}:
        </p>
        {/* only authors are able to edit their own messages*/user.userId === props.userid ? (
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
        {/* only messages of drafts can be deleted*/ user.userId === props.userid && draft.draftEditmode ? (
          <p className="edit-message-delete" onClick={deleteMessage}>
            Delete
          </p>
        ) : null}
        <div className="message-number"># {props.number}</div>
      </div>
      {editmode ? (
        <div className="edit-message">
          {/* only in draftmode position of message can be changed */draft.draftEditmode ? (
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
          {/* textarea to edit text of message */}
          <textarea
            className="edit-message-textarea"
            ref={messageRef}
            onKeyDown={keyEventMessage}
            defaultValue={props.text}
          ></textarea>
        </div>
      ) : null}
      <div>
        <div ref={editRef} className="message-text" /* editRef to scroll message into view when editting*/ >
          {props.text}
        </div>
      </div>
    </div>
  )
}

export default Message
