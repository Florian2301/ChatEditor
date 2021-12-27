import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { writeComment } from '../../redux/actions/user'
import { updateChatDetails } from '../../redux/actions/chat'
import { writeMessage } from '../../redux/actions/draft'
import '../comments/WriteComments.css'
import Button from '../../elements/Button'
import EmojiPicker from '../../elements/EmojiPicker'

export function WriteComments(props) {
  const KEY_ESC = 27
  const KEY_ENTER = 13
  const date = new Date()

  const commentRef = useRef()
  const nameRef = useRef()

  const [write, setWrite] = useState(false)

  // dropdown box to write a comment
  function writeComment() {
    props.writeComment(!write)
    setWrite(!write)
  }

  // catches key-event (esc/enter)
  function keyEventInput(event) {
    if (event.keyCode === KEY_ENTER) {
      console.log('focus')
    }
    if (event.keyCode === KEY_ESC) {
      nameRef.current.value = null
    }
  }
  function keyEventTextarea(event) {
    if (event.keyCode === KEY_ESC) {
      commentRef.current.value = null
    }
  }

  // send the comment
  function sendComment() {
    const name = nameRef.current.value
    const comment = commentRef.current.value
    //check if name or comment is set
    if (!name) {
      alert('set a name and then send it')
      return
    }
    if (!comment) {
      alert('Write a comment and then send it')
      return
    }
    // save comment as new object with date
    const dateOfComment = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    const comments = props.chat.comments
    comments.push({ name, date: dateOfComment, text: comment })

    // save comments in chat
    const title = props.chat.title
    const admin = props.chat.admin
    const id = props.chat.chatId
    const chatnumber = props.chat.chatnumber
    const author = props.chat.author
    const dateOfChat = props.chat.date
    const language = props.chat.language
    const tags = props.chat.tags
    const description = props.chat.description

    props.updateChatDetails(
      id,
      chatnumber,
      title,
      author,
      dateOfChat,
      language,
      tags,
      description,
      admin,
      comments
    )
    props.writeMessage(true)

    // clear data
    commentRef.current.value = null
  }

  function addEmoji(emoji) {
    commentRef.current.value += emoji
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------
  return (
    <div className="write-comments">
      <div className="write-comments-link-section">
        <p id="write-comments-collapse" onClick={() => writeComment()}>
          {write ? 'view full chatbox' : 'write a comment'}
        </p>
      </div>
      <div>
        {write ? (
          <div className="section-write-comment">
            <div className="send-write-comment">
              <input
                className="input-write-comment"
                type="text"
                ref={nameRef}
                placeholder={props.user.loggedIn ? props.chat.author : 'name'}
                defaultValue={props.user.loggedIn ? props.chat.author : null}
                onKeyDown={keyEventInput}
              />
              <Button
                className="btn-write-comment"
                label="send"
                handleClick={() => sendComment()}
              />
            </div>
            <div className="column-write-comment">
              <textarea
                className="textarea-write-comment"
                type="text"
                ref={commentRef}
                placeholder={'write your comment here'}
                onKeyDown={keyEventTextarea}
              />
              <EmojiPicker getEmoji={addEmoji} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
  chat: state.chat,
  title: state.title,
  draft: state.draft,
})

const mapActionsToProps = {
  writeComment: writeComment,
  updateChatDetails: updateChatDetails,
  writeMessage: writeMessage,
}

export default connect(mapStateToProps, mapActionsToProps)(WriteComments)
