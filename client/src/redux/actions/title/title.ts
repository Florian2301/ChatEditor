import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType, Action } from '../../actionTypes/title/actionTypesTitle.js'

export function publishTitle(publish: boolean | number) {
  return { type: ActionType.PUBLISH, 
            payload: publish }
}

// publish title with chatnumber, title and date
export const saveTitle =
  (
    chatId: String,
    userId: String,
    user: String,
    chatnumber: Number,
    title: String,
    author: String,
    date: String,
    language: String,
    tags: String[],
    description: String,
    admin: Boolean
  ) =>
  (dispatch: Dispatch<Action>) => {
    axios
      .post('/api/title', {
        chatId,
        userId,
        user,
        chatnumber,
        title,
        author,
        date,
        language,
        tags,
        description,
        admin,
      })
      .then((res) =>
        dispatch({
          type: ActionType.GET_TITLE,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all titles
export const getAllTitles = () => (dispatch: Dispatch<Action>) => {
  axios
    .get('/api/title')
    .then((res) =>
      dispatch({
        type: ActionType.GET_ALL_TITLES,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one title by id
export const getOneTitle = (id: string) => (dispatch: Dispatch<Action>) => {
  axios
    .get(`/api/title/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.GET_TITLE,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get all titles from logged in user
export const getUserTitles = (userId: string) => (dispatch: Dispatch<Action>) => {
  axios
    .get('/api/title')
    .then((res) =>
      dispatch({
        type: ActionType.GET_USER_TITLES,
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one title by id
export const deleteTitle = (id: string) => (dispatch: Dispatch<Action>) => {
  axios
    .delete(`/api/title/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.DELETE_TITLE,
        payload: id,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// update date of one title by id
export const updateTitle = (
    id: string, 
    chatnumber: number, 
    title: string, 
    author: string, 
    date: string, 
    language: string, 
    tags: string[], 
    description: string, 
    admin: boolean
    ) =>
  (dispatch: Dispatch<Action>) => {
    axios
      .patch(`/api/title/${id}`, {
        admin,
        chatnumber,
        title,
        author,
        date,
        language,
        tags,
        description,
      })
      .then((res) => dispatch({ 
        type: ActionType.GET_TITLE, 
        payload: res.data }))
      .catch(function (error) {
        console.log(error.message)
      })
  }
