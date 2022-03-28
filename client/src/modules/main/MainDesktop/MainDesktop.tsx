import '../Main.css'

import {Chat, StateChat, StateDraft, StateTitle, StateUser, UserDrafts, UserTitles} from '../../../redux/interfaces/interfaces'
import { Container, Tab, Tabs } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { setKeyL, setKeyR } from '../../../redux/actions/user/user'

import AboutEng from '../../about/Eng/AboutEng'
import AboutGer from '../../about/Ger/AboutGer'
import Authorization from '../../../authorization/authorization/Authorization'
import ChatList from '../../tables/ChatList/ChatList'
import ChatboxCommentsDesktop from '../../chatbox/DesktopComments/ChatboxCommentsDesktop'
import ChatboxDesktop from '../../chatbox/Desktop/ChatboxDesktop'
import DraftList from '../../tables/DraftList/DraftList'
import EditChats from '../../edit/EditChats/EditChats'
import EditDrafts from '../../edit/EditDrafts/EditDrafts'
import Settings from '../../settings/Settings/Settings'
import StartDraft from '../../edit/StartDraft/StartDraft'
import Title from '../../title/Title'
import UserChats from '../../tables/UserChats/UserChats'
import { getAllTitles } from '../../../redux/actions/title/title'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'

interface Select {
  auto: any,
  desktop: any,
  tablet: any,
  mobile: any,
  id: string
}

const MainDesktop: React.FC<Select> = (props: any) => {
  //State
  const dispatch = useDispatch()
  const title: StateTitle = useTypedSelector((state) => state.title)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)


  // function to select menu (tablet/mobile)
  const handleSelectR = (key: string | null) => {
    key !== null? dispatch(setKeyR(key)) : null
  }

  const handleSelectL = ( key: string | null) => {
    key !== null? dispatch(setKeyL(key)) : null
  }

  // get all titles when page is loading for the first time
  useEffect(() => {
    if (!user.loggedIn && title.allTitles.length === 0) {
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


  //---------------------- RETURN ------------------------------------------------------------------------------------

  return (
    <section className="flexContainer-main">
      <div id="item-1">
        <Container fluid>
          <Tabs
            defaultActiveKey={user.keyL}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelectL}
          >
            {!user.loggedIn ? null : (
              <Tab
                eventKey="userchats"
                title={`Draftlist (${draftList.length})`}
              >
                  <DraftList />
              </Tab>
            )}

            {!user.loggedIn ? (
              <Tab eventKey="userchats" title={`Chats (${userTitle.length})`}>
                <UserChats />
              </Tab>
            ) : (
              <Tab eventKey="chatlist" title={`Chatlist (${chatList.length})`}>
                
                  <ChatList />
              </Tab>
            )}
          </Tabs>
        </Container>
      </div>

      <div id="item-2">
        <Container fluid>
          <Tabs
            defaultActiveKey={'chatbox'}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
          >
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
              <ChatboxDesktop />
            </Tab>
            {chat.chatEditmode ? (
              <Tab
                eventKey="comments"
                title={`Comments (${chat.comments.length})`}
              >
                <ChatboxCommentsDesktop />
              </Tab>
            ) : null}
          </Tabs>
        </Container>
      </div>

      <div id="item-3">
        <Container fluid>
          <Tabs
            activeKey={user.keyR}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelectR}
          >
            {user.loggedIn ? (
              /* eventKey = about because initial state is "about", when page gets refreshed */
              <Tab
                eventKey="about"
                title={draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
              >
                  {draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
              </Tab>
            ) : null}

            {user.loggedIn ? (
              <Tab eventKey="chats" title="Edit Chat">
                  <EditChats />
              </Tab>
            ) : (
              <Tab eventKey="about" title="About">
                {user.language === 'deutsch' ? (
                  <AboutGer />
                ) : (
                  <AboutEng />
                )}
              </Tab>
            )}

            {!user.loggedIn ? (
              <Tab eventKey="title" title={'Title'}>
                <Title />
              </Tab>
            ) : null}

            <Tab
              eventKey="login"
              title={user.loggedIn ? 'Profile' : 'Login'}
            >
              <Authorization
                auto={props.auto}
                desktop={props.desktop}
                tablet={props.tablet}
                mobile={props.mobile}
                id="viewdestktop"
              />
            </Tab>

            {!user.loggedIn ? (
              <Tab eventKey="settings" title="Settings">
                <Settings
                  auto={props.auto}
                  desktop={props.desktop}
                  tablet={props.tablet}
                  mobile={props.mobile}
                  id="viewdestktop"
                />
              </Tab>
            ) : null}
          </Tabs>
        </Container>
      </div>
    </section>
  )
}

export default MainDesktop