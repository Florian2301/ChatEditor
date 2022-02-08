import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { connect } from 'react-redux'
import {
  getUser,
  clearDisplay,
  logout,
  setKeyR,
  setKeyL,
} from '../redux/actions/user'
import SelectView from '../modules/settings/SelectView'
import Language from '../modules/settings/Language'

export function Dashboard(props) {
  const [error, setError] = useState('')
  const [welcome, setWelcome] = useState(true)
  const [updateProfile, setUpdateProfile] = useState(true)
  const [userLoggedOut, setUserLoggedOut] = useState(false)
  const { currentUser, logout } = useAuth()
  const history = useNavigate()
  const update = 'Your profile has been updated successfully!'
  let welcomeMessage = ''

  // get all Users for further actions (when update Profile is clicked)
  function getUsers() {
    props.getUser()
  }

  // go to startpage
  function clear() {
    props.clearDisplay()
    props.setKeyL('userchats')
    props.setKeyR('about')
  }

  // log out via firebase
  async function handleLogout() {
    props.clearDisplay()
    props.logout() // reset state.user
    setUserLoggedOut(true)
    setError('')
    try {
      await logout()
      history('/login')
      props.setKeyL('userchats')
      props.setKeyR('about')
    } catch {
      setError('Log out failed')
    }
  }

  // get currentUser for welcome message
  var user = firebase.auth().currentUser
  if (user) {
    welcomeMessage = 'Welcome ' + user.displayName + '!'
  }

  // if page reloads, user still logged in
  firebase.auth().onAuthStateChanged((user) => {
    if (user && !props.user.loggedIn & !userLoggedOut) {
      props.getUser(user.displayName)
    }
  })

  // set welcome message and timout after 10 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcome(false)
    }, 10000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  // set update message and timout after 10 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateProfile(false)
    }, 10000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  // ----------------------------- RETURN ----------------------------------------------------------------------

  return (
    <Panel id="auth" title="Your profile">
      <div className="options">
        <h3 className="dashboard-settings">Settings</h3>
        <br />
        <p>I. Select a view for your device</p>
        <SelectView
          auto={props.auto}
          desktop={props.desktop}
          tablet={props.tablet}
          mobile={props.mobile}
          id={props.id}
        />
      </div>

      <div className="options">
        <p>II. Select language of chats</p>
        <Language />
      </div>

      <div className="options">
        <p>III. Go back to startpage</p>
        <p id="options-link-clear" onClick={clear}>
          Startpage
        </p>
      </div>

      <div className="dasboard-border">{''}</div>

      <div className="text-center mb-4">
        {error && (
          <Alert className="auth-alert" variant="danger">
            {error}
          </Alert>
        )}
        {welcome && props.user.welcome ? (
          <p className="auth-alert">{welcomeMessage}</p>
        ) : null}
        {updateProfile && props.user.update ? (
          <p className="auth-alert">{update}</p>
        ) : null}
      </div>

      <div className="auth-user">
        <strong id="auth-strong-username">User:</strong>
        {currentUser.displayName}
      </div>

      <div className="auth-user">
        <strong id="auth-strong-email">Email:</strong>
        {currentUser.email}
      </div>

      <div className="dasboard-border">{''}</div>
      <div className="auth-actions" id="auth-actions-logout">
        <Button
          handleClick={handleLogout}
          className="auth-btn"
          label="Log out"
        ></Button>
      </div>

      <div className="auth-actions" id="update-link">
        <Link to="/update-profile" className="auth-link" onClick={getUsers}>
          Update Profile
        </Link>
      </div>
    </Panel>
  )
}

// --------------------- Redux --------------------------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  getUser: getUser,
  clearDisplay: clearDisplay,
  logout: logout,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
