import React, { useRef, useEffect } from 'react'
import WriteComments from '../comments/WriteComments'
import Comments from '../comments/Comments'
import { writeMessage } from '../../redux/actions/draft'
import { connect } from 'react-redux'
import './Chatbox.css'
import { v4 as uuidv4 } from 'uuid'
import { Container, ListGroup } from 'react-bootstrap'

export function ChatboxComments(props) {
  const scrollToCommentRef = useRef()

  // after sending a comment, new comment will be scrolled into view
  // props.draft.write (boolean), sets true, when comment is sent
  useEffect(() => {
    if (props.chat.messages[0] && props.draft.write && !props.user.loggedIn) {
      scrollToCommentRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
      props.writeMessage(false)
    }
  }, [props.chat.messages, props.draft.write, props, props.user.loggedIn])

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <div>
      <Container
        className={props.user.writeComment ? 'commentchatbox' : 'chatbox'}
      >
        {props.chat.chatEditmode ? (
          <ListGroup>
            {props.chat.comments.map((c) => {
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
                    id={c._id}
                    commentRef={scrollToCommentRef}
                  />
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        ) : (
          <div className="comments-info">
            ~ comments: only available when a chat is published ~
          </div>
        )}
      </Container>

      {props.chat.chatEditmode ? <WriteComments /> : null}
    </div>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    draft: state.draft,
    user: state.user,
  }
}

const mapActionsToProps = {
  writeMessage: writeMessage,
}

export default connect(mapStateToProps, mapActionsToProps)(ChatboxComments)
