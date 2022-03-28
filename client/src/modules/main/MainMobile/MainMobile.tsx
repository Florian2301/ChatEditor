import '../Main.css'

import {Chat, StateChat, StateDraft, StateTitle, StateUser, UserDrafts, UserTitles} from '../../../redux/interfaces/interfaces'
import { Container, Tab, Tabs } from 'react-bootstrap'
import React, { useEffect } from 'react'

import AboutEng from '../../about/Eng/AboutEng'
import AboutGer from '../../about/Ger/AboutGer'
import Authorization from '../../../authorization/authorization/Authorization'
import ChatList from '../../tables/ChatList/ChatList'
import ChatboxCommentsMobile from '../../chatbox/MobileComments/ChatboxCommentsMobile'
import ChatboxMobile from '../../chatbox/Mobile/ChatboxMobile'
import DraftList from '../../tables/DraftList/DraftList'
import EditChats from '../../edit/EditChats/EditChats'
import EditDrafts from '../../edit/EditDrafts/EditDrafts'
import Settings from '../../settings/Settings/Settings'
import StartDraft from '../../edit/StartDraft/StartDraft'
import Title from '../../title/Title'
import UserChats from '../../tables/UserChats/UserChats'
import { getAllTitles } from '../../../redux/actions/title/title'
import { setKeyL } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'

interface Select {
  auto: any,
  desktop: any,
  tablet: any,
  mobile: any,
  id: string
}

// mobile version
const MainMobile: React.FC<Select> = (props: any) => {
  // State
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
