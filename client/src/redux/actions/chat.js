import axios from 'axios'

// save as chat
export const saveChat =
  (
    userId,
    user,
    chatnumber,
    title,
    author,
    date,
    language,
    tags,
    description,
    philosopher,
    messages,
    admin
  ) =>
  (dispatch) => {
    axios
      .post('/api/chats', {
        userId,
        user,
        admin,
        chatnumber,
        title,
        author,
        date,
        language,
        tags,
        description,
        philosopher,
        messages,
      })
      .then((res) =>
        dispatch({
          type: 'GET_CHAT',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all chats
export const getUserChats = (userId) => (dispatch) => {
  axios
    .get('/api/chats/', { params: { userId: userId } })
    .then((res) =>
      dispatch({
        type: 'GET_USER_CHATS',
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one chat by chatId
export const getOneChat = (id) => (dispatch) => {
  axios
    .get(`/api/chats/${id}`)
    .then((res) =>
      dispatch({
        type: 'GET_CHAT',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// update chat details
export const updateChatDetails =
  (
    id,
    chatnumber,
    title,
    author,
    date,
    language,
    tags,
    description,
    admin,
    comments
  ) =>
  (dispatch) => {
    axios
      .patch(`/api/chats/${id}`, {
        admin,
        chatnumber,
        title,
        author,
        date,
        language,
        tags,
        description,
        comments,
      })
      .then((res) =>
        dispatch({
          type: 'GET_CHAT',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error.message)
      })
  }

// update one message
export const updateChat = (id, messagenumber, text) => (dispatch) => {
  axios
    .put(`/api/chats/${id}`, { messagenumber, text })
    .then((res) =>
      dispatch({
        type: 'GET_CHAT',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error.message)
    })
}

// delete one chat by id
export const deleteChat = (id) => (dispatch) => {
  axios
    .delete(`/api/chats/${id}`)
    .then((res) =>
      dispatch({
        type: 'DELETE_CHAT',
        id,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}
