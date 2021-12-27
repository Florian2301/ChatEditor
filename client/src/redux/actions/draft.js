import axios from 'axios'

export function addPhil(names) {
  return { type: 'ADD_PHIL', names }
}

export function selectColor(color) {
  return { type: 'SELECT_COLOR', color }
}

export function addColor(color) {
  return { type: 'ADD_COLOR', color }
}

export function writeMessage(write) {
  return { type: 'WRITE_MESSAGE', write }
}

// save draft
export const saveDraft =
  (
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
    admin
  ) =>
  (dispatch) => {
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
          type: 'GET_DRAFT',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all drafts by userid
export const getDrafts = (userId) => (dispatch) => {
  axios
    .get('/api/drafts/')
    .then((res) =>
      dispatch({
        type: 'GET_USER_DRAFTS',
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one draft
export const getOneDraft = (id) => (dispatch) => {
  axios
    .get(`/api/drafts/${id}`, { params: { id: id } })
    .then((res) =>
      dispatch({
        type: 'GET_DRAFT',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one draft by id
export const deleteDraft = (id) => (dispatch) => {
  axios
    .delete(`/api/drafts/${id}`)
    .then((res) =>
      dispatch({
        type: 'DELETE_DRAFT',
        id,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one message by id
export const deleteDraftMessage = (id, messages) => (dispatch) => {
  axios
    .put(`/api/drafts/${id}`, { messages: messages })
    .then((res) =>
      dispatch({
        type: 'GET_DRAFT',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// update one message
export const editDraft = (draftId, messagenumber, text) => (dispatch) => {
  axios
    .put(`/api/drafts/${draftId}`, {
      messagenumber: messagenumber,
      text: text,
    })
    .then((res) =>
      dispatch({
        type: 'GET_DRAFT',
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
    id,
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
      .patch(`/api/drafts/${id}`, {
        admin,
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
          type: 'GET_DRAFT',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error.message)
      })
  }
