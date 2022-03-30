import './WriteComments.css'

import {Comments, StateChat, StateUser} from '../../../redux/interfaces/interfaces'
import React, { Suspense, useRef, useState } from 'react'

import Button from '../../../elements/Button/Button'
import { updateChatDetails } from '../../../redux/actions/chat/chat'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { writeComment } from '../../../redux/actions/user/user'
import { writeMessage } from '../../../redux/actions/draft/draft'

// React.lazy
const EmojiPicker = React.lazy(() => import('../../../elements/Emoji/EmojiPicker'))

const WriteComments: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)

  // date
  const date = new Date()

  // refs
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  // useState
  const [write, setWrite] = useState<boolean>(false)

  // dropdown box to write a comment
  function newComment() {
    dispatch(writeComment(!write))
    setWrite(!write)
  }

  // catches key-event (esc/enter)
  function keyEventInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.code === 'Enter') {
    }
    if (event.code === 'Escape') {
      nameRef.current !== null? nameRef.current.value = '' : null
    }
  }
  function keyEventTextarea(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.code === 'Escape') {
      commentRef.current !== null? commentRef.current.value = '' : null
    }
  }

  // send the comment
  function sendComment() {
    const name: string | null = nameRef.current !== null? nameRef.current.value : null
    const comment: string | null = commentRef.current !== null? commentRef.current.value : null
    let authorOfChat: boolean
    //check if name or comment is set
    if (!name) {
      alert('set a name and then send it')
      return
    }
    if (!comment) {
      alert('Write a comment and then send it')
      return
    }
    if (!user.loggedIn) {
      authorOfChat = false
    } else {
      authorOfChat = true
    }
    // save comment as new object with date
    const dateOfComment = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    const comments: Comments[] = chat.comments
    comments.push({
      name: name,
      date: dateOfComment,
      text: comment,
      author: authorOfChat,
    })

    // save comments in chat
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
    dispatch(writeMessage(true))

    // clear data
    commentRef.current !== null? commentRef.current.value = '' : null
  }

  function addEmoji(emoji: any) {
    commentRef.current !== null? commentRef.current.value += emoji : null
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------
  return (
    <div
      className={
        window.innerWidth <= 1000 ? 'write-comments-mobile' : 'write-comments'
      }
    >
      <div>
        <p id="write-comments-collapse" onClick={() => newComment()}>
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
                placeholder={user.loggedIn ? chat.author : 'name'}
                defaultValue={user.loggedIn ? chat.author : 'name'}
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
                ref={commentRef}
                placeholder={'write your comment here'}
                onKeyDown={keyEventTextarea}
                rows={window.innerWidth <= 1000 ? 4 : 5}
              />
              {/* third party api -> seperate in chunks for deployment */}
              <Suspense fallback={<div>Loading...</div>}>
                <EmojiPicker getEmoji={addEmoji} />
              </Suspense>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}


export default WriteComments
