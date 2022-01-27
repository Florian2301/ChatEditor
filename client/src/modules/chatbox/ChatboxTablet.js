import React, { useRef, useEffect, useState } from 'react'
import Message from '../messages/Message'
import WriteMessage from '../messages/WriteMessage'
import Panel from '../../elements/Panel'
import { connect } from 'react-redux'
import './Chatbox.css'
import { v4 as uuidv4 } from 'uuid'
import { Container, ListGroup } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useDynamicRefs from 'use-dynamic-refs'
import { saveTitle, publishTitle } from '../../redux/actions/title'
import { getUserChats } from '../../redux/actions/chat'

export function ChatboxTablet(props) {
  const scrollRef = useRef()
  const [getRef, setRef] = useDynamicRefs()
  const [scroll, setScroll] = useState(false)

  // scrollTo a replied message
  function scrollTo(replynumber) {
    let messages = props.draft.draftEditmode
      ? props.draft.messages
      : props.chat.messages
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

  useEffect(() => {
    // after sending a message, new message will be scrolled into view or when chat is loaded
    // check if draft/chat is active, "scroll" is for scrolling to a replied message (set in component writeMessage)
    if (props.draft.messages[0] && !scroll) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }, 500)
    }
    // when a draft is saved as chat, then "publish" is set to length of chatsarray (EditDraft)
    // check if a new chat is added, then save new title with chat-id from new chat
    if (
      props.title.publish &&
      props.title.publish < props.chat.userChats.length
    ) {
      setTimeout(() => {
        props.saveTitle(
          props.chat.chatId,
          props.chat.userId,
          props.chat.user,
          props.chat.chatnumber,
          props.chat.title,
          props.chat.author,
          props.chat.date,
          props.chat.language,
          props.chat.tags,
          props.chat.description,
          props.chat.admin
        )
        // clear
        props.title.publish = false
        props.publishTitle(false)
      }, 500)
    }
  }, [
    props.draft.messages,
    props.chat.messages,
    scroll,
    props.chat.userChats,
    props,
  ])

  // get data for display saved draft
  let messages = props.draft.messages
  let chatId = props.draft.draftId
  let chatnumber = ''
  let userId = props.draft.userId
  let title = props.draft.title

  // get data for display saved chat
  if (props.chat.chatEditmode) {
    messages = props.chat.messages
    chatId = props.chat.chatId
    chatnumber = props.chat.chatnumber
    userId = props.chat.userId
    title = props.chat.title
  }

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <Panel title={title} id="chatbox-mobile">
      <Container
        className={
          props.draft.write && props.draft.draftEditmode
            ? 'editchatbox-tablet'
            : 'chatbox-tablet'
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
                          scroll={scrollRef}
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

      {props.draft.draftEditmode ? (
        <WriteMessage
          scrollTo={scrollToReplace}
          defaultScroll={() => setScroll(false)}
        />
      ) : null}
    </Panel>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    draft: state.draft,
    user: state.user,
    title: state.title,
  }
}

const mapActionsToProps = {
  saveTitle: saveTitle,
  publishTitle: publishTitle,
  getUserChats: getUserChats,
}

export default connect(mapStateToProps, mapActionsToProps)(ChatboxTablet)
