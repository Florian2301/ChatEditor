import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './EditChats.css'
import { connect } from 'react-redux'
import { saveDraft, getDrafts } from '../../redux/actions/draft'
import {
  saveTitle,
  updateTitle,
  getUserTitles,
} from '../../redux/actions/title'
import {
  getOneChat,
  updateChatDetails,
  getUserChats,
} from '../../redux/actions/chat'
import { clearDisplay } from '../../redux/actions/user'

export function EditChats(props) {
  const numberRef = useRef()
  const titleRef = useRef()
  const authorRef = useRef()
  const dateRef = useRef()
  const tagsRef = useRef()
  const descriptionRef = useRef()
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(false)
  const [save, setSave] = useState(false)
  const [chatLanguage, setChatLanguage] = useState(props.chat.language)
  const [toggleAdmin, setToggleAdmin] = useState(true)

  // for select language
  function handleChange(event) {
    setChatLanguage(event.target.value)
  }

  // if user = admin then he can save chat as "admin" or "user"
  function toggleAdminChat() {
    setToggleAdmin(!toggleAdmin)
  }

  // function for form
  function handleSubmit(e) {
    e.preventDefault()

    if (!props.chat.chatEditmode) {
      setEdit(false)
      setSave(false)
      return
    }

    if (save) {
      let admin = props.chat.admin
      if (props.user.admin) {
        admin = toggleAdmin
      }

      let language = props.chat.language
      if (chatLanguage !== language) {
        language = chatLanguage
      }
      const userId = props.chat.userId
      const titleId = props.title.titleId
      const chatId = props.chat.chatId
      const chatnumber = parseInt(numberRef.current.value)
      const title = titleRef.current.value
      const author = authorRef.current.value
      const date = dateRef.current.value
      const tagsValue = tagsRef.current.value
      const tags = tagsValue.split(',')
      const description = descriptionRef.current.value

      console.log('edit', title, chatLanguage, language)
      if (!chatnumber) {
        return setError('Please insert a chatnumber')
      }
      if (!title) {
        return setError('Please insert a title')
      }
      if (!date) {
        return setError('Please insert a date')
      }
      if (!tagsValue) {
        return setError('Please insert some tags')
      }
      if (!description) {
        return setError('Please insert a description')
      }
      if (!author) {
        return setError('Please name an author')
      }

      props.updateTitle(
        titleId,
        chatnumber,
        title,
        author,
        date,
        chatLanguage,
        tags,
        description,
        admin
      )
      props.updateChatDetails(
        chatId,
        chatnumber,
        title,
        author,
        date,
        chatLanguage,
        tags,
        description,
        admin
      )
      setTimeout(() => {
        props.getOneChat(chatId)
        props.getUserTitles(userId)
      }, 500)
      setError('')
      e.target.reset()
    }

    if (save) {
      setEdit(false)
      setSave(false)
    }
  }

  // clear data
  function clear() {
    props.clearDisplay()
    setError('')
    setEdit(false)
    setSave(false)
  }

  // save chat as draft
  function saveAsDraft() {
    if (!props.chat.chatEditmode) {
      setEdit(false)
      setSave(false)
      return
    }
    const admin = props.chat.admin
    const userId = props.chat.userId
    const user = props.chat.username
    const title = props.chat.title
    const author = props.chat.author
    const draftLanguage = props.chat.language
    const date = props.chat.date
    const tags = props.chat.tags
    const description = props.chat.description
    const philosopher = props.chat.philosopher
    const messages = props.chat.messages
    props.saveDraft(
      userId,
      user,
      title,
      author,
      date,
      draftLanguage,
      tags,
      description,
      philosopher,
      messages,
      admin
    )
    clear()
    setTimeout(() => {
      props.getDrafts(userId, admin)
    }, 500)
  }

  // ------------------------------------- RETURN --------------------------------------------------------

  return (
    <Panel id="panel-edit-chat" title="Edit your chat">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form className="form-edit-chat" onSubmit={handleSubmit}>
        {edit ? (
          <div>
            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-number">Chatnumber:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-number"
                  type="text"
                  ref={numberRef}
                  autoFocus
                  placeholder="0-99"
                  defaultValue={props.chat.chatnumber}
                />
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-title">Title:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-title"
                  type="text"
                  ref={titleRef}
                  placeholder="Insert a title"
                  defaultValue={props.chat.title}
                />
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-name">Philosopher:</Form.Label>

              <Col>
                <ul>
                  {props.chat.philosopher.map((phil) => {
                    return (
                      <li className="edit-chat-name-list" key={uuidv4()}>
                        <Form.Label>{phil.name}</Form.Label>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat-last" as={Row}>
              <Form.Label className="edit-chat-messages">Messages:</Form.Label>
              <Col>
                <Form.Label id="chat-messages">
                  {props.chat.messages.length !== 0
                    ? props.chat.messages.length
                    : null}
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-description">
                Description:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-description"
                  type="text"
                  as="textarea"
                  ref={descriptionRef}
                  placeholder="Give a brief summary or description of your chat"
                  defaultValue={props.chat.description}
                />
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-tags">Tags: </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-tags"
                  type="text"
                  ref={tagsRef}
                  placeholder="E.g. philosophy, theory of mind etc."
                  defaultValue={props.chat.tags}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label className="edit-chat-author">Author:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-author"
                  type="text"
                  ref={authorRef}
                  defaultValue={props.chat.author}
                />
              </Col>
            </Form.Group>

            {props.user.admin ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-chat-admin">
                  {toggleAdmin ? 'Admin' : 'User'}:
                </Form.Label>
                <Col>
                  <div
                    className={
                      toggleAdmin
                        ? 'edit-chat-toggle-admin'
                        : 'edit-chat-toggle-user'
                    }
                  >
                    <Form.Check
                      type="switch"
                      id="edit-chat-toggle"
                      onChange={() => toggleAdminChat()}
                      checked={toggleAdmin ? true : false}
                    />
                  </div>
                </Col>
              </Form.Group>
            ) : null}

            <Form.Group as={Row}>
              <Form.Label className="edit-chat-language">Language:</Form.Label>
              <Col>
                <select
                  className="edit-chat-language-select"
                  type="text"
                  value={chatLanguage}
                  onChange={handleChange}
                >
                  {props.user.selectLanguage.map((lang) => {
                    return (
                      <option value={lang} key={uuidv4()}>
                        {lang}
                      </option>
                    )
                  })}
                </select>
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat" as={Row}>
              <Form.Label className="edit-chat-date">Published:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-date"
                  type="text"
                  ref={dateRef}
                  placeholder="yyyy-mm-dd"
                  defaultValue={props.chat.date}
                />
              </Col>
            </Form.Group>
          </div>
        ) : (
          <div>
            <div className="chat-details">
              <p>Chatnumber:</p>
              <p className="chat-info" id="chat-number">
                {props.chat.chatnumber}
              </p>
            </div>

            <div className="chat-details">
              <p>Title:</p>
              <p className="chat-info">{props.chat.title}</p>
            </div>

            <div className="chat-details">
              <p>Philosopher:</p>
              <div className="chat-info">
                {props.chat.philosopher.map((phil) => {
                  return <p key={uuidv4()}>{phil.name}</p>
                })}
              </div>
            </div>

            <div className="chat-details">
              <p>Messages:</p>
              <p className="chat-info" id="chat-messages">
                {props.chat.messages.length !== 0
                  ? props.chat.messages.length
                  : null}
              </p>
            </div>

            <div className="chat-details">
              <p>Description:</p>
              <p className="chat-info">{props.chat.description}</p>
            </div>

            <div className="chat-details">
              <p>Tags:</p>
              <p className="chat-info">{props.chat.tags}</p>
            </div>

            <div className="chat-details">
              <p>Author:</p>
              <p className="chat-info">{props.chat.author}</p>
            </div>

            {props.user.admin ? (
              <div className="chat-details">
                <p>Admin:</p>
                <p className="chat-info">
                  {props.chat.chatEditmode
                    ? props.chat.admin
                      ? 'Admin'
                      : 'User'
                    : null}
                </p>
              </div>
            ) : null}

            <div className="chat-details">
              <p>Language:</p>
              <p className="chat-info">{props.chat.language}</p>
            </div>

            <div className="chat-details">
              <p>Published:</p>
              <p className="chat-info" id="chat-date">
                {props.chat.date}
              </p>
            </div>
          </div>
        )}
        <div className="edit-chat-border">{''}</div>
        {props.user.username === props.chat.user ? (
          <div className="edit-chat-actions">
            {!edit ? (
              <Button
                label="Edit details"
                className="edit-chat-btn"
                handleClick={() => setEdit(true)}
              ></Button>
            ) : (
              <Button
                label="Save changes"
                className="edit-chat-btn"
                type="submit"
                handleClick={() => setSave(true)}
              ></Button>
            )}
            {!edit ? (
              <Button
                label="Save as draft"
                className="edit-chat-btn"
                handleClick={() => saveAsDraft()}
              ></Button>
            ) : null}
            {!edit ? (
              <Button
                label="Clear"
                className="edit-chat-btn-clear"
                handleClick={() => clear()}
              ></Button>
            ) : (
              <Button
                label="Back"
                className="edit-chat-btn-clear"
                handleClick={() => setEdit(false)}
              ></Button>
            )}
          </div>
        ) : (
          <div className="edit-chat-actions">
            <Button
              label="Clear"
              className="edit-chat-btn-clear"
              handleClick={() => clear()}
            ></Button>
          </div>
        )}
      </Form>
    </Panel>
  )
}

// ------------------------------- REDUX -------------------------------------------------------------

const mapStateToProps = (state) => ({
  title: state.title,
  chat: state.chat,
  user: state.user,
  draft: state.draft,
})

const mapActionsToProps = {
  clearDisplay: clearDisplay,
  getUserTitles: getUserTitles,
  saveTitle: saveTitle,
  updateTitle: updateTitle,
  updateChatDetails: updateChatDetails,
  getUserChats: getUserChats,
  getOneChat: getOneChat,
  getDrafts: getDrafts,
  saveDraft: saveDraft,
}

export default connect(mapStateToProps, mapActionsToProps)(EditChats)
