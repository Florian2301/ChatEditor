import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import Authorization from '../authorization/Authorization'
import EditChats from '../modules/edit/EditChats'
import EditDrafts from '../modules/edit/EditDrafts'
import StartDraft from '../modules/edit/StartDraft'
import AboutGer from './about/AboutGer'
import AboutEng from './about/AboutEng'
import Title from '../modules/title/Title'
import Settings from './settings/Settings'
import { setKeyR } from '../redux/actions/user'
// CSS in App.css/FlexMain

export function MainTabletRight(props) {
  function handleSelect(key) {
    props.setKeyR(key)
  }

  // ------------- Return --------------------------------------------------------------------

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs
        activeKey={props.user.keyR === 'chatbox' ? 'about' : props.user.keyR}
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        onSelect={handleSelect}
      >
        {props.user.loggedIn ? (
          /* eventKey = about because initial state is about when page is refreshed */
          <Tab
            eventKey="about"
            title={props.draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
          >
            {props.draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
          </Tab>
        ) : (
          <Tab eventKey="about" title="About">
            {props.user.language === 'deutsch' ? <AboutGer /> : <AboutEng />}
          </Tab>
        )}

        {!props.user.loggedIn && props.chat.chatEditmode ? (
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="chats" title="Edit Chat">
            <EditChats />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="login" title="Profile">
            <Authorization
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewtablet"
            />
          </Tab>
        ) : (
          <Tab eventKey="login" title="Login">
            <Authorization />
          </Tab>
        )}

        {!props.user.loggedIn ? (
          <Tab eventKey="settings" title="Settings">
            <Settings
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewtablet"
            />
          </Tab>
        ) : null}
      </Tabs>
    </Container>
  )
}

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    chat: state.chat,
    draft: state.draft,
  }
}

let mapDispatchToProps = { setKeyR: setKeyR }

let ContainerMainTabletR = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabletRight)

export default ContainerMainTabletR
