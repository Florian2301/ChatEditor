import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import { Container, Tab, Tabs } from 'react-bootstrap'
import ChatboxMobile from '../../chatbox/Mobile/ChatboxMobile.js'
import ChatboxCommentsMobile from '../../chatbox/MobileComments/ChatboxCommentsMobile.js'
import UserChats from '../../tables/UserChats/UserChats.js'
import EditChats from '../../edit/EditChats/EditChats.js'
import ChatList from '../../tables/ChatList/ChatList.js'
import StartDraft from '../../edit/StartDraft/StartDraft.js'
import EditDrafts from '../../edit/EditDrafts/EditDrafts.js'
import DraftList from '../../tables/DraftList/DraftList.js'
import Authorization from '../../../authorization/Authorization.js'
import AboutGer from '../../about/Ger/AboutGer.js'
import AboutEng from '../../about/Eng/AboutEng.js'
import Title from '../../title/Title.js'
import Settings from '../../settings/Settings/Settings.js'
import { setKeyL } from '../../../redux/actions/user/user.js'
import { getAllTitles } from '../../../redux/actions/title/title.js'
import '../Main.css'
import {StateChat, StateUser, StateDraft, StateTitle, UserTitles, Chat, UserDrafts} from '../../../redux/interfaces/interfaces'

// mobile version
const MainMobile: React.FC = (props: any) => {
   const dispatch = useDispatch()
  const title: StateTitle = useTypedSelector((state) => state.title)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)

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

  function handleSelect(key: string | null) {
    key !== null? dispatch(setKeyL(key)) : null
  }

  // ------------------------------ RETURN -----------------------------------------------------------------------------
  return (
    <Container id="responsive-container-mobile">
      <Tabs
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        activeKey={user.keyL}
        onSelect={handleSelect}
      >
        {!user.loggedIn ? (
          <Tab eventKey="userchats" title={`Chats (${userTitle.length})`}>
            <UserChats />
          </Tab>
        ) : null}

        {user.loggedIn ? (
          <Tab eventKey="draftlist" title={`Draftlist (${draftList.length})`}>
            <DraftList />
          </Tab>
        ) : null}

        {user.loggedIn ? (
          <Tab eventKey="chatlist" title={`Chatlist (${chatList.length})`}>
            <ChatList />
          </Tab>
        ) : null}

        {user.loggedIn ? (
          /* eventKey = adminchats because initial state is adminchats when page is refreshed */
          <Tab
            eventKey="userchats"
            title={draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
          >
            {draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
          </Tab>
        ) : null}

        {user.loggedIn ? (
          <Tab eventKey="editchats" title="Edit chats">
            <EditChats />
          </Tab>
        ) : null}

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
            <ChatboxMobile />
          </Tab>

        {chat.chatEditmode ? (
          <Tab
            eventKey="comments"
            title={`Comments (${chat.comments.length})`}
          >
            <ChatboxCommentsMobile />
          </Tab>
        ) : null}

        {!user.loggedIn && chat.chatEditmode ? (
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        ) : null}

        {!user.loggedIn && !chat.chatEditmode ? (
          <Tab eventKey="about" title="About">
            {user.language === 'deutsch' ? <AboutGer /> : <AboutEng />}
          </Tab>
        ) : null}

        <Tab eventKey="login" title={user.loggedIn ? 'Profile' : 'Login'}>
          <Authorization
            auto={props.auto}
            desktop={props.desktop}
            tablet={props.tablet}
            mobile={props.mobile}
            id="viewmobile"
          />
        </Tab>

        {!user.loggedIn ? (
          <Tab eventKey="settings" title="Settings">
            <Settings
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewmobile"
            />
          </Tab>
        ) : null}
      </Tabs>
    </Container>
  )
}


export default MainMobile
