import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Main.css'
import { Container, Tab, Tabs } from 'react-bootstrap'
import ChatboxBackend from './chatbox/ChatboxBackend'
import ChatboxPublic from './chatbox/ChatboxPublic'
import ChatboxComments from './chatbox/ChatboxComments'
import AdminChats from './tables/AdminChats'
import Title from './title/Title'
import UserChats from './tables/UserChats'
import StartDraft from './edit/StartDraft'
import EditDrafts from './edit/EditDrafts'
import DraftList from './tables/DraftList'
import EditChats from './edit/EditChats'
import ChatList from './tables/ChatList'
import Authorization from '../authorization/Authorization'
import About from './about/About'
import { setKeyR } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'

export function FlexMain(props) {
  // function to select menu (tablet/mobile)
  function handleSelect(key) {
    props.setKeyR(key)
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

  //---------------------- RETURN ------------------------------------------------------------------------------------

  return (
    <section className="flexContainer-main">
      <div id="item-1">
        <Container fluid>
          <Tabs
            defaultActiveKey={'adminchats'}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
          >
            {!props.user.loggedIn ? (
              <Tab
                eventKey="adminchats"
                title={`Flokrates.Online (${adminTitleNumber.length})`}
              >
                <AdminChats />
              </Tab>
            ) : (
              <Tab
                eventKey="adminchats"
                title={`Draftlist (${draftList.length})`}
              >
                <DraftList />
              </Tab>
            )}

            {!props.user.loggedIn ? (
              <Tab
                eventKey="userchats"
                title={`Know thyself (${userTitleNumber.length})`}
              >
                <UserChats />
              </Tab>
            ) : (
              <Tab eventKey="userchats" title={`Chatlist (${chatList.length})`}>
                <ChatList />
              </Tab>
            )}
          </Tabs>
        </Container>
      </div>

      <div id="item-2">
        <Container fluid>
          <Tabs
            defaultActiveKey={'chatbox'}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
          >
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
              {props.user.loggedIn ? <ChatboxBackend /> : <ChatboxPublic />}
            </Tab>
            <Tab
              eventKey="comments"
              title={`Comments (${props.chat.comments.length})`}
            >
              <ChatboxComments />
            </Tab>
          </Tabs>
        </Container>
      </div>

      <div id="item-3">
        <Container fluid>
          <Tabs
            activeKey={props.user.keyR}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelect}
          >
            {props.user.loggedIn ? (
              /* eventKey = about because initial state is "about", when page gets refreshed */
              <Tab
                eventKey="about"
                title={props.draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
              >
                {props.draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
              </Tab>
            ) : (
              <Tab eventKey="title" title={'Title'}>
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

            <Tab
              eventKey="login"
              title={props.user.loggedIn ? 'Profile' : 'Login'}
            >
              <Authorization />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </section>
  )
}

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    draft: state.draft,
    chat: state.chat,
    title: state.title,
  }
}

let mapDispatchToProps = {
  setKeyR: setKeyR,
  getAllTitles: getAllTitles,
}

let FlexContainer = connect(mapStateToProps, mapDispatchToProps)(FlexMain)

export default FlexContainer
