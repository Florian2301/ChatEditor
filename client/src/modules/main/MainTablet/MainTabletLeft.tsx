import '../Main.css'

import {Chat, StateChat, StateDraft, StateTitle, StateUser, UserDrafts, UserTitles} from '../../../redux/interfaces/interfaces'
import { Container, Tab, Tabs } from 'react-bootstrap'
import React, { useEffect } from 'react'

import ChatList from '../../tables/ChatList/ChatList'
import ChatboxCommentsTablet from '../../chatbox/TabletComments/ChatboxCommentsTablet'
import ChatboxTablet from '../../chatbox/Tablet/ChatboxTablet'
import DraftList from '../../tables/DraftList/DraftList'
import UserChats from '../../tables/UserChats/UserChats'
import { getAllTitles } from '../../../redux/actions/title/title'
import { setKeyL } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'

const MainTabletLeft: React.FC = () => {
  // State
  const dispatch = useDispatch()
  const title: StateTitle = useTypedSelector((state) => state.title)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)

  // sets key for active tabs
  function handleSelect(key: string | null) {
    key !== null? dispatch(setKeyL(key)) : null
  }

  // get all titles when page is loading for the first time
  useEffect(() => {
    if (!user.loggedIn && (title.allTitles.length === 0)) {
      setTimeout(() => {
        dispatch(getAllTitles())
      }, 2000)
    }
  }, [title.allTitles, user.loggedIn])

  // filter number of drafts by language
  let draftList: UserDrafts[] = []
  draft.userDrafts.map((draft: any) => {
    if (draft.language === user.language) {
      draftList.push(draft)
    }
    return draftList
  })

  // filter number of chats by language
  let chatList: Chat[] = []
  chat.userChats.map((chat: any) => {
    if (chat.language === user.language) {
      chatList.push(chat)
    }
    return chatList
  })

  // filter chats by language
  let userTitle: UserTitles[] = []
  title.allTitles.map((title: any) => {
    if (title.language === user.language) {
      userTitle.push(title)
    }
    return userTitle
  })

  //------------------------------------------------------- return ------------------------------------------------------------
  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs
        activeKey={user.keyL}
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        onSelect={handleSelect}
      >
        {!user.loggedIn ? null : (
          <Tab eventKey="userchats" title={`Draftlist (${draftList.length})`}>
              <DraftList />
          </Tab>
        )}

        {!user.loggedIn ? (
          <Tab eventKey="userchats" title={`Chats (${userTitle.length})`}>
            <div className="table-border-color">
              <UserChats />
            </div>
          </Tab>
        ) : (
          <Tab eventKey="chatlist" title={`Chatlist (${chatList.length})`}>
              <ChatList />
          </Tab>
        )}

          <Tab
            eventKey="chatbox"
            title={
              !user.loggedIn
                ? 'Chatbox'
                : `Chatbox (${
                    draft.draftEditmode
                      ? draft.messages.length
                      : chat.messages.length
                  })`
            }
          >
            <ChatboxTablet />
          </Tab>
      

        {chat.chatEditmode ? (
          <Tab
            eventKey="comments"
            title={`Comments (${chat.comments.length})`}
          >
            <ChatboxCommentsTablet />
          </Tab>
        ) : null}
      </Tabs>
    </Container>
  )
}

export default MainTabletLeft
