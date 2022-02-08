import React, { useRef, useEffect } from 'react'
import WriteComments from '../comments/WriteComments'
import Comments from '../comments/Comments'
import Panel from '../../elements/Panel'
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

  // show title
  let title = props.draft.title
  if (props.chat.chatEditmode) {
    title = props.chat.title
  }

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <Panel title={title} id="chatbox">
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
        {props.chat.chatEditmode && !props.chat.comments[0] ? (
          <div className="comments-info">~ write a comment here ~</div>
        ) : null}
      </Container>

      {props.chat.chatEditmode ? <WriteComments /> : null}
    </Panel>
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
