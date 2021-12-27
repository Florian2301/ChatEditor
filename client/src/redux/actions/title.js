import axios from 'axios'

export function publishTitle(publish) {
  return { type: 'PUBLISH', publish }
}

// publish title with chatnumber, title and date
export const saveTitle =
  (
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
    admin
  ) =>
  (dispatch) => {
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
          type: 'GET_TITLE',
          payload: res.data,
        })
      )
      .catch(function (error) {
        console.log(error)
      })
  }

// get all titles
export const getAllTitles = () => (dispatch) => {
  axios
    .get('/api/title')
    .then((res) =>
      dispatch({
        type: 'GET_ALL_TITLES',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get one title by id
export const getOneTitle = (id) => (dispatch) => {
  axios
    .get(`/api/title/${id}`)
    .then((res) =>
      dispatch({
        type: 'GET_TITLE',
        payload: res.data,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// get all titles from logged in user
export const getUserTitles = (userId) => (dispatch) => {
  axios
    .get('/api/title')
    .then((res) =>
      dispatch({
        type: 'GET_USER_TITLES',
        payload: res.data,
        userId,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// delete one title by id
export const deleteTitle = (id) => (dispatch) => {
  axios
    .delete(`/api/title/${id}`)
    .then((res) =>
      dispatch({
        type: 'DELETE_TITLE',
        id,
      })
    )
    .catch(function (error) {
      console.log(error)
    })
}

// update date of one title by id
export const updateTitle =
  (id, chatnumber, title, author, date, language, tags, description, admin) =>
  (dispatch) => {
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
      .then((res) => dispatch({ type: 'GET_TITLE', payload: res.data }))
      .catch(function (error) {
        console.log(error.message)
      })
  }
