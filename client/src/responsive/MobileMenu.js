import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import Panel from '../elements/Panel'
import { setKeyL, setKeyR } from '../redux/actions/user'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'
import './Responsive.css'

export function MobileMenu(props) {
  const [about, setAbout] = useState(false)
  const [adminchats, setAdminchats] = useState(false)
  const [userchats, setUserchats] = useState(false)
  const [chatbox, setChatbox] = useState(false)
  const [login, setLogin] = useState(false)
  const [drafts, setDrafts] = useState(false)
  const [chats, setChats] = useState(false)
  const [title, setTitle] = useState(false)

  // dropdown menu
  function toggleDetails(key) {
    setAbout(false)
    setAdminchats(false)
    setUserchats(false)
    setChatbox(false)
    setLogin(false)
    setDrafts(false)
    setChats(false)
    SVGTextPositioningElement(false)
    if (key === 'about') setAbout(!about)
    if (key === 'adminchats') setAdminchats(!adminchats)
    if (key === 'userchats') setUserchats(!userchats)
    if (key === 'chatbox') setChatbox(!chatbox)
    if (key === 'login') setLogin(!login)
    if (key === 'drafts') setDrafts(!drafts)
    if (key === 'chats') setChats(!chats)
    if (key === 'title') setTitle(!title)
  }

  // active tabs
  function handleKey(key) {
    props.setKeyL(key)

    if (key === 'about') {
      props.setKeyR(key)
    }
    if (key === 'login') {
      props.setKeyR(key)
    }
    if (key === 'title') {
      props.setKeyR(key)
    }
    if (!props.user.loggedIn && (key === 'adminchats' || key === 'userchats')) {
      props.setKeyR('title')
    }
  }

  //---------------------------------------- RETURN ------------------------------------------------------------

  return (
    <Panel title="Navigation and further information" id="panel-mobile-menu">
      <p className="sitemap-para-mobile" id="menu-advice-mobile">
        - recommended view is on a laptop/desktop screen -
      </p>

      {!props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('adminchats')}>
                Flokrates.Online
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('adminchats')}
              aria-controls="example-collapse-text"
              aria-expanded={adminchats}
            >
              {!adminchats ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={adminchats}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="sitemap-para-details">
                    Under{' '}
                    <span
                      className="menu-inside"
                      onClick={() => handleKey('adminchats')}
                    >
                      "Flokrates.Online"
                    </span>{' '}
                    you will find an introduction about how to use this chat
                    editor. In this section i will also post my own chats in the
                    future.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}

      {!props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('userchats')}>
                Know thyself
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('userchats')}
              aria-controls="example-collapse-text"
              aria-expanded={userchats}
            >
              {!userchats ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={userchats}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="sitemap-para-details">
                    Under{' '}
                    <span
                      className="menu-inside"
                      onClick={() => handleKey('userchats')}
                    >
                      "Know thyself"{' '}
                    </span>{' '}
                    you can publish your own chats. At the moment you can see
                    example dialogues i quoted from the great Plato, to see how
                    your chat could look like.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}

      <div>
        <div className="menu-panel">
          <p className="sitemap-para-mobile">
            <span className="menu" onClick={() => handleKey('chatbox')}>
              Chat
            </span>
          </p>
          <p
            className="menu-link"
            onClick={() => toggleDetails('chatbox')}
            aria-controls="example-collapse-text"
            aria-expanded={chatbox}
          >
            {!chatbox ? 'more...' : 'less...'}
          </p>
        </div>
        <TransitionGroup>
          <CSSTransition
            key={uuidv4()}
            timeout={1}
            classNames="transition-menu"
          >
            <Collapse in={chatbox}>
              <div className="menu-details" id="example-collapse-text">
                <p className="sitemap-para-details">
                  On{' '}
                  <span
                    className="menu-inside"
                    onClick={() => handleKey('chatbox')}
                  >
                    "Chat"{' '}
                  </span>{' '}
                  the published chats will be displayed. When you are logged in,
                  you will write your chats in this section as well.
                </p>
              </div>
            </Collapse>
          </CSSTransition>
        </TransitionGroup>
      </div>

      {!props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('title')}>
                Title
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('title')}
              aria-controls="example-collapse-text"
              aria-expanded={title}
            >
              {!title ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={title}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="sitemap-para-details">
                    Under{' '}
                    <span
                      className="menu-inside"
                      onClick={() => handleKey('title')}
                    >
                      "Title"{' '}
                    </span>{' '}
                    you can see the details of the chat.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}

      {props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('adminchats')}>
                Edit drafts
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('drafts')}
              aria-controls="example-collapse-text"
              aria-expanded={drafts}
            >
              {!drafts ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={drafts}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="sitemap-para-details">
                    if you log in you can start writing a chat in the{' '}
                    <span
                      className="menu-inside"
                      onClick={() => handleKey('adminchats')}
                    >
                      {' '}
                      "Edit drafts"{' '}
                    </span>{' '}
                    section.
                  </p>
                  <p className="sitemap-para-details">
                    First add names (your participants), set a title and click
                    "New chat". Afterwards you can start writing your own chat.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}

      {props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('chats')}>
                Edit chats
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('chats')}
              aria-controls="example-collapse-text"
              aria-expanded={chats}
            >
              {!chats ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={chats}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="sitemap-para-details">
                    Once you are ready to publish your chat you go to{' '}
                    <span
                      className="menu-inside"
                      onClick={() => handleKey('chats')}
                    >
                      "Edit chats"{' '}
                    </span>{' '}
                    and set a "chatnumber" and a "date", then click on "Publish
                    chat".
                  </p>
                  <p className="sitemap-para-details">
                    You can also change the "chatnumber" "title", "date", "tags"
                    and "description" of a published chat when you click on
                    "Save changes" after you you made your changes.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}

      <div>
        <div className="menu-panel">
          <p className="sitemap-para-mobile">
            <span className="menu" onClick={() => handleKey('login')}>
              Login/Profile
            </span>
          </p>
          <p
            className="menu-link"
            onClick={() => toggleDetails('login')}
            aria-controls="example-collapse-text"
            aria-expanded={login}
          >
            {!login ? 'more...' : 'less...'}
          </p>
        </div>
        <TransitionGroup>
          <CSSTransition
            key={uuidv4()}
            timeout={1}
            classNames="transition-menu"
          >
            <Collapse in={login}>
              <div className="menu-details" id="example-collapse-text">
                <p className="sitemap-para-details">
                  If you like to have a look "inside" the chat editor, to see
                  how to use it, you can go to{' '}
                  <span
                    className="menu-inside"
                    onClick={() => handleKey('login')}
                  >
                    "Login"{' '}
                  </span>{' '}
                  and log in with the given testuser credentials. Feel free to
                  write, edit and publish a chat for testing purposes.
                </p>
              </div>
            </Collapse>
          </CSSTransition>
        </TransitionGroup>
      </div>

      {!props.user.loggedIn ? (
        <div>
          <div className="menu-panel">
            <p className="sitemap-para-mobile">
              <span className="menu" onClick={() => handleKey('about')}>
                About
              </span>
            </p>
            <p
              className="menu-link"
              onClick={() => toggleDetails('about')}
              aria-controls="example-collapse-text"
              aria-expanded={about}
            >
              {!about ? 'more...' : 'less...'}
            </p>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={about}>
                <div className="menu-details" id="example-collapse-text">
                  Its about the app
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ) : null}
    </Panel>
  )
}

// ---------------------- Redux ---------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = {
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

let MobileMenuConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu)

export default MobileMenuConnected
