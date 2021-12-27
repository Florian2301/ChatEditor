import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './MainDesktop.css'
import { Container, Tab, Tabs } from 'react-bootstrap'
import ChatboxBackend from './chatbox/ChatboxBackend'
import ChatboxPublic from './chatbox/ChatboxPublic'
import ChatboxComments from './chatbox/ChatboxComments'
import AdminChats from './tables/AdminChats'
import Title from './title/Title'
import UserChats from './tables/UserChats'
import StartDraft from './editdrafts/StartDraft'
import EditDrafts from './editdrafts/EditDrafts'
import DraftList from './tables/DraftList'
import EditChats from './editchats/EditChats'
import ChatList from './tables/ChatList'
import Authorization from '../authorization/Authorization'
import About from './about/About'
import { setKeyR } from '../redux/actions/user'
import { getAllTitles } from '../redux/actions/title'

export function FlexMain(props) {
  function handleSelect(key) {
    props.setKeyR(key)
  }

  useEffect(() => {
    if (props.title.allTitles.length === 0) {
      props.getAllTitles()
    }
  }, [props.title.allTitles, props])

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
              <Tab eventKey="adminchats" title="Flokrates.Online">
                <AdminChats />
              </Tab>
            ) : (
              <Tab eventKey="adminchats" title="Drafts">
                <DraftList />
              </Tab>
            )}

            {!props.user.loggedIn ? (
              <Tab eventKey="userchats" title={'Know thyself'}>
                <UserChats />
              </Tab>
            ) : (
              <Tab eventKey="userchats" title="Chats">
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
            <Tab eventKey="chatbox" title={'Chatbox'}>
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
            activeKey={props.user.keyL === 'menu' ? 'about' : props.user.keyR}
            id="uncontrolled"
            style={{ borderBottom: 0 }}
            onSelect={handleSelect}
          >
            {props.user.loggedIn ? (
              /* eventKey = about because initial state is "about", when page gets refreshed */
              <Tab eventKey="about" title={'Edit Draft'}>
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
