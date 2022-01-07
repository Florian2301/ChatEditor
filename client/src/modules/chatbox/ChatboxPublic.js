import React, { useRef, useEffect, useState } from 'react'
import useDynamicRefs from 'use-dynamic-refs'
import Message from '../messages/Message'
import Panel from '../../elements/Panel'
import { connect } from 'react-redux'
import './Chatbox.css'
import { v4 as uuidv4 } from 'uuid'
import { Container, ListGroup } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export function ChatboxPublic(props) {
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

  // when the chat is loaded the first message will be scrolled into view
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
  }, [props.chat.messages, scroll, getRef])

  // get data to display chat
  let messages = props.chat.messages
  let chatId = props.chat.chatId
  let chatnumber = props.chat.chatnumber
  let userId = props.chat.userId

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <Panel title={'Title: ' + props.chat.title} id="chatbox">
      <Container className="chatbox">
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
                    <ListGroup.Item className="listgroup-chat">
                      <div ref={setRef(_id)} key={uuidv4()}>
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
                          scroll={scrollRef}
                          repliedmessage={repliedmessage}
                          replyTo={scrollTo}
                          scrollTo={scrollToReplace}
                        />
                      </div>
                    </ListGroup.Item>
                  </CSSTransition>
                )
              }
            )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </Panel>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
  }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ChatboxPublic)
