import 'firebase/compat/auth'

import { Alert, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getUser, welcome } from '../redux/actions/user/user'

import Button from '../elements/Button/Button'
import Panel from '../elements/Panel/Panel'
import { StateUser } from '../redux/interfaces/interfaces'
import firebase from 'firebase/compat/app'
import { useAuth } from './AuthContext'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks/useTypeSelector.js'

export function Login() {
  // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  // ref
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // firebase
  const { login } = useAuth()

  // useState
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // router-dom
  const history = useNavigate()

  // variables
  const verify: string = 'Please check your inbox to verify your email address'
  const goodbye: string = 'Your profile has been deleted successfully'
  const Email: string = require('./Testuser').TestuserEmail
  const PW: string = require('./Testuser').TestuserPW

  // submit data to login through firebase + get userdata from database
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current? emailRef.current.value : null, passwordRef.current? passwordRef.current.value: null) // log in firebase
    } catch {
      setError('Failed to log in')
    }
    setLoading(false)
    dispatch(welcome()) // for welcome-message
    let userFirebase = firebase.auth().currentUser // get currentUser from firebase
    if (userFirebase) {
      userFirebase.emailVerified ? history('/dashboard') : history('/') // check if mailaddress is verified
      dispatch(getUser(userFirebase.displayName !== null? userFirebase.displayName : '')) // get currentUser from database
    } else {
      history('/')
    }
  }

  // submit data to login through firebase + get userdata from database
  async function handleSubmitTestuser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(Email, PW) // log in firebase as testuser
    } catch {
      setError('Failed to log in')
    }
    setLoading(false)
    dispatch(welcome()) // for welcome-message
    let userFirebase = firebase.auth().currentUser // get currentUser from firebase
    if (userFirebase) {
      userFirebase.emailVerified ? history('/dashboard') : history('/') // check if mailaddress is verified
      dispatch(getUser(userFirebase.displayName !== null? userFirebase.displayName : '')) // get currentUser from database
    } else {
      history('/')
    }
  }

  // get all users when "sign up" is clicked
  // to check during sign up process if username/email already exists
  function getUsers() {
    dispatch(getUser())
  }

  // ------------------------------------------ RETURN ---------------------------------------------------------------------

  return (
    <Panel id="auth" title="Log in to your account">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {user.signUp ? (
          <Alert className="auth-alert" variant="success">
            {verify}
          </Alert>
        ) : null}
        {user.delete ? (
          <Alert className="auth-alert" variant="success">
            {goodbye}
          </Alert>
        ) : null}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group id="email-login" as={Row}>
          <Form.Label id="auth-email" column sm="3">
            Email:{' '}
          </Form.Label>

          <Col>
            <Form.Control
              id="auth-input"
              type="email"
              ref={emailRef}
              required
              placeholder="Enter email"
              defaultValue=""
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="password"
              ref={passwordRef}
              required
              placeholder="Enter password"
              defaultValue=""
            />
          </Col>
        </Form.Group>

        <div className="auth-actions">
          <Button
            disabled={loading}
            label="Log in"
            className="auth-btn"
            type="submit"
          ></Button>
        </div>

        <div className="auth-actions">
          <Link className="auth-link" to="/signup" onClick={getUsers}>
            Sign Up
          </Link>
        </div>

        <div className="auth-actions" id="forgotpassword-link">
          <Link className="auth-link" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </Form>
      <div className="testuser-border">{''}</div>

      <Form onSubmit={handleSubmitTestuser}>
        <p className="testuser-info">
          You can also log in as a testuser and try out to write a chat!
        </p>
        <p className="testuser-info">Just click on the button below:</p>

        <div className="auth-actions">
          <Button
            disabled={loading}
            label="Testuser"
            className="auth-btn"
            type="submit"
          ></Button>
        </div>
      </Form>
      <br />
    </Panel>
  )
}

export default Login
