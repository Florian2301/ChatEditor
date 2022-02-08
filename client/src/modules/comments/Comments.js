import React from 'react'
import { connect } from 'react-redux'
import { updateChatDetails } from '../../redux/actions/chat'
import '../comments/Comments.css'

export function Comments(props) {
  function deleteComment(id) {
    let answer = window.confirm('Delete this comment?')

    if (answer) {
      const chatId = props.chat.chatId
      const chatnumber = props.chat.chatnumber
      const title = props.chat.title
      const author = props.chat.author
      const dateOfChat = props.chat.date
      const language = props.chat.language
      const tags = props.chat.tags
      const description = props.chat.description
      const admin = props.user.admin
      let comments = []
      props.chat.comments.map((c) => {
        if (c._id !== id) {
          comments.push(c)
        }
        return comments
      })

      props.updateChatDetails(
        chatId,
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
    }
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------
  return (
    <div
      className={props.author ? 'comments-author' : 'comments-user'}
      ref={props.commentRef}
    >
      <div className="comments-header">
        <p className="comments-name">
          {props.author ? props.name + ' (author)' : props.name}
        </p>
        <p className="comments-date">{props.date}</p>
      </div>
      <div className="comments-body">
        <p className="comments-text">{props.text}</p>
      </div>
      {props.user.loggedIn ? (
        <p className="comments-delete" onClick={() => deleteComment(props.id)}>
          delete
        </p>
      ) : null}
    </div>
  )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
})

const mapActionsToProps = {
  updateChatDetails: updateChatDetails,
}

export default connect(mapStateToProps, mapActionsToProps)(Comments)
