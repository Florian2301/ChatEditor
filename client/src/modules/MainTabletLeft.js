import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
import AdminChats from '../modules/tables/AdminChats'
import UserChats from '../modules/tables/UserChats'
import ChatboxTablet from './chatbox/ChatboxTablet'
import ChatboxCommentsTablet from './chatbox/ChatboxCommentsTablet'
import DraftList from '../modules/tables/DraftList'
import ChatList from '../modules/tables/ChatList'
import { setKeyL } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'
// CSS in App.css/FlexMain

export function MainTabletLeft(props) {
  function handleSelect(key) {
    props.setKeyL(key)
  }

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
    <Container fluid id="responsive-container-tablet">
      <Tabs
        activeKey={props.user.keyL}
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        onSelect={handleSelect}
      >
        {!props.user.loggedIn ? (
          <Tab
            eventKey="adminchats"
            title={`Chats (${adminTitleNumber.length})`}
          >
            <div className="table-border-color">
              <AdminChats />
            </div>
          </Tab>
        ) : (
          <Tab eventKey="adminchats" title={`Draftlist (${draftList.length})`}>
            <DraftList />
          </Tab>
        )}

        {!props.user.loggedIn ? (
          <Tab
            eventKey="userchats"
            title={`Userchats (${userTitleNumber.length})`}
          >
            <div className="table-border-color">
              <UserChats />
            </div>
          </Tab>
        ) : (
          <Tab eventKey="userchats" title={`Chatlist (${chatList.length})`}>
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
          <ChatboxTablet />
        </Tab>

        {props.user.loggedIn ? (
          <Tab
            eventKey="comments"
            title={`Comments (${props.chat.comments.length})`}
          >
            <ChatboxCommentsTablet />
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
    draft: state.draft,
    title: state.title,
    chat: state.chat,
  }
}

let mapDispatchToProps = {
  setKeyL: setKeyL,
  getAllTitles: getAllTitles,
}

let ContainerMainTabletL = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabletLeft)

export default ContainerMainTabletL
