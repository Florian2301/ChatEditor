import React, { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import { Container, Tab, Tabs } from 'react-bootstrap'
import UserChats from '../../tables/UserChats/UserChats.js'
import ChatboxTablet from '../../chatbox/Tablet/ChatboxTablet.js'
import ChatboxCommentsTablet from '../../chatbox/TabletComments/ChatboxCommentsTablet.js'
//import DraftList from '../../tables/DraftList/DraftList.js'
//import ChatList from '../../tables/ChatList/ChatList.js'
import { setKeyL } from '../../../redux/actions/user/user.js'
import { getAllTitles } from '../../../redux/actions/title/title.js'
import {StateChat, StateUser, StateDraft, StateTitle, UserTitles, Chat, UserDrafts} from '../../../redux/interfaces/interfaces'
import '../Main.css'

// Lazy Load
const DraftList = React.lazy(() => import ('../../tables/DraftList/DraftList.js'))
const ChatList = React.lazy(() => import ('../../tables/ChatList/ChatList.js'))

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
            <Suspense fallback={<div>Loading...</div>}>
              <DraftList />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <ChatList />
            </Suspense>
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
