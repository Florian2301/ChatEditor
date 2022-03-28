import '../ChatboxComments.css'

import { Container, ListGroup } from 'react-bootstrap'
import React, { useEffect, useRef } from 'react'
import { StateChat, StateDraft, StateUser } from '../../../redux/interfaces/interfaces'

import Comments from '../../comments/Comments/Comments'
import Panel from '../../../elements/Panel/Panel'
import WriteComments from '../../comments/WriteComments/WriteComments'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'
import { writeMessage } from '../../../redux/actions/draft/draft'

const ChatboxComments: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)

  // ref
  const scrollToCommentRef = useRef<HTMLDivElement>(null)

  // after sending a comment, new comment will be scrolled into view
  // props.draft.write (boolean), sets true, when comment is sent
  useEffect(() => {
    if (chat.messages[0] && draft.write && !user.loggedIn) {
      if(scrollToCommentRef.current !== null) {
      scrollToCommentRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
    }
      dispatch(writeMessage(false))
    }
  }, [chat.messages, draft.write, user.loggedIn])

  // show title
  let title: string = draft.title
  if (chat.chatEditmode) {
    title = chat.title
  }

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <Panel title={title} id="chatbox-comments">
      <Container
        className={user.writeComment ? 'commentchatbox' : 'chatbox-default'}
      >
        {chat.chatEditmode ? (
          <ListGroup>
            {chat.comments.map((c: any) => {
              return (
                <ListGroup.Item
                  className="listgroup-chat-comments"
                  key={uuidv4()}
                >
                  <Comments
                    key={uuidv4()}
                    name={c.name}
                    date={c.date}
                    text={c.text}
                    author={c.author}
                    id={c._id}
                    commentRef={scrollToCommentRef}
                  />
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        ) : (
          <div className="comments-info">
            ~ chose a chat and write a comment ~
          </div>
        )}
        {chat.chatEditmode && !chat.comments[0] ? (
          <div className="comments-info">~ write a comment here ~</div>
        ) : null}
      </Container>

      {chat.chatEditmode ? <WriteComments /> : null}
    </Panel>
  )
}

export default ChatboxComments
