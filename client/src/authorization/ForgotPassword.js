import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link } from 'react-router-dom'
import Button from '../elements/Button'
import Panel from '../elements/Panel'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your Inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <Panel id="auth" title="Reset your password">
            <div className="text-center mb-4">
                {error && <Alert className="auth-alert" variant="danger">{error}</Alert>}
                {message && <Alert className="auth-alert" variant="success">{message}</Alert>}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email" as={Row}>
                    <Form.Label id="auth-email-reset">Email:</Form.Label>
                    <Col>
                        <Form.Control id="auth-input" type="email" ref={emailRef} required paceholder="Enter email"/>
                    </Col>
                </Form.Group>
                <div className="auth-actions">
                    <Button disabled={loading} label="Reset Password" className="auth-btn" id="auth-btn-reset" type="submit"></Button>
                </div>
                <div className="auth-actions">
                    <Link className="auth-link" to="/login">Log in</Link>
                </div>
                <div className="auth-actions" id="signup-link">
                    <Link className="auth-link" to="/signup">Sign up</Link>
                </div>
            </Form>
        </Panel>
    )
}
