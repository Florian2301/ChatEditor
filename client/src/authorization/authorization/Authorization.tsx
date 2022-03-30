import '../Authorization.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AuthProvider } from '../authcontext/AuthContext'
import { Container } from 'react-bootstrap'
import Dashboard from '../dashboard/Dashboard'
import ForgotPassword from '../forgotpassword/ForgotPassword'
import Login from '../login/Login'
import PrivateRoute from '../privateroute/PrivateRoute'
import React from 'react'
import SignUp from '../signup/SignUp'
import { StateUser } from '../../redux/interfaces/interfaces'
import UpdateProfile from '../updateprofile/UpdateProfile'
import { useTypedSelector } from '../../redux/hooks/useTypeSelector'

export default function Authorization(props: {auto: any, desktop: any, tablet: any, mobile: any, id: string}) {
  const user: StateUser = useTypedSelector((state) => state.user)

  return (
    <Container className="d-flex">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={user.loggedIn? <PrivateRoute>
                    <Dashboard
                      auto={props.auto}
                      desktop={props.desktop}
                      tablet={props.tablet}
                      mobile={props.mobile}
                      id={props.id}
                    />
                  </PrivateRoute> : <Login />} />
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
