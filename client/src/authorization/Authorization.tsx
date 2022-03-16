import './Authorization.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AuthProvider } from './AuthContext'
import { Container } from 'react-bootstrap'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import React from 'react'
import SignUp from './SignUp'
import UpdateProfile from './UpdateProfile'

export default function Authorization(props: {auto: any, desktop: any, tablet: any, mobile: any, id: string}) {
  return (
    <Container className="d-flex">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
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
              
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}
