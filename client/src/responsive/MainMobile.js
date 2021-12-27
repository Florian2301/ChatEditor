import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import AdminChats from '../modules/tables/AdminChats'
import ChatboxResp from './ChatboxResp'
import UserChats from '../modules/tables/UserChats'
import EditChats from '../modules/editchats/EditChats'
import ChatList from '../modules/tables/ChatList'
import StartDraft from '../modules/editdrafts/StartDraft'
import EditDrafts from '../modules/editdrafts/EditDrafts'
import DraftList from '../modules/tables/DraftList'
import Authorization from '../authorization/Authorization'
import About from '../modules/about/About'
import Title from '../modules/title/Title'
import { getUser, setKeyL, setKeyR } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'
import MobileMenu from './MobileMenu'
import SelectView from '../modules/header/SelectView'
import Language from '../modules/header/Language'
//import firebase from 'firebase/app'
import 'firebase/auth'
import './Responsive.css'

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

  useEffect(() => {
    if (props.title.allTitles.length === 0) {
      props.getAllTitles()
    }
  }, [props.title.allTitles, props])

  // ------------------------------ RETURN -----------------------------------------------------------------------------
  return (
    <div className="responsive-border-mobile">
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
            <Tab eventKey="adminchats" title="Flokrates.Online">
              <div className="table-border-color-mobile">
                <AdminChats />
              </div>
            </Tab>
          ) : (
            <Tab eventKey="userchats" title="Know thyself">
              <div className="table-border-color-mobile">
                <UserChats />
              </div>
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
    </div>
  )
}

// ---------------------- Redux ---------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    draft: state.draft,
    title: state.title,
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
