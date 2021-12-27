import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { getUser, welcome } from '../redux/actions/user'

export function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const verify = 'Please check your inbox to verify your email address'
  const goodbye = 'Your profile has been deleted successfully'

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
      user.emailVerified ? history.push('/') : history.push('/login') // check if mailaddress is verified
      props.getUser(user.displayName) // get currentUser from database
    } else {
      history.push('/login')
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
        <Form.Group id="email" as={Row}>
          <Form.Label id="auth-email">Email: </Form.Label>
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

        <Form.Group id="password" as={Row}>
          <Form.Label id="auth-password">Password:</Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="password"
              ref={passwordRef}
              required
              placeholder="Enter password"
              defaultValue="test123"
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
