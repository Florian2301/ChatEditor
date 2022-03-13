import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType, Action } from '../../actionTypes/chat/actionTypesChat.js'
import { Philosopher, Messages, Comments } from '../../interfaces/interfaces.js'

// save as chat
export const saveChat =
  (
    userId: String,
    user: String,
    chatnumber: Number,
    title: String,
    author: String,
    date: String,
    language: String,
    tags: String[],
    description: String,
    philosopher: Philosopher[],
    messages: Messages[],
    admin: Boolean,
    comments: Comments[]
  ) =>
  (dispatch: Dispatch<Action>) => {
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
        comments,
      })
      .then((res) =>
        dispatch({
          type: ActionType.GET_CHAT,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all chats
export const getUserChats = (userId: string) => (dispatch: Dispatch<Action>) => {
  axios
    .get('/api/chats/', { params: { userId: userId } })
    .then((res) =>
      dispatch({
        type: ActionType.GET_USER_CHATS,
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one chat by chatId
export const getOneChat = (id: string) => (dispatch: Dispatch<Action>) => {
  axios
    .get(`/api/chats/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.GET_CHAT,
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
    id: String,
    chatnumber: Number,
    title: String,
    author: String,
    date: String,
    language: String,
    tags: String[],
    description: String,
    admin: Boolean,
    comments: Comments[]
  ) =>
  (dispatch: Dispatch<Action>) => {
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
          type: ActionType.GET_CHAT,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error.message)
      })
  }

// update one message
export const updateChat = (id: string, messagenumber: number, text: string) => (dispatch: Dispatch<Action>) => {
  axios
    .put(`/api/chats/${id}`, { messagenumber, text })
    .then((res) =>
      dispatch({
        type: ActionType.GET_CHAT,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error.message)
    })
}

// delete one chat by id
export const deleteChat = (id: string) => (dispatch: Dispatch<Action>) => {
  axios
    .delete(`/api/chats/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.DELETE_CHAT,
        payload: id,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}
