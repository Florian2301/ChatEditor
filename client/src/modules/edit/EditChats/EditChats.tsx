import './EditChats.css'

import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import {StateChat, StateTitle, StateUser} from '../../../redux/interfaces/interfaces'
import {
  deleteChat,
  getOneChat,
  getUserChats,
  updateChatDetails,
} from '../../../redux/actions/chat/chat'
import {
  deleteTitle,
  getUserTitles,
  updateTitle,
} from '../../../redux/actions/title/title'
import { getDrafts, saveDraft } from '../../../redux/actions/draft/draft'

import Button from '../../../elements/Button/Button'
import PDF from '../../../elements/PDF/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Panel from '../../../elements/Panel/Panel'
import { clearDisplay } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const EditChats: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const title: StateTitle = useTypedSelector((state) => state.title)
  const user: StateUser = useTypedSelector((state) => state.user)

  // Refs
  const numberRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const tagsRef = useRef<HTMLTextAreaElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  
  // useState
  const [error, setError] = useState<string>('')
  const [spinner, setSpinner] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [save, setSave] = useState<boolean>(false)
  const [chatLanguage, setChatLanguage] = useState<string>('')
  const [toggleAdmin, setToggleAdmin] = useState<boolean>(true) // only for admin to switch between "admin" and "user" functions
  const [download, setDownload] = useState<string | boolean>(false)

  // for select language
  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>): void {
    setChatLanguage(event.target.value)
  }

  // if user = admin then he can save chat as "admin" or "user"
  function toggleAdminChat() {
    setToggleAdmin(!toggleAdmin)
  }

  // prepare download as pdf and get drafts with last changes (messages)
  function pdfdownload(id: string) {
    setDownload(id)
    dispatch(getOneChat(id))
    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }

  // function for form
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    // if no chat is active, the function is inactive
    if (!chat.chatEditmode) {
      setEdit(false)
      setSave(false)
      return
    }

    // check if save-button is clicked
    if (save) {
      // check if user is admin, if user is admin he can switch between "admin" and "user" publishing
      let admin: boolean = chat.admin
      if (user.admin) {
        admin = toggleAdmin
      }
      // check if language setting has been changed and set new language
      let language: string = chat.language
      if (chatLanguage !== language && chatLanguage !== '') {
        language = chatLanguage
      }
      
      // save comments
      const comments = chat.comments

      // check if Refs are not null and assign the value of the Ref to a const variable, otherwise ste error and interrupt action
      const chatnumber: number | boolean = numberRef.current !== null? parseInt(numberRef.current.value) : false
      if (!chatnumber) {
        return setError('Please insert a chatnumber')
      }

      const chatTitle: string | boolean = titleRef.current !== null? titleRef.current.value : false
      if (!chatTitle) {
        return setError('Please insert a title')
      }

      const author: string = authorRef.current !== null && user.admin? authorRef.current.value : user.username
      if (!author) {
        return setError('Please name an author')
      }
      
      const date: string | boolean = dateRef.current !== null? dateRef.current.value : false
      if (!date) {
        return setError('Please insert a date')
      }
      
      const tagsValue: string | boolean = tagsRef.current !== null? tagsRef.current.value : false
      if (!tagsValue) {
        return setError('Please insert some tags')
      }
      const tags: string[] = tagsValue? tagsValue.split(',') : [''] // tags will be saved as array of strings devided by comma

      const description: string | boolean = descriptionRef.current !== null? descriptionRef.current.value : false
      if (!description) {
        return setError('Please insert a description')
      }

      // set id's
      const userId: string = chat.userId
      const titleId: string = title.titleId
      const chatId: string = chat.chatId
      
      // save title
      dispatch(updateTitle(
        titleId,
        chatnumber,
        chatTitle,
        author,
        date,
        language,
        tags,
        description,
        admin
      ))
      // save chat details
      dispatch(updateChatDetails(
        chatId,
        chatnumber,
        chatTitle,
        author,
        date,
        language,
        tags,
        description,
        admin,
        comments
      ))

      // clear data and load chat/title
      setTimeout(() => {
        dispatch(getOneChat(chatId))
        dispatch(getUserTitles(userId))
      }, 500)
      setError('')
      setEdit(false)
      setSave(false)

      // activate spinner
      setSpinner(true)
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  // function clear data
  function clear() {
    dispatch(clearDisplay())
    setError('')
    setEdit(false)
    setSave(false)
    setDownload(false)
  }

  // delete one title + chat
  function deleteThisChat(chatId: string) {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      let titleId: string = ''
      dispatch(deleteChat(chatId))
      title.allTitles.map((mapTitle: any) => {
        if (mapTitle.chatId === chatId) {
          titleId = mapTitle._id
        }
        return titleId
      })
      dispatch(deleteTitle(titleId))
      setTimeout(() => {
        dispatch(getUserChats(user.userId))
        dispatch(getUserTitles(user.userId))
      }, 500)
      clear()
    } else {
      return
    }
  }

  // save chat as draft
  function saveAsDraft() {
    if (!chat.chatEditmode) {
      setEdit(false)
      setSave(false)
      return
    }
    
    dispatch(saveDraft(
      chat.userId,
      user.username,
      chat.title,
      chat.author,
      chat.date,
      chat.language,
      chat.tags,
      chat.description,
      chat.philosopher,
      chat.messages,
      chat.admin
    ))

    // clear data and get drafts
    clear()
    setTimeout(() => {
      dispatch(getDrafts(chat.userId))
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

      <Form onSubmit={handleSubmit}>
        {edit ? (
          <div
            className={
              window.innerWidth <= 1000
                ? 'edit-chat-scroll-mobile'
                : 'edit-chat-scroll'
            }
          >
            <Form.Group as={Row}>
              <Form.Label className="edit-chat-number" column sm="3">
                Chatnumber:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-number"
                  type="text"
                  ref={numberRef}
                  autoFocus
                  placeholder="0-99"
                  defaultValue={chat.chatnumber}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label className="edit-chat-title" column sm="3">
                Title:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-title"
                  type="text"
                  ref={titleRef}
                  as="textarea"
                  placeholder="Insert a title"
                  defaultValue={chat.title}
                  rows={2}
                />
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat-top" as={Row}>
              <Form.Label className="edit-chat-description" column sm="3">
                Description:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-description"
                  type="text"
                  as="textarea"
                  ref={descriptionRef}
                  placeholder="Give a brief summary or description of your chat"
                  defaultValue={chat.description}
                  rows={5}
                />
              </Col>
            </Form.Group>

            <Form.Group className="edit-chat-top" as={Row}>
              <Form.Label className="edit-chat-tags" column sm="3">
                Tags:{' '}
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-tags"
                  type="text"
                  ref={tagsRef}
                  as="textarea"
                  rows={4}
                  placeholder="E.g. philosophy, theory of mind etc."
                  defaultValue={chat.tags}
                />
              </Col>
            </Form.Group>

            {user.admin ? (
              <Form.Group className="edit-chat-top" as={Row}>
                <Form.Label className="edit-chat-author" column sm="3">
                  Author:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-chat-input-author"
                    type="text"
                    ref={authorRef}
                    defaultValue={chat.author}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {user.admin ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-chat-admin" column sm="3">
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
              <Form.Label className="edit-chat-language" column sm="3">
                Language:
              </Form.Label>
              <Col>
                <select
                  className="edit-chat-language-select"
                  value={chat.language}
                  onChange={changeLanguage}
                >
                  {user.selectLanguage.map((lang: string) => {
                    return (
                      <option value={lang} key={uuidv4()}>
                        {lang}
                      </option>
                    )
                  })}
                </select>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label className="edit-chat-date" column sm="3">
                Published:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-chat-input-date"
                  type="text"
                  ref={dateRef}
                  placeholder="yyyy-mm-dd"
                  defaultValue={chat.date}
                />
              </Col>
            </Form.Group>
            <br />
          </div>
        ) : (
          <div
            className={
              window.innerWidth <= 1000
                ? 'edit-chat-scroll-mobile'
                : 'edit-chat-scroll'
            }
          >
            <div className="chat-details">
              <p>Chatnumber:</p>
              <p className="chat-info" id="chat-number">
                {chat.chatnumber === 0? '' : chat.chatnumber}
              </p>
            </div>

            <div className="chat-details">
              <p>Title:</p>
              <p className="chat-info">{chat.title}</p>
            </div>

            <div className="chat-details">
              <p>Description:</p>
              <p className="chat-info" id="chat-info-description">
                {chat.description}
              </p>
            </div>

            <div className="chat-details">
              <p>Tags:</p>
              <p className="chat-info" id="chat-info-tags">
                {chat.tags}
              </p>
            </div>

            <div className="chat-details">
              <p>Protagonists:</p>
              <div className="chat-info">
                {chat.philosopher.map((phil: any) => {
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
              <p className="chat-info">{chat.author}</p>
            </div>

            {user.admin ? (
              <div className="chat-details">
                <p>Status:</p>
                <p className="chat-info">
                  {chat.chatEditmode
                    ? chat.admin
                      ? 'Admin'
                      : 'User'
                    : null}
                </p>
              </div>
            ) : null}

            <div className="chat-details">
              <p>Language:</p>
              <p className="chat-info">{chat.language}</p>
            </div>

            <div className="chat-details">
              <p>Messages:</p>
              <p className="chat-info" id="chat-messages">
                {chat.messages.length !== 0
                  ? chat.messages.length
                  : null}
              </p>
            </div>

            <div className="chat-details">
              <p>Published:</p>
              <p className="chat-info" id="chat-messages">
                {chat.messages.length !== 0 ? chat.date : null}
              </p>
            </div>

            <div className="chat-details" id="chat-details-download">
              <p>Download:</p>
              <div className="chat-info">
                {download ? (
                  <PDFDownloadLink
                    document={
                      <PDF
                        title={chat.title}
                        data={chat.messages}
                        author={chat.author}
                        date={chat.date}
                      />
                    }
                    fileName={chat.title + '.pdf'}
                    className="link-download-chat"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'loading...' : 'download'
                    }
                  </PDFDownloadLink>
                ) : (
                  <p
                    className={'link-download-chat'}
                    onClick={() => pdfdownload(chat.chatId)}
                  >
                    {chat.title ? chat.title + '.pdf' : null}
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
              handleClick={() => deleteThisChat(chat.chatId)}
            ></Button>
          ) : null}
        </div>
      </Form>
    </Panel>
  )
}

export default EditChats
