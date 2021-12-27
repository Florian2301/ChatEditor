import axios from 'axios'

// clears chat window
export function clearDisplay() {
  return { type: 'CLEAR_DISPLAY' }
}

// changes state for welcome message
export function welcome() {
  return { type: 'WELCOME' }
}

// changes state for update message
export function cancel() {
  return { type: 'CANCEL' }
}

// sets back user.state at logout
export function logout() {
  return { type: 'LOGOUT' }
}

// changes eventkey for mobile and tablet navigation
export function setKeyL(key) {
  return { type: 'SET_KEY_L', key }
}

// changes eventkey for tablet navigation (right side)
export function setKeyR(key) {
  return { type: 'SET_KEY_R', key }
}

// changes mediaquery: desktop, tablet, mobile
export function changeModus(modus) {
  return { type: 'CHANGE_MODUS', modus }
}

// select language
export function selectLanguage(language) {
  return { type: 'SELECT_LANGUAGE', language }
}

// write comment
export function writeComment(comment) {
  return { type: 'WRITE_COMMENT', comment }
}

// add user to database
export const addUserToDB = (userName, userEmail) => (dispatch) => {
  axios
    .post('/api/users', { userName, userEmail })
    .then((res) =>
      dispatch({
        type: 'ADD_USER',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get 1 user by username or all users
export const getUser = (username) => (dispatch) => {
  if (username) {
    axios
      .get('/api/users/', { params: { username: username } })
      .then((res) =>
        dispatch({
          type: 'GET_USER',
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
          type: 'GET_ALL_USERS',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }
}

// update Profile
export const updateUserDB = (id, username, email, chats) => (dispatch) => {
  axios
    .patch(`/api/users/${id}`, { username, email, chats })
    .then((res) => dispatch({ type: 'UPDATE_USER' }))
    .catch(function (error) {
      console.log(error.message)
    })
}

// delete one user
export const deleteUserDB = (id) => (dispatch) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) =>
      dispatch({
        type: 'DELETE_USER',
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}
