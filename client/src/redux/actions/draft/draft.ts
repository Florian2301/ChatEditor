import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType, Action } from '../../actionTypes/draft/actionTypesDraft.js'
import { Philosopher, Messages } from '../../interfaces/interfaces.js'

export function addPhil(names: Philosopher[]) {
  return { type: ActionType.ADD_PHIL, 
            payload: names }
}

export function selectColor(color: string) {
  return { type: ActionType.SELECT_COLOR, 
            payload: color }
}

export function addColor(color: string[]) {
  return { type: ActionType.ADD_COLOR, 
            payload: color }
}

export function writeMessage(write: boolean) {
  return { type: ActionType.WRITE_MESSAGE, 
            payload: write }
}

// save draft
export const saveDraft =
  (
    userId: String,
    user: String,
    title: String,
    author: String,
    date: String,
    language: String,
    tags: String[],
    description: String,
    philosopher: Philosopher[],
    messages: Messages[],
    admin: Boolean
  ) =>
  (dispatch: Dispatch<Action>) => {
    axios
      .post('/api/drafts/', {
        admin,
        userId,
        user,
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
          type: ActionType.GET_DRAFT,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all drafts by userid
export const getDrafts = (userId:string) => (dispatch: Dispatch<Action>) => {
  axios
    .get('/api/drafts/')
    .then((res) =>
      dispatch({
        type: ActionType.GET_USER_DRAFTS,
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one draft
export const getOneDraft = (id:string) => (dispatch:Dispatch<Action>) => {
  axios
    .get(`/api/drafts/${id}`, { params: { id: id } })
    .then((res) =>
      dispatch({
        type: ActionType.GET_DRAFT,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one draft by id
export const deleteDraft = (id:string) => (dispatch: Dispatch<Action>) => {
  axios
    .delete(`/api/drafts/${id}`)
    .then((res) =>
      dispatch({
        type: ActionType.DELETE_DRAFT,
        payload: id
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one message by id
export const deleteDraftMessage = (id:string, messages: Messages[]) => (dispatch: Dispatch<Action>) => {
  axios
    .put(`/api/drafts/${id}`, { messages: messages })
    .then((res) =>
      dispatch({
        type: ActionType.GET_DRAFT,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// update one message
export const editDraft = (draftId: string, messagenumber: number, text: string) => (dispatch: Dispatch<Action>) => {
  axios
    .put(`/api/drafts/${draftId}`, {
      messagenumber: messagenumber,
      text: text,
    })
    .then((res) =>
      dispatch({
        type: ActionType.GET_DRAFT,
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error.message)
    })
}

// update details of one draft
export const updateDraft =
  (
    id: String,
    title: String,
    author: String,
    published: Boolean,
    date: String,
    language: String,
    tags: String[],
    description: String,
    philosopher: Philosopher[],
    messages: Messages[],
    admin: Boolean
  ) =>
  (dispatch: Dispatch<Action>) => {
    axios
      .patch(`/api/drafts/${id}`, {
        admin,
        title,
        author,
        published,
        date,
        language,
        tags,
        description,
        philosopher,
        messages,
      })
      .then((res) =>
        dispatch({
          type: ActionType.GET_DRAFT,
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error.message)
      })
  }
