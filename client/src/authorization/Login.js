import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { connect } from 'react-redux'
import { getUser, welcome } from '../redux/actions/user'

export function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const verify = 'Please check your inbox to verify your email address'
  const goodbye = 'Your profile has been deleted successfully'
  const Email = process.env.TestuserEmail || require('./Testuser').TestuserEmail
  const PW = process.env.TestuserPW || require('./Testuser').TestuserPW

  // submit data to login through firebase + get userdata from database
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value) // log in firebase
    } catch {
      setError('Failed to log in')
    }
    setLoading(false)
    props.welcome() // for welcome-message
    var user = firebase.auth().currentUser // get currentUser from firebase
    if (user) {
      user.emailVerified ? history('/') : history('/login') // check if mailaddress is verified
      props.getUser(user.displayName) // get currentUser from database
    } else {
      history('/login')
    }
  }

  // submit data to login through firebase + get userdata from database
  async function handleSubmitTestuser(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(Email, PW) // log in firebase as testuser
    } catch {
      setError('Failed to log in')
    }
    setLoading(false)
    props.welcome() // for welcome-message
    var user = firebase.auth().currentUser // get currentUser from firebase
    if (user) {
      user.emailVerified ? history('/') : history('/login') // check if mailaddress is verified
      props.getUser(user.displayName) // get currentUser from database
    } else {
      history('/login')
    }
  }

  // get all users when "sign up" is clicked
  // to check during sign up process if username/email already exists
  function getUsers() {
    props.getUser()
  }

  // ------------------------------------------ RETURN ---------------------------------------------------------------------

  return (
    <Panel id="auth" title="Log in to your account">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {props.user.signUp ? (
          <Alert className="auth-alert" variant="success">
            {verify}
          </Alert>
        ) : null}
        {props.user.delete ? (
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

// ----------------------- REDUX ---------------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  getUser: getUser,
  welcome: welcome,
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
