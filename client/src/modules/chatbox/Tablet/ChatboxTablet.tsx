import '../Chatbox.css'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ChatboxMessages, StateChat, StateDraft, StateTitle, StateUser } from '../../../redux/interfaces/interfaces'
import { Container, ListGroup } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { publishTitle, saveTitle } from '../../../redux/actions/title/title'

import Message from '../../messages/Message/Message'
import Panel from '../../../elements/Panel/Panel'
import WriteMessage from '../../messages/WriteMessage/WriteMessage'
import { useDispatch } from 'react-redux'
import useDynamicRefs from 'use-dynamic-refs'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const ChatboxTablet: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const title: StateTitle = useTypedSelector((state) => state.title)
  const user: StateUser = useTypedSelector((state) => state.user)

  // refs
  const scrollRef = useRef<HTMLDivElement>(null)
  const [getRef, setRef]: any = useDynamicRefs() // not sure which type to use here
  
  // useState
  const [scroll, setScroll] = useState<boolean | number>(false)

  // scrollTo a replied message
  function scrollTo(replynumber: string) {
    let numberOfMessage: number = parseInt(replynumber)
    let messages: ChatboxMessages[] = draft.draftEditmode
      ? draft.messages
      : chat.messages
    let scrollToReply: any // type useDynamicRef not clear yet
    messages.map((message: any) => {
      if (message.messagenumber === numberOfMessage) {
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
  function scrollToReplace(number: number) {
    setScroll(number)
    scrollTo(number.toString())
  }

  
  useEffect(() => {
    // after sending a message, new message will be scrolled into view or when chat is loaded
    // check if draft/chat is active, "scroll" is for scrolling to a replied message (set in component writeMessage)
    if (draft.messages[0] && !scroll) {
      setTimeout(() => {
        if(scrollRef.current) {
        scrollRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
        }
      }, 500)
    }
    // when a draft is saved as chat, then "publish" is set to length of chatsarray (EditDraft)
    // check if a new chat is added, then save new title with chat-id from new chat
    if (
      title.publish &&
      title.publish < chat.userChats.length
    ) {
      setTimeout(() => {
        dispatch(saveTitle(
          chat.chatId,
          chat.userId,
          user.username,
          chat.chatnumber,
          chat.title,
          chat.author,
          chat.date,
          chat.language,
          chat.tags,
          chat.description,
          chat.admin
        ))
        // clear
        title.publish = false
        dispatch(publishTitle(false))
      }, 500)
    }
  }, [
    draft.messages,
    chat.messages,
    scroll,
    chat.userChats,
    title.publish,
  ])

  // get data for display saved draft
  let currentMessages: ChatboxMessages[] = draft.messages
  let chatId: string = draft.draftId
  let chatnumber: string | number = ''
  let userId: string = draft.userId
  let chatTitle: string = draft.title

  // get data for display saved chat
  if (chat.chatEditmode) {
    currentMessages = chat.messages
    chatId = chat.chatId
    chatnumber = chat.chatnumber
    userId = chat.userId
    chatTitle = chat.title
  }

  //---- return ---------------------------------------------------------------------------------------------------

  return (
    <Panel title={chatTitle} id="chatbox-mobile">
      <Container
        className={
          draft.write && draft.draftEditmode
            ? 'editchatbox-tablet'
            : 'chatbox-tablet'
        }
      >
        {!user.loggedIn ? (
          <ListGroup>
            <TransitionGroup>
              {currentMessages.map(
                (m: any) => {
                  return (
                    <CSSTransition
                      key={uuidv4()}
                      timeout={1}
                      classNames="transition-message"
                    >
                      <ListGroup.Item
                        className="listgroup-chat"
                        ref={setRef(m._id)}
                        key={uuidv4()}
                      >
                        <Message
                          position={'position-' + m.position}
                          color={'color-' + m.color}
                          key={uuidv4()}
                          number={m.messagenumber}
                          name={m.name}
                          text={m.text}
                          chatid={chatId}
                          chatnumber={chatnumber}
                          messageId={m._id}
                          userid={userId}
                          scroll={scrollRef}
                          repliedmessage={m.repliedmessage}
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
            {currentMessages.map(
              (m: any) => {
                return (
                <div ref={setRef(m._id)} key={uuidv4()}>
                  <Message
                    positionedit={'position-' + m.position + '-edit'}
                    coloredit={'color-' + m.color + '-edit'}
                    key={uuidv4()}
                    number={m.messagenumber}
                    name={m.name}
                    text={m.text}
                    chatid={chatId}
                    chatnumber={chatnumber}
                    messageId={m._id}
                    userid={userId}
                    scroll={scrollRef}
                    repliedmessage={m.repliedmessage}
                    replyTo={scrollTo}
                    scrollTo={scrollToReplace}
                  />
                </div>
                )
              }
            )}
          </ul>
        )}
      </Container>

      {draft.draftEditmode ? (
        <WriteMessage
          scrollTo={scrollToReplace}
          defaultScroll={() => setScroll(false)}
        />
      ) : null}
    </Panel>
  )
}

export default ChatboxTablet
