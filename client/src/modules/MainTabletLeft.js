import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'react-bootstrap'
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

  // filter chats by language
  let userTitle = []
  props.title.allTitles.map((title) => {
    if (title.language === props.user.language) {
      userTitle.push(title)
    }
    return userTitle
  })

  console.log('keyL', props.user.keyL)

  //------------------------------------------------------- return ------------------------------------------------------------
  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs
        activeKey={props.user.keyL}
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        onSelect={handleSelect}
      >
        {!props.user.loggedIn ? null : (
          <Tab eventKey="userchats" title={`Draftlist (${draftList.length})`}>
            <DraftList />
          </Tab>
        )}

        {!props.user.loggedIn ? (
          <Tab eventKey="userchats" title={`Chats (${userTitle.length})`}>
            <div className="table-border-color">
              <UserChats />
            </div>
          </Tab>
        ) : (
          <Tab eventKey="chatlist" title={`Chatlist (${chatList.length})`}>
            <ChatList />
          </Tab>
        )}

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
          <ChatboxTablet />
        </Tab>

        {props.chat.chatEditmode ? (
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
