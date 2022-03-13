import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType, Action } from '../../actionTypes/user/actionTypesUser.js'

// clears chat window
export function clearDisplay() {
  return { type: ActionType.CLEAR_DISPLAY }
}

// changes state for welcome message
export function welcome() {
  return { type: ActionType.WELCOME }
}

// changes state for update message
export function cancel() {
  return { type: ActionType.CANCEL }
}

// sets back user.state at logout
export function logout() {
  return { type: ActionType.LOGOUT }
}

// changes eventkey for mobile and tablet navigation
export function setKeyL(key: string) {
  return { type: ActionType.SET_KEY_L, payload: key }
}

// changes eventkey for tablet navigation (right side)
export function setKeyR(key: string) {
  return { type: ActionType.SET_KEY_R, payload: key }
}

// changes mediaquery: desktop, tablet, mobile
export function changeModus(modus: string) {
  return { type: ActionType.CHANGE_MODUS, payload: modus }
}

// select language
export function selectLanguage(language: string) {
  return { type: ActionType.SELECT_LANGUAGE, payload: language }
}

// write comment
export function writeComment(comment: boolean) {
  return { type: ActionType.WRITE_COMMENT, payload: comment }
}

// add user to database
export const addUserToDB = (userName: string, userEmail: string) => (dispatch: Dispatch<Action>) => {
  axios
    .post('/api/users', { userName, userEmail })
    .then((res) =>
      dispatch({
        type: ActionType.ADD_USER,
        username: userName,
        email: userEmail
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get 1 user by username or all users
export const getUser = (username: string) => (dispatch: Dispatch<Action>) => {
  if (username) {
    axios
      .get('/api/users/', { params: { username: username } })
      .then((res) =>
        dispatch({
          type: ActionType.GET_USER,
          payload: res.data[0],
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  } else {
    axios
      .get('/api/users/')
      .then((res) =>
        dispatch({
          type: ActionType.GET_ALL_USERS,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }
}

// update Profile
export const updateUserDB = (id: string, username: string, email: string, chats: string) => (dispatch: Dispatch<Action>) => {
  axios
    .patch(`/api/users/${id}`, { username, email, chats })
    .then((res) => dispatch({ type: ActionType.UPDATE_USER }))
    .catch(function (error) {
      console.log(error.message)
    })
}

// delete one user
export const deleteUserDB = (id: string) => (dispatch: Dispatch<Action>) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.DELETE_USER,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}
