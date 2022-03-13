import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../elements/Button/Button'
import Panel from '../elements/Panel/Panel'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your Inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
    setTimeout(() => {
      history('/login')
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
              paceholder="Enter email"
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
          <Link className="auth-link" to="/login">
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
