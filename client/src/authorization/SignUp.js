import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import { connect } from 'react-redux'
import { addUserToDB, getUser } from '../redux/actions/user'

export function SignUp(props) {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  // check if username or useremail already exist in database
  let checkName
  let checkMail

  function inputName(e) {
    checkName = e.target.value // get user input
    return checkName
  }

  function inputMail(e) {
    checkMail = e.target.value // get user input
    return checkMail
  }

  // submit data to create profile in firebase + database
  async function handleSubmit(e) {
    e.preventDefault()

    let newName = usernameRef.current.value
    props.user.allUsers.map(({ username }) => {
      // get username from all users in database
      if (username === checkName) {
        // check if username already exists
        newName = false
        return newName
      }
      return newName
    })
    if (!newName) {
      return setError(newName + ' does already exists')
    }

    let newEmail = emailRef.current.value
    props.user.allUsers.map(({ email }) => {
      // get useremail from all users in database
      if (email === checkMail) {
        // check if useremail already exists
        newEmail = false
        return newEmail
      }
      return newEmail
    })
    if (!newEmail) {
      return setError(newEmail + ' does already exists')
    }

    const password = passwordRef.current.value
    if (password !== passwordConfirmRef.current.value) {
      // check if passwords match
      return setError('Passwords do not match')
    }
    if (!error) {
      // check if error is set by check username/email/password
      try {
        setError('')
        setLoading(true)
        await signup(newName, newEmail, password) // create profile in firebase
        props.addUserToDB(newName, newEmail) // create profile in database
        history('/login')
      } catch {
        setError('Failed to create an account')
      }
    } else {
      history('/login')
    }
    setLoading(false)
  }

  // ---------------------------------- RETURN ------------------------------------------------------------------------------------

  return (
    <Panel id="auth" title="Sign up">
      <div className="text-center mb-4">
        {error && (
          <Alert className="auth-alert" variant="danger">
            {error}
          </Alert>
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group id="signup" as={Row}>
          <Form.Label column sm="3">
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="name"
              ref={usernameRef}
              required
              autoFocus
              onChange={inputName}
              placeholder="Username"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Email:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="email"
              ref={emailRef}
              required
              onChange={inputMail}
              placeholder="Email"
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
              placeholder="Password"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Confirm:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="password"
              ref={passwordConfirmRef}
              required
              placeholder="Confirm password"
            />
          </Col>
        </Form.Group>

        <div className="auth-actions-signup">
          <Button
            disabled={loading}
            label="Sign up"
            className="auth-btn"
            type="submit"
          ></Button>
        </div>

        <div className="auth-actions" id="login-link">
          <Link className="auth-link" to="/login">
            Log in
          </Link>
        </div>
      </Form>
    </Panel>
  )
}

// --------------------------------------- REDUX ---------------------------------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  addUserToDB: addUserToDB,
  getUser: getUser,
}

export default connect(mapStateToProps, mapActionsToProps)(SignUp)
