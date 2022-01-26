import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Button from '../../elements/Button'
import { updateDraft, writeMessage } from '../../redux/actions/draft'
import './WriteMessage.css'
import EmojiPicker from '../../elements/EmojiPicker'

export function WriteMessage(props) {
  const KEY_ESC = 27

  const messageRef = useRef()
  const numberRef = useRef()

  const [write, setWrite] = useState(false)
  const [reply, setReply] = useState(false)

  // dropdown box to write a message
  function writeMessage() {
    props.writeMessage(!write)
    setWrite(!write)
  }

  // get the name from click on button of philosopher
  function getPhil(name, color) {
    // message must be written
    if (!messageRef.current.value) {
      alert('Write a message and then send it')
      return
    }
    //reply to a message
    if (reply) {
      replyToMessage(name, color)
    } else {
      //send the new message
      sendMessage(name, color)
    }
  }

  // catches key-event (escape)
  function keyEventTextarea(event) {
    if (event.keyCode === KEY_ESC) {
      // clear data
      messageRef.current.value = null
      numberRef.current.value = null
      setReply(false)
    }
  }

  // function to send a new message (with new number or insert in between other messages)
  function sendMessage(name, color) {
    // for numbers
    let number = props.draft.messages.length
    number++

    const replaceMessageNumber = parseInt(numberRef.current.value) // string into number
    let sortMessage = replaceMessageNumber + 1

    //for message content
    const allMessages = props.draft.messages
    const sendMessage = messageRef.current.value
    let newMessagesArray

    //for message position
    const philosopher = props.draft.philosopher
    let positionPhil
    if (name === philosopher[0].name) {
      positionPhil = 1
    } else {
      positionPhil = 2
    }

    // check if user selected a different number or set default number for message
    if (props.draft.messages.length < replaceMessageNumber) {
      // set default number
      // save new message at the end of the messages array
      newMessagesArray = props.draft.messages
      newMessagesArray.push({
        messagenumber: number,
        name: name,
        text: sendMessage,
        color: color,
        position: positionPhil,
        repliedmessage: [],
      })
      props.scrollTo(false)
    } else if (props.draft.messages.length === 1) {
      // prevents second message replaces first message, because numberRef is still "1" after sending first message
      newMessagesArray = props.draft.messages
      newMessagesArray.push({
        messagenumber: 2,
        name: name,
        text: sendMessage,
        color: color,
        position: positionPhil,
        repliedmessage: [],
      })
      props.scrollTo(false)
    } else {
      // user select number
      // array to store new order of messages
      newMessagesArray = []
      // push message with new number into the rest of messages
      allMessages.map((message) => {
        // find all messages below the replacing one and store it in array
        if (message.messagenumber < replaceMessageNumber) {
          newMessagesArray.push(message)
        }
        // create new message with new number and find replaced message and set a new number for this one
        if (message.messagenumber === replaceMessageNumber) {
          const newMessage = messageRef.current.value
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
              time: message.time,
              color: message.color,
              tags: message.tags,
              position: message.position,
              repliedmessage: message.repliedmessage,
            }
          )
        }
        // get the rest of the messages and set new numbers to them
        if (message.messagenumber >= sortMessage) {
          sortMessage++
          newMessagesArray.push({
            messagenumber: sortMessage,
            name: message.name,
            text: message.text,
            time: message.time,
            color: message.color,
            tags: message.tags,
            position: message.position,
            repliedmessage: message.repliedmessage,
          })
        }
        return newMessagesArray
      })
      props.scrollTo(replaceMessageNumber)
    }

    // update draft with default number/new numbers and new message
    props.updateDraft(
      props.draft.draftId,
      props.draft.title,
      props.draft.author,
      props.draft.published,
      props.draft.date,
      props.draft.language,
      props.draft.tags,
      props.draft.description,
      props.draft.philosopher,
      newMessagesArray,
      props.draft.admin
    )

    // clear data
    messageRef.current.value = null
    numberRef.current.value = null
    setReply(false)
  }

  // function to reply to a message
  function replyToMessage(name, color) {
    // for number
    let number = props.draft.messages.length
    number++

    //for message position
    const philosopher = props.draft.philosopher
    let positionPhil
    if (name === philosopher[0].name) {
      positionPhil = 1
    } else {
      positionPhil = 2
    }

    // find message to reply to and save as repliedmessage
    const messagenumber = parseInt(numberRef.current.value)
    let repliedmessage
    props.draft.messages.map((message) => {
      if (message.messagenumber === messagenumber) {
        repliedmessage = [
          message.messagenumber,
          message.color,
          message.name,
          message.text,
        ]
      }
      return repliedmessage
    })

    //for message content
    const allMessages = props.draft.messages
    const sendMessage = messageRef.current.value
    allMessages.push({
      messagenumber: number,
      name: name,
      text: sendMessage,
      color: color,
      position: positionPhil,
      repliedmessage: repliedmessage,
    })

    // update draft with new message and replied message
    props.updateDraft(
      props.draft.draftId,
      props.draft.title,
      props.draft.author,
      props.draft.date,
      props.draft.language,
      props.draft.tags,
      props.draft.description,
      props.draft.philosopher,
      allMessages,
      props.user.admin
    )

    // to scroll to message with new number
    props.defaultScroll()

    // clear data
    messageRef.current.value = null
    numberRef.current.value = null
    setReply(false)
  }

  function addEmoji(emoji) {
    messageRef.current.value += emoji
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------
  return (
    <div className="write-message">
      <div>
        <p id="write-message-collapse" onClick={() => writeMessage()}>
          {write ? 'view full chatbox' : 'write a message'}
        </p>
      </div>
      <div>
        {write ? (
          <div className="number-textarea">
            {reply ? (
              <label className="label-select-number">
                <span id="replytomessage" onClick={() => setReply(!reply)}>
                  go back
                </span>
                reply to message #
                <select
                  defaultValue={props.draft.messages.length}
                  ref={numberRef}
                >
                  {props.draft.messages.map((message) => {
                    return (
                      <option value={message.messagenumber} key={uuidv4()}>
                        {message.messagenumber}
                      </option>
                    )
                  })}
                </select>
              </label>
            ) : (
              <label className="label-select-number">
                <span id="replytomessage" onClick={() => setReply(!reply)}>
                  reply to a message
                </span>
                select: <span className="span-select-number">insert as #</span>
                <select ref={numberRef} className="write-message-select-number">
                  {props.draft.messages.map((message) => {
                    return (
                      <option value={message.messagenumber} key={uuidv4()}>
                        {message.messagenumber}
                      </option>
                    )
                  })}
                  <option value={props.draft.messages.length + 1}>
                    {props.draft.messages.length + 1}
                  </option>
                </select>
              </label>
            )}
            <textarea
              className="textarea-write-message"
              type="text"
              ref={messageRef}
              placeholder={'write your message here'}
              onKeyDown={keyEventTextarea}
              rows={window.innerWidth <= 979 ? '3' : '5'}
            />
            <EmojiPicker getEmoji={addEmoji} />

            <div className="writemessage-btn">
              {props.draft.philosopher.map((phil) => {
                return (
                  <Button
                    key={uuidv4()}
                    className="button-chat-Phil"
                    id={phil.name}
                    label={phil.name}
                    handleClick={() => getPhil(phil.name, phil.color)}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = (state) => ({
  draft: state.draft,
  user: state.user,
  chat: state.chat,
})

const mapActionsToProps = {
  updateDraft: updateDraft,
  writeMessage: writeMessage,
}

export default connect(mapStateToProps, mapActionsToProps)(WriteMessage)
