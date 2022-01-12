import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import AdminChats from '../modules/tables/AdminChats'
import UserChats from '../modules/tables/UserChats'
import ChatboxResp from './chatbox/ChatboxResp'
import DraftList from '../modules/tables/DraftList'
import ChatList from '../modules/tables/ChatList'
import { setKeyL } from '../redux/actions/user'
// CSS in App.css/FlexMain

export function MainTabletLeft(props) {
  function handleSelect(key) {
    props.setKeyL(key)
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

  //------------------------------------------------------- return ------------------------------------------------------------
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
            <Tab
              eventKey="adminchats"
              title={`Flokrates.Online (${adminTitleNumber.length})`}
            >
              <div className="table-border-color">
                <AdminChats />
              </div>
            </Tab>
          ) : (
            <Tab eventKey="adminchats" title={`Drafts (${draftList.length})`}>
              <DraftList />
            </Tab>
          )}

          {!props.user.loggedIn ? (
            <Tab
              eventKey="userchats"
              title={`Know thyself (${userTitleNumber.length})`}
            >
              <div className="table-border-color">
                <UserChats />
              </div>
            </Tab>
          ) : (
            <Tab eventKey="userchats" title={`Chats (${chatList.length})`}>
              <ChatList />
            </Tab>
          )}

          <Tab
            eventKey="chatbox"
            title={`Chatbox (${
              props.draft.draftEditmode
                ? props.draft.messages.length
                : props.chat.messages.length
            })`}
          >
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
    draft: state.draft,
    title: state.title,
    chat: state.chat,
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
