import React from 'react'
import SignUp from './SignUp'
import { Container } from 'react-bootstrap'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import './Authorization.css'

export default function Authorization(props) {
  return (
    <Container className="d-flex">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard
                      auto={props.auto}
                      desktop={props.desktop}
                      tablet={props.tablet}
                      mobile={props.mobile}
                      id={props.id}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}
