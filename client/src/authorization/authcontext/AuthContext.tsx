import React, { useContext, useEffect, useState } from 'react'

import { auth } from '../firebase/firebase'

const AuthContext = React.createContext<any>(undefined)


export function useAuth() {
  return useContext(AuthContext)
}
//export function AuthProvider({ children } : { children: any}) {
export function AuthProvider({ children } : { children: any }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  function errorHandling(error: any) {
    console.log('error', error.message)
  }

  function signup(username: string, email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password).then((user: any) => {
      user = auth.currentUser
      user
        .updateProfile({
          displayName: username,
        })
        .then(console.log('user signed up'))
        .catch((error: any) => errorHandling(error))
      user.sendEmailVerification().then(() => auth.signOut())
    })
  }

  function login(email: string, password: string) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('user logged in'))
      .catch((error) => errorHandling(error))
  }

  function logout() {
    return auth
      .signOut()
      .then(() => console.log('user logged out'))
      .catch((error) => errorHandling(error))
  }

  function resetPassword(email: string) {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => errorHandling(error))
  }

  function updateUsername(username: string) {
    let user: any = auth.currentUser
    return user
      .updateProfile({
        displayName: username,
      })
      .then(console.log('username updated'))
      .catch((error: any) => errorHandling(error))
  }

  function updateEmail(email: string) {
    let user: any = auth.currentUser
    return user
      .updateEmail(email)
      .then(
        () => console.log('email updated'),
        user.sendEmailVerification().then(console.log('Verification sent'))
      )
      .catch((error: any) => errorHandling(error))
  }

  function updatePassword(password: string) {
    return currentUser
      .updatePassword(password)
      .then(() => console.log('password updated'))
      .catch((error: any) => errorHandling(error))
  }

  function deleteUser(currentUser: any) {
    return currentUser
      .delete()
      .then(() => console.log('user deleted'))
      .catch((error: any) => errorHandling(error))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value: any = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    deleteUser,
    updateUsername,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
