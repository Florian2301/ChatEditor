import './Comments.css'

import {Comments, StateChat, StateUser} from '../../../redux/interfaces/interfaces'

import React from 'react'
import { updateChatDetails } from '../../../redux/actions/chat/chat'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'

const CommentsComponent = (props: {author: boolean, commentRef: any, name: string, date: string, text: string, id: string}) => {
  // state
  const dispatch = useDispatch()
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)

  function deleteComment(id: string) {
    let answer = window.confirm('Delete this comment?')

    if (answer) {
      let comments: Comments[] = []
      chat.comments.map((c: any) => {
        if (c._id !== id) {
          comments.push(c)
        }
        return comments
      })

      dispatch(updateChatDetails(
        chat.chatId,
        chat.chatnumber,
        chat.title,
        chat.author,
        chat.date,
        chat.language,
        chat.tags,
        chat.description,
        chat.admin,
        comments
      ))
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
      {user.loggedIn ? (
        <p className="comments-delete" onClick={() => deleteComment(props.id)}>
          delete
        </p>
      ) : null}
    </div>
  )
}

export default CommentsComponent
