import { Alert, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import Button from '../../elements/Button/Button'
import Panel from '../../elements/Panel/Panel'
import { useAuth } from '../authcontext/AuthContext'

export default function ForgotPassword() {
  // ref
  const emailRef = useRef<HTMLInputElement>(null)
  
  // useState
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // firebase
  const { resetPassword } = useAuth()

  // router-dom
  const history = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current? emailRef.current.value: null)
      setMessage('Check your Inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
    setTimeout(() => {
      history('/')
    }, 5000)
  }

  //------------------- RETURN --------------------------------------------------------------
  return (
    <Panel id="auth" title="Reset your password">
      <div className="text-center mb-4">
        {error && (
          <Alert className="auth-alert" variant="danger">
            {error}
          </Alert>
        )}
        {message && <p className="auth-alert">{message}</p>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email-forgot" as={Row}>
          <Form.Label column sm="2">
            Email:
          </Form.Label>
          <Col>
            <Form.Control
              id="auth-input"
              type="email"
              ref={emailRef}
              required
              placeholder="Enter email"
            />
          </Col>
        </Form.Group>
        <div className="auth-actions-forgot">
          <Button
            disabled={loading}
            label="Reset Password"
            className="auth-btn"
            id="auth-btn-reset"
            type="submit"
          ></Button>
        </div>
        <div className="auth-actions">
          <Link className="auth-link" to="/">
            Log in
          </Link>
        </div>
        <div className="auth-actions" id="signup-link">
          <Link className="auth-link" to="/signup">
            Sign up
          </Link>
        </div>
      </Form>
    </Panel>
  )
}
