import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import { connect } from 'react-redux'
import {
  deleteUserDB,
  updateUserDB,
  cancel,
  getUser,
} from '../redux/actions/user'

export function UpdateProfile(props) {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {
    currentUser,
    updateEmail,
    updatePassword,
    deleteUser,
    updateUsername,
  } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const Testuser = process.env.TestuserEmail //|| require('./Testuser').TestuserEmail

  // submit data to update profile in firebase + database
  function handleSubmit(e) {
    e.preventDefault()
    if (currentUser.email === Testuser) {
      setError('Its not allowed to update this profile')
      setTimeout(() => {
        history('/')
      }, 2000)
      return
    }

    let inputUsername = usernameRef.current.value
    props.user.allUsers.map(({ username }) => {
      // get username from all users in database
      if (username === inputUsername) {
        // check if username already exists
        inputUsername = false
      }
      return inputUsername
    })
    if (!inputUsername && inputUsername !== '') {
      return setError(inputUsername + ' does already exist')
    }
    let inputEmail = emailRef.current.value
    props.user.allUsers.map(({ email }) => {
      // get useremail from all users in database
      if (email === inputEmail) {
        // check if useremail already exists
        inputEmail = false
        return inputEmail
      }
      return inputEmail
    })
    if (!inputEmail && inputEmail !== '') {
      return setError(inputEmail + ' does already exist')
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // check if passwords match
      return setError('Passwords do not match')
    }
    if (!error) {
      // check if error is set by check username/email
      const { userId } = props.user // get current user-id from database
      const promises = []
      setLoading(true)
      setError('')
      setTimeout(() => {
        setLoading(false)
      }, 500)
      if (inputUsername && inputUsername !== currentUser.displayName) {
        props.updateUserDB(userId, inputUsername, currentUser.email) // currentUser.email from Firebase
        promises.push(updateUsername(inputUsername))
      }
      if (inputEmail && inputEmail !== currentUser.email) {
        props.updateUserDB(userId, currentUser.displayName, inputEmail) // currentUser.displayName from Firebase
        promises.push(updateEmail(inputEmail))
      }
      if (
        passwordRef.current.value &&
        passwordRef.current.value !== currentUser.password // currentUser.password from Firebase
      ) {
        promises.push(updatePassword(passwordRef.current.value))
      }
      Promise.all(promises)
        .then(() => {
          history('/')
        })
        .catch(() => {
          setError('Failed to update account')
        })
    } else {
      return
    }
  }

  function deleteProfile() {
    if (currentUser.email === Testuser) {
      setError('Its not allowed to delete this profile')
      setTimeout(() => {
        history('/')
      }, 2000)
      return
    }
    let answer = window.confirm(
      'Are you sure you want to delete your profile and all your drafts and published chats?'
    )
    const currentUserId = props.user.userId // get current user-id from database
    if (answer) {
      deleteUser(currentUser) // delete user from firebase
      props.deleteUserDB(currentUserId) // delete user from database
      history('/login')
    } else {
      return
    }
  }

  function cancel() {
    props.cancel() // makes sure, alerts are turned off
  }

  // --------------------------- RETURN ----------------------------------------------------------------------

  return (
    <Panel id="auth" title="Update your profile">
      <div className="text-center mb-4">
        {error && (
          <Alert className="auth-alert" variant="danger">
            {error}
          </Alert>
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="text"
              ref={usernameRef}
              autoFocus
              placeholder="New username"
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
              placeholder="New email address"
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
              placeholder="New password"
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
              placeholder="Confirm new password"
            />
          </Col>
        </Form.Group>

        <div className="auth-actions">
          <Button
            disabled={loading}
            label="Update profile"
            className="auth-btn"
            type="submit"
          ></Button>
        </div>

        <div className="auth-actions">
          <Link
            className="auth-link"
            id="auth-link-delete"
            to="/login"
            onClick={deleteProfile}
            disabled={loading}
          >
            Delete profile
          </Link>
        </div>

        <div className="auth-actions" id="cancel">
          <Link className="auth-link" id="auth-link" to="/" onClick={cancel}>
            Cancel
          </Link>
        </div>
      </Form>
    </Panel>
  )
}

// -------------------  Redux -----------------------------------------------------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  updateUserDB: updateUserDB,
  deleteUserDB: deleteUserDB,
  cancel: cancel,
  getUser: getUser,
}

export default connect(mapStateToProps, mapActionsToProps)(UpdateProfile)
