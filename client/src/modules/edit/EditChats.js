import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row, Spinner } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './EditChats.css'
import { connect } from 'react-redux'
import { saveDraft, getDrafts } from '../../redux/actions/draft'
import {
  saveTitle,
  updateTitle,
  getUserTitles,
  deleteTitle,
} from '../../redux/actions/title'
import {
  getOneChat,
  updateChatDetails,
  getUserChats,
  deleteChat,
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
  const [spinner, setSpinner] = useState(false)
  const [edit, setEdit] = useState(false)
  const [save, setSave] = useState(false)
  const [chatLanguage, setChatLanguage] = useState(false)
  const [toggleAdmin, setToggleAdmin] = useState(true)
  const [download, setDownload] = useState(false)

  // for select language
  function handleChange(event) {
    setChatLanguage(event.target.value)
  }

  // if user = admin then he can save chat as "admin" or "user"
  function toggleAdminChat() {
    setToggleAdmin(!toggleAdmin)
  }

  // prepare download as pdf and get drafts with last changes (messages)
  function pdfdownload(id) {
    setDownload(id)
    props.getOneChat(id)
    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
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
      if (chatLanguage && chatLanguage !== language) {
        language = chatLanguage
      }
      const userId = props.chat.userId
      const titleId = props.title.titleId
      const chatId = props.chat.chatId
      const chatnumber = parseInt(numberRef.current.value)
      const title = titleRef.current.value
      const author = props.user.admin
        ? authorRef.current.value
        : props.user.username
      const date = dateRef.current.value
      const tagsValue = tagsRef.current.value
      const tags = tagsValue.split(',')
      const description = descriptionRef.current.value
      const comments = props.chat.comments

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
        language,
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
        language,
        tags,
        description,
        admin,
        comments
      )

      // clear data and get chat/title
      setTimeout(() => {
        props.getOneChat(chatId)
        props.getUserTitles(userId)
      }, 500)
      setError('')
      e.target.reset()
      setEdit(false)
      setSave(false)

      // spinner
      setSpinner(true)
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  // clear data
  function clear() {
    props.clearDisplay()
    setError('')
    setEdit(false)
    setSave(false)
    setDownload(false)
  }

  // delete one title + chat
  function deleteChat(chatId) {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      let titleId = ''
      props.deleteChat(chatId)
      props.title.allTitles.map((title) => {
        if (title.chatId === chatId) {
          titleId = title._id
        }
        return titleId
      })
      props.deleteTitle(titleId)
      setTimeout(() => {
        props.getUserChats(props.user.userId)
        props.getUserTitles(props.user.userId)
      }, 500)
    } else {
      return
    }
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
    const user = props.chat.user
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

    // clear data and get drafts
    clear()
    setTimeout(() => {
      props.getDrafts(userId, admin)
    }, 500)

    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }

  // ------------------------------------- RETURN --------------------------------------------------------

  return (
    <Panel id="panel-edit-chat" title="Edit your chat">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form className="form-edit-chat" onSubmit={handleSubmit}>
        {edit ? (
          <div className="edit-chat-scroll">
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
                  rows="5"
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

            {props.user.admin ? (
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
            ) : null}

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
          <div className="edit-chat-scroll">
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
              <p>Description:</p>
              <p className="chat-info" id="chat-info-description">
                {props.chat.description}
              </p>
            </div>

            <div className="chat-details">
              <p>Tags:</p>
              <p className="chat-info" id="chat-info-tags">
                {props.chat.tags}
              </p>
            </div>

            <div className="chat-details">
              <p>Philosopher:</p>
              <div className="chat-info">
                {props.chat.philosopher.map((phil) => {
                  return (
                    <p key={uuidv4()} id="chat-info-phil">
                      {phil.name}
                    </p>
                  )
                })}
              </div>
            </div>

            <div className="chat-details" id="chat-info-description-margin">
              <p>Author:</p>
              <p className="chat-info">{props.chat.author}</p>
            </div>

            {props.user.admin ? (
              <div className="chat-details">
                <p>Status:</p>
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
              <p>Messages:</p>
              <p className="chat-info" id="chat-messages">
                {props.chat.messages.length !== 0
                  ? props.chat.messages.length
                  : null}
              </p>
            </div>

            <div className="chat-details">
              <p>Published:</p>
              <p className="chat-info" id="chat-messages">
                {props.chat.messages.length !== 0 ? props.chat.date : null}
              </p>
            </div>

            <div className="chat-details" id="chat-details-download">
              <p>Download:</p>
              <div className="chat-info">
                {download ? (
                  <PDFDownloadLink
                    document={
                      <PDF
                        title={props.chat.title}
                        data={props.chat.messages}
                        author={props.chat.author}
                        date={props.chat.date}
                      />
                    }
                    fileName={props.chat.title + '.pdf'}
                    className="link-download-chat"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'loading...' : 'download'
                    }
                  </PDFDownloadLink>
                ) : (
                  <p
                    className={'link-download-chat'}
                    onClick={() => pdfdownload(props.chat.chatId)}
                  >
                    {props.chat.title ? props.chat.title + '.pdf' : null}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="edit-chat-border">{''}</div>
        <div className="edit-chat-spinner">
          {spinner ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : null}
        </div>
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
          {!edit ? (
            <Button
              label="Delete"
              className="edit-chat-btn-delete"
              handleClick={() => deleteChat(props.chat.chatId)}
            ></Button>
          ) : null}
        </div>
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
  deleteTitle: deleteTitle,
  deleteChat: deleteChat,
}

export default connect(mapStateToProps, mapActionsToProps)(EditChats)
