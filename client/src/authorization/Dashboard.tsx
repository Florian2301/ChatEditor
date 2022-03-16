import 'firebase/compat/auth'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {
  clearDisplay,
  getUser,
  logOut,
  setKeyL,
  setKeyR,
} from '../redux/actions/user/user'

import { Alert } from 'react-bootstrap'
import Button from '../elements/Button/Button'
import Language from '../modules/settings/Language/Language'
import Panel from '../elements/Panel/Panel'
import SelectView from '../modules/settings/SelectView/SelectView'
import { StateUser } from '../redux/interfaces/interfaces'
import firebase from 'firebase/compat/app'
import { useAuth } from './AuthContext'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks/useTypeSelector.js'

export function Dashboard(props: any) {
  // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  // useState
  const [error, setError] = useState<string>('')
  const [welcome, setWelcome] = useState<boolean>(true)
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)
  const [userLoggedOut, setUserLoggedOut] = useState<boolean>(false)

  // firebase
  const { currentUser, logout } = useAuth()
  const history = useNavigate()
  
  // variables
  const update: string = 'Your profile has been updated successfully!'
  let welcomeMessage: string = ''

  // get all Users for further actions (when update Profile is clicked)
  function getUsers() {
    dispatch(getUser())
  }

  // go to startpage
  function clear() {
    dispatch(clearDisplay())
    dispatch(setKeyL('userchats'))
    dispatch(setKeyR('about'))
  }

  // log out via firebase
  async function handleLogout() {
    dispatch(clearDisplay())
    dispatch(logOut()) // reset state.user
    setUserLoggedOut(true)
    setError('')
    try {
      await logout()
      history('/')
      dispatch(setKeyL('userchats'))
      dispatch(setKeyR('about'))
    } catch {
      setError('Log out failed')
    }
  }

  // get currentUser for welcome message
  let userFirebase = firebase.auth().currentUser
  if (userFirebase) {
    welcomeMessage = 'Welcome ' + userFirebase.displayName + '!'
  }

  // if page reloads, user still logged in
  firebase.auth().onAuthStateChanged((userFirebase) => {
    if (userFirebase && !user.loggedIn && !userLoggedOut) {
      dispatch(getUser(userFirebase.displayName !== null? userFirebase.displayName : ''))
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
        {welcome && user.welcome ? (
          <p className="auth-alert">{welcomeMessage}</p>
        ) : null}
        {updateProfile && user.update ? (
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

export default Dashboard
