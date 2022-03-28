import { Alert, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import {
  cancel,
  deleteUserDB,
  updateUserDB,
} from '../../redux/actions/user/user'

import Button from '../../elements/Button/Button'
import Panel from '../../elements/Panel/Panel'
import { StateUser } from '../../redux/interfaces/interfaces'
import { useAuth } from '../authcontext/AuthContext'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/hooks/useTypeSelector'

export function UpdateProfile() {
   // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  // ref
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  
  // firebase
  const {
    currentUser,
    updateEmail,
    updatePassword,
    deleteUser,
    updateUsername,
  } = useAuth()

  // useState
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  
  // router dom
  const history = useNavigate()

  // testuser
  const Testuser = process.env.TestuserEmail //|| require('./Testuser').TestuserEmail

  // submit data to update profile in firebase + database
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (currentUser.email === Testuser) {
      setError('Its not allowed to update this profile')
      setTimeout(() => {
        history('/dashboard')
      }, 2000)
      return
    }

    let inputUsername = usernameRef.current? usernameRef.current.value : null
    user.allUsers.map(( u: any ) => {
      // get username from all users in database
      if (u.username === inputUsername) {
        // check if username already exists
        inputUsername = null
      }
      return inputUsername
    })
    if (!inputUsername && inputUsername !== '') {
      return setError(inputUsername + ' does already exist')
    }
    let inputEmail = emailRef.current? emailRef.current.value : null
    
    user.allUsers.map(( u: any ) => {
      // get useremail from all users in database
      if (u.email === inputEmail) {
        // check if useremail already exists
        inputEmail = null
        return inputEmail
      }
      return inputEmail
    })
    if (!inputEmail && inputEmail !== '') {
      return setError(inputEmail + ' does already exist')
    }
    let inputPW = passwordRef.current? passwordRef.current.value : null
    let inputPWComfirm = passwordConfirmRef.current? passwordConfirmRef.current.value : null
    if (inputPW !== inputPWComfirm) {
      // check if passwords match
      return setError('Passwords do not match')
    }
    if (!error) {
      // check if error is set by check username/email
      const { userId } = user // get current user-id from database
      const promises = []
      setLoading(true)
      setError('')
      setTimeout(() => {
        setLoading(false)
      }, 500)
      if (inputUsername && inputUsername !== currentUser.displayName) {
        dispatch(updateUserDB(userId, inputUsername, currentUser.email)) // currentUser.email from Firebase
        promises.push(updateUsername(inputUsername))
      }
      if (inputEmail && inputEmail !== currentUser.email) {
        dispatch(updateUserDB(userId, currentUser.displayName, inputEmail)) // currentUser.displayName from Firebase
        promises.push(updateEmail(inputEmail))
      }
      if (
        inputPW &&
        inputPW !== currentUser.password // currentUser.password from Firebase
      ) {
        promises.push(updatePassword(inputPW))
      }
      Promise.all(promises)
        .then(() => {
          history('/dashboard')
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
        history('/dashboard')
      }, 2000)
      return
    }
    let answer = window.confirm(
      'Are you sure you want to delete your profile and all your drafts and published chats?'
    )
    const currentUserId = user.userId // get current user-id from database
    if (answer) {
      deleteUser(currentUser) // delete user from firebase
      dispatch(deleteUserDB(currentUserId)) // delete user from database
      history('/')
    } else {
      return
    }
  }

  function cancelAction() {
    dispatch(cancel()) // makes sure, alerts are turned off
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
            to="/"
            onClick={deleteProfile}
          >
            Delete profile
          </Link>
        </div>

        <div className="auth-actions" id="cancel">
          <Link className="auth-link" id="auth-link" to="/dashboard" onClick={cancelAction}>
            Cancel
          </Link>
        </div>
      </Form>
    </Panel>
  )
}

export default UpdateProfile
