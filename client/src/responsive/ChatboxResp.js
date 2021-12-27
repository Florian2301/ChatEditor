import React, { useRef, useEffect, useState } from 'react'
import Message from '../modules/messages/Message'
import WriteMessage from '../modules/messages/WriteMessage'
import { connect } from 'react-redux'
import '../modules/chatbox/Chatbox.css'
import { v4 as uuidv4 } from 'uuid'
import { Container, ListGroup } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useDynamicRefs from 'use-dynamic-refs'

export function ChatboxResp(props) {
  const scrollRef = useRef()
  const [getRef, setRef] = useDynamicRefs()
  const [scroll, setScroll] = useState(false)

  // scrollTo a replied message
  function scrollTo(replynumber) {
    const messages = props.chat.messages
    let scrollToReply
    messages.map((message) => {
      if (message.messagenumber === replynumber) {
        scrollToReply = getRef(message._id)
        scrollToReply.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
      return scrollToReply
    })
  }

  // function to get messagenumber from replied message to scroll into view
  function scrollToReplace(number) {
    setScroll(number)
    scrollTo(number)
  }

  // after sending a message, new message will be scrolled into view
  useEffect(() => {
    if (props.chat.messages[0] && !scroll) {
      setTimeout(() => {
        const messages = props.chat.messages
        let scrollToReply
        messages.map((message) => {
          if (message.messagenumber === 1) {
            scrollToReply = getRef(message._id)
            scrollToReply.current.scrollIntoView({
              block: 'start',
              behavior: 'smooth',
            })
          }
          return scrollToReply
        })
      }, 500)
    }
    if (props.draft.messages[0]) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }, 500)
    }
  }, [props.draft.messages, props.chat.messages, scroll, getRef]) //second argument to prevent infinite re-renders

  // get data for display saved draft
  let messages = props.draft.messages
  let chatId = props.draft.draftId
  let chatnumber = ''
  let userId = props.draft.userId

  // get data for display saved chat
  if (props.chat.chatEditmode) {
    messages = props.chat.messages
    chatId = props.chat.chatId
    chatnumber = props.chat.chatnumber
    userId = props.chat.userId
  }

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <div>
      <Container
        className={
          props.draft.write && props.draft.draftEditmode
            ? 'editchatbox-resp'
            : 'chatbox-resp'
        }
      >
        {!props.user.loggedIn ? (
          <ListGroup>
            <TransitionGroup>
              {messages.map(
                ({
                  _id,
                  color,
                  position,
                  name,
                  messagenumber,
                  text,
                  repliedmessage,
                }) => {
                  return (
                    <CSSTransition
                      key={uuidv4()}
                      timeout={1}
                      classNames="transition-message"
                    >
                      <ListGroup.Item
                        className="listgroup-chat"
                        ref={setRef(_id)}
                        key={uuidv4()}
                      >
                        <Message
                          position={'position-' + position}
                          color={'color-' + color}
                          key={uuidv4()}
                          number={messagenumber}
                          name={name}
                          text={text}
                          chatid={chatId}
                          chatnumber={chatnumber}
                          messageId={_id}
                          userid={userId}
                          repliedmessage={repliedmessage}
                          replyTo={scrollTo}
                          scrollTo={scrollToReplace}
                        />
                      </ListGroup.Item>
                    </CSSTransition>
                  )
                }
              )}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <ul className="listgroup-edit">
            {messages.map(
              ({
                _id,
                color,
                position,
                name,
                messagenumber,
                text,
                repliedmessage,
              }) => {
                return (
                  <Message
                    positionedit={'position-' + position + '-edit'}
                    coloredit={'color-' + color + '-edit'}
                    key={uuidv4()}
                    number={messagenumber}
                    name={name}
                    text={text}
                    chatid={chatId}
                    chatnumber={chatnumber}
                    messageId={_id}
                    userid={userId}
                    scroll={scrollRef}
                    repliedmessage={repliedmessage}
                    replyTo={scrollTo}
                    scrollTo={scrollToReplace}
                  />
                )
              }
            )}
          </ul>
        )}
      </Container>

      {props.draft.draftEditmode ? <WriteMessage /> : null}
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

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ChatboxResp)
