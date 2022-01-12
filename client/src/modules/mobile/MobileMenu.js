import React from 'react'
import { connect } from 'react-redux'
import Panel from '../../elements/Panel'
import { setKeyL, setKeyR } from '../../redux/actions/user'
import './MobileMenu.css'

export function MobileMenu(props) {
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
    <Panel title="Mobile Navigation" id="panel-mobile-menu">
      {!props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('adminchats')}>
          Flokrates.Online
        </div>
      ) : null}

      {!props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('userchats')}>
          Know thyself
        </div>
      ) : null}

      <div className="menu" onClick={() => handleKey('chatbox')}>
        Chatbox
      </div>

      {!props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('title')}>
          Title
        </div>
      ) : null}

      {props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('adminchats')}>
          Edit drafts
        </div>
      ) : null}

      {props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('userchats')}>
          Edit chats
        </div>
      ) : null}

      <div className="menu" onClick={() => handleKey('login')}>
        Login/Profile
      </div>

      {!props.user.loggedIn ? (
        <div className="menu" onClick={() => handleKey('about')}>
          About
        </div>
      ) : null}
      <br></br>
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
