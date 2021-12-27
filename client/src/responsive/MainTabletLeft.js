import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import AdminChats from '../modules/tables/AdminChats'
import UserChats from '../modules/tables/UserChats'
import ChatboxResp from './ChatboxResp'
import DraftList from '../modules/tables/DraftList'
import ChatList from '../modules/tables/ChatList'
import { setKeyL } from '../redux/actions/user'
// CSS in App.css/FlexMain

export function MainTabletLeft(props) {
  function handleSelect(key) {
    props.setKeyL(key)
  }

  return (
    <div id="responsive-border-tablet-left">
      <Container fluid id="responsive-container-tablet">
        <Tabs
          activeKey={
            props.user.keyL === 'menu' ? 'adminchats' : props.user.keyL
          }
          id="uncontrolled"
          style={{ borderBottom: 0 }}
          onSelect={handleSelect}
        >
          {!props.user.loggedIn ? (
            <Tab eventKey="adminchats" title="Flokrates.Online">
              <div className="table-border-color">
                <AdminChats />
              </div>
            </Tab>
          ) : (
            <Tab eventKey="adminchats" title="Drafts">
              <DraftList />
            </Tab>
          )}

          {!props.user.loggedIn ? (
            <Tab eventKey="userchats" title="Know thyself">
              <div className="table-border-color">
                <UserChats />
              </div>
            </Tab>
          ) : (
            <Tab eventKey="userchats" title="Chats">
              <ChatList />
            </Tab>
          )}

          <Tab eventKey="chatbox" title="Chat">
            <ChatboxResp />
          </Tab>
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

let mapDispatchToProps = {
  setKeyL: setKeyL,
}

let ContainerMainTabletL = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabletLeft)

export default ContainerMainTabletL
