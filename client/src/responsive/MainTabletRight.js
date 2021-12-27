import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import Authorization from '../authorization/Authorization'
import EditChats from '../modules/editchats/EditChats'
import EditDrafts from '../modules/editdrafts/EditDrafts'
import About from '../modules/about/About'
import Title from '../modules/title/Title'
import { setKeyR } from '../redux/actions/user'
// CSS in App.css/FlexMain

export function MainTabletRight(props) {
  function handleSelect(key) {
    props.setKeyR(key)
  }

  return (
    <div id="responsive-border-tablet-right">
      <Container fluid id="responsive-container-tablet">
        <Tabs
          activeKey={props.user.keyR === 'chatbox' ? 'about' : props.user.keyR}
          id="uncontrolled"
          style={{ borderBottom: 0 }}
          onSelect={handleSelect}
        >
          {props.user.loggedIn ? (
            /* eventKey = about because initial state is about when page is refreshed */
            <Tab eventKey="about" title="Edit Draft">
              <EditDrafts />
            </Tab>
          ) : (
            <Tab eventKey="title" title="Title">
              <Title />
            </Tab>
          )}

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
    </div>
  )
}

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = { setKeyR: setKeyR }

let ContainerMainTabletR = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabletRight)

export default ContainerMainTabletR
