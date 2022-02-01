import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import ChatboxMobile from './chatbox/ChatboxMobile'
import ChatboxCommentsMobile from './chatbox/ChatboxCommentsMobile'
import UserChats from './tables/UserChats'
import EditChats from './edit/EditChats'
import ChatList from './tables/ChatList'
import StartDraft from './edit/StartDraft'
import EditDrafts from './edit/EditDrafts'
import DraftList from './tables/DraftList'
import Authorization from '../authorization/Authorization'
import AboutGer from './about/AboutGer'
import AboutEng from './about/AboutEng'
import Title from './title/Title'
import { getUser, setKeyL, setKeyR } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'
import SelectView from './header/SelectView'
import Language from './header/Language'
import 'firebase/auth'
import './Main.css'

// mobile version
export function MainMobile(props) {
  // get all titles when page is loading for the first time
  useEffect(() => {
    if (!props.user.loggedIn & (props.title.allTitles.length === 0)) {
      props.getAllTitles()
    }
  }, [props.title.allTitles, props])

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

  function handleSelect(key) {
    props.setKeyL(key)
  }

  // ------------------------------ RETURN -----------------------------------------------------------------------------
  return (
    <Container id="responsive-container-mobile">
      <div id="mobile-header">
        <Language id="mobile-language" />
        <SelectView
          auto={props.auto}
          desktop={props.desktop}
          tablet={props.tablet}
          mobile={props.mobile}
          id={props.id}
        />
      </div>
      <Tabs
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        activeKey={props.user.keyL}
        onSelect={handleSelect}
      >
        {!props.user.loggedIn ? (
          <Tab eventKey="userchats" title={`Userchats (${userTitle.length})`}>
            <UserChats />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="draftlist" title={`Draftlist (${draftList.length})`}>
            <DraftList />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="chatlist" title={`Chatlist (${chatList.length})`}>
            <ChatList />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          /* eventKey = adminchats because initial state is adminchats when page is refreshed */
          <Tab
            eventKey="adminchats"
            title={props.draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
          >
            {props.draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="userchats" title="Edit chats">
            <EditChats />
          </Tab>
        ) : null}

        <Tab eventKey="chatbox" title="Chatbox">
          <ChatboxMobile />
        </Tab>

        <Tab eventKey="comments" title="Comments">
          <ChatboxCommentsMobile />
        </Tab>

        {!props.user.loggedIn ? (
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        ) : null}

        {!props.user.loggedIn ? (
          <Tab eventKey="about" title="About">
            {props.user.language === 'deutsch' ? <AboutGer /> : <AboutEng />}
          </Tab>
        ) : null}

        <Tab eventKey="login" title={props.user.loggedIn ? 'Profile' : 'Login'}>
          <Authorization />
        </Tab>
      </Tabs>
    </Container>
  )
}

// ---------------------- Redux ---------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    draft: state.draft,
    title: state.title,
    chat: state.chat,
  }
}

let mapDispatchToProps = {
  getUser: getUser,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
  getAllTitles: getAllTitles,
}

let MainMobileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMobile)

export default MainMobileConnected
