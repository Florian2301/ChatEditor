import { Navigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../authcontext/AuthContext'

export default function PrivateRoute({ children } : { children: any }) {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to="/" />
}
