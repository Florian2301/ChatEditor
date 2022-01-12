import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import AdminChats from './tables/AdminChats'
import ChatboxResp from './chatbox/ChatboxResp'
import UserChats from './tables/UserChats'
import EditChats from './edit/EditChats'
import ChatList from './tables/ChatList'
import StartDraft from './edit/StartDraft'
import EditDrafts from './edit/EditDrafts'
import DraftList from './tables/DraftList'
import Authorization from '../authorization/Authorization'
import About from './about/About'
import Title from './title/Title'
import { getUser, setKeyL, setKeyR } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'
import MobileMenu from './mobile/MobileMenu'
import SelectView from './header/SelectView'
import Language from './header/Language'
//import firebase from 'firebase/app'
import 'firebase/auth'
import './Main.css'

// mobile version
export function MainMobile(props) {
  function handleSelect(key) {
    props.setKeyL(key)
    if (key === 'adminchats') {
      props.setKeyR('title')
    }
    if (key === 'userchats') {
      props.setKeyR('title')
    }
    if (key === 'menu') {
      props.setKeyR('about')
    }
  }

  // get all titles when page is loading for the first time
  useEffect(() => {
    if (props.title.allTitles.length === 0) {
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

  // filter number of chats from admin/users
  let adminTitle = []
  let userTitle = []
  props.title.allTitles.map((title) => {
    if (title.admin) {
      adminTitle.push(title)
    } else userTitle.push(title)
    return { adminTitle, userTitle }
  })

  // filter chats by language from admin/users
  let adminTitleNumber = []
  let userTitleNumber = []
  if (adminTitle) {
    adminTitle.map((title) => {
      if (title.language === props.user.language) {
        adminTitleNumber.push(title)
      }
      return adminTitleNumber
    })

    userTitle.map((title) => {
      if (title.language === props.user.language) {
        userTitleNumber.push(title)
      }
      return userTitleNumber
    })
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
        <Tab eventKey="menu" title="Menu">
          <MobileMenu />
        </Tab>

        {!props.user.loggedIn && props.user.keyL !== 'userchats' ? (
          <Tab
            eventKey="adminchats"
            title={`Flokrates.Online (${adminTitleNumber.length})`}
          >
            <AdminChats />
          </Tab>
        ) : (
          <Tab eventKey="userchats" title="Know thyself">
            <UserChats />
          </Tab>
        )}

        {props.user.loggedIn && props.user.keyL !== 'chats' ? (
          /* eventKey = adminchats because initial state is adminchats when page is refreshed */
          <Tab eventKey="adminchats" title="Edit drafts">
            {props.draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
            <DraftList />
          </Tab>
        ) : null}

        {props.user.loggedIn && props.user.keyL === 'chats' ? (
          <Tab eventKey="chats" title="Edit chats">
            <EditChats />
            <ChatList />
          </Tab>
        ) : null}

        <Tab eventKey="chatbox" title="Chatbox">
          <ChatboxResp />
        </Tab>

        {!props.user.loggedIn && props.user.keyR === 'title' ? (
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        ) : null}

        {!props.user.loggedIn && props.user.keyR === 'about' ? (
          <Tab eventKey="about" title="About">
            <About />
          </Tab>
        ) : null}

        {props.user.keyR === 'login' ? (
          <Tab
            eventKey="login"
            title={props.user.loggedIn ? 'Profile' : 'Login'}
          >
            <Authorization />
          </Tab>
        ) : null}
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
