import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import Authorization from '../authorization/Authorization'
import EditChats from '../modules/edit/EditChats'
import EditDrafts from '../modules/edit/EditDrafts'
import StartDraft from '../modules/edit/StartDraft'
import ChatboxCommentsTablet from './chatbox/ChatboxCommentsTablet'
import About from '../modules/about/About'
import Title from '../modules/title/Title'
import { setKeyR } from '../redux/actions/user'
// CSS in App.css/FlexMain

export function MainTabletRight(props) {
  function handleSelect(key) {
    props.setKeyR(key)
  }

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
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        )}

        {!props.user.loggedIn ? (
          <Tab
            eventKey="comments"
            title={`Comments (${props.chat.comments.length})`}
          >
            <ChatboxCommentsTablet />
          </Tab>
        ) : null}

        {props.user.loggedIn ? (
          <Tab eventKey="chats" title="Edit Chat">
            <EditChats />
          </Tab>
        ) : (
          <Tab eventKey="about" title="About">
            <About />
          </Tab>
        )}

        {props.user.loggedIn ? (
          <Tab eventKey="login" title="Profile">
            <Authorization />
          </Tab>
        ) : (
          <Tab eventKey="login" title="Login">
            <Authorization />
          </Tab>
        )}
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
