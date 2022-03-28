import { Alert, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import Button from '../../elements/Button/Button'
import Panel from '../../elements/Panel/Panel'
import { StateUser } from '../../redux/interfaces/interfaces'
import { addUserToDB } from '../../redux/actions/user/user'
import { useAuth } from '../authcontext/AuthContext'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/hooks/useTypeSelector'

export function SignUp() {
   // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  // ref
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  
  // firebase
  const { signup } = useAuth()

  // useState
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // router dom
  const history = useNavigate()

  // check if username or useremail already exist in database
  let checkName: string
  let checkMail: string

  function inputName(e: React.ChangeEvent<HTMLInputElement>) {
    checkName = e.currentTarget.value // get user input
    return checkName
  }

  function inputMail(e: React.ChangeEvent<HTMLInputElement>)  {
    checkMail = e.currentTarget.value // get user input
    return checkMail
  }

  // submit data to create profile in firebase + database
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let newName = usernameRef.current? usernameRef.current.value : null
    user.allUsers.map(( u: any ) => {
      // get username from all users in database
      if (u.username === checkName) {
        // check if username already exists
        newName = null
        return newName
      }
      return newName
    })
    if (!newName) {
      return setError(newName + ' does already exists')
    }

    let newEmail = emailRef.current? emailRef.current.value : null
    user.allUsers.map(( u: any ) => {
      // get useremail from all users in database
      if (u.email === checkMail) {
        // check if useremail already exists
        newEmail = null
        return newEmail
      }
      return newEmail
    })
    if (!newEmail) {
      return setError(newEmail + ' does already exists')
    }

    const password = passwordRef.current? passwordRef.current.value : null
    const passwordConfirm = passwordConfirmRef.current? passwordConfirmRef.current.value : null
    if (password !== passwordConfirm) {
      // check if passwords match
      return setError('Passwords do not match')
    }
    if (!error) {
      // check if error is set by check username/email/password
      try {
        setError('')
        setLoading(true)
        await signup(newName, newEmail, password) // create profile in firebase
        dispatch(addUserToDB(newName, newEmail)) // create profile in database
        history('/')
      } catch {
        setError('Failed to create an account')
      }
    } else {
      history('/')
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
          <Link className="auth-link" to="/">
            Log in
          </Link>
        </div>
      </Form>
    </Panel>
  )
}

export default SignUp
