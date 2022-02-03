import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Main.css'
import { Container, Tab, Tabs } from 'react-bootstrap'
import ChatboxDesktop from './chatbox/ChatboxDesktop'
import ChatboxCommentsDesktop from './chatbox/ChatboxCommentsDesktop'
import Title from './title/Title'
import UserChats from './tables/UserChats'
import StartDraft from './edit/StartDraft'
import EditDrafts from './edit/EditDrafts'
import DraftList from './tables/DraftList'
import EditChats from './edit/EditChats'
import ChatList from './tables/ChatList'
import Authorization from '../authorization/Authorization'
import AboutGer from './about/AboutGer'
import AboutEng from './about/AboutEng'
import Settings from './settings/Settings'
import { setKeyR, setKeyL } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'

export function MainDesktop(props) {
  // function to select menu (tablet/mobile)
  function handleSelectR(key) {
    props.setKeyR(key)
  }

  function handleSelectL(key) {
    props.setKeyL(key)
  }

  // get all titles when page is loading for the first time
  useEffect(() => {
    if (!props.user.loggedIn & (props.title.allTitles.length === 0)) {
      props.getAllTitles()
    }
  }, [props.title.allTitles, props.user.loggedIn, props])

  // filter number of drafts by language
  let draftList = []
  props.draft.userDrafts.map((draft) => {
    if (draft.language === props.user.language) {
      draftList.push(draft)
    }
    return draftList
  })

  // filter number of chats by language
  let chatList = []
  props.chat.userChats.map((chat) => {
    if (chat.language === props.user.language) {
      chatList.push(chat)
    }
    return chatList
  })

  // filter chats by language
  let userTitle = []
  props.title.allTitles.map((title) => {
    if (title.language === props.user.language) {
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
            defaultActiveKey={'userchats'}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelectL}
          >
            {!props.user.loggedIn ? null : (
              <Tab
                eventKey="userchats"
                title={`Draftlist (${draftList.length})`}
              >
                <DraftList />
              </Tab>
            )}

            {!props.user.loggedIn ? (
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
                !props.user.loggedIn
                  ? 'Chatbox'
                  : `Chatbox (${
                      props.draft.draftEditmode
                        ? props.draft.messages.length
                        : props.chat.messages.length
                    })`
              }
            >
              <ChatboxDesktop />
            </Tab>
            {props.chat.chatEditmode ? (
              <Tab
                eventKey="comments"
                title={`Comments (${props.chat.comments.length})`}
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
            activeKey={props.user.keyR}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelectR}
          >
            {props.user.loggedIn ? (
              /* eventKey = about because initial state is "about", when page gets refreshed */
              <Tab
                eventKey="about"
                title={props.draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
              >
                {props.draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
              </Tab>
            ) : null}

            {props.user.loggedIn ? (
              <Tab eventKey="chats" title="Edit Chat">
                <EditChats />
              </Tab>
            ) : (
              <Tab eventKey="about" title="About">
                {props.user.language === 'deutsch' ? (
                  <AboutGer />
                ) : (
                  <AboutEng />
                )}
              </Tab>
            )}

            {!props.user.loggedIn && props.chat.chatEditmode ? (
              <Tab eventKey="title" title={'Title'}>
                <Title />
              </Tab>
            ) : null}

            <Tab
              eventKey="login"
              title={props.user.loggedIn ? 'Profile' : 'Login'}
            >
              <Authorization
                auto={props.auto}
                desktop={props.desktop}
                tablet={props.tablet}
                mobile={props.mobile}
                id="viewdestktop"
              />
            </Tab>

            {!props.user.loggedIn ? (
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

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    draft: state.draft,
    chat: state.chat,
    title: state.title,
  }
}

let mapDispatchToProps = {
  setKeyR: setKeyR,
  setKeyL: setKeyL,
  getAllTitles: getAllTitles,
}

let DesktopContainer = connect(mapStateToProps, mapDispatchToProps)(MainDesktop)

export default DesktopContainer
