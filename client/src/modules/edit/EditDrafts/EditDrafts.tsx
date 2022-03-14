import React, { useRef, useState, useEffect } from 'react'
import './EditDrafts.css'
import { v4 as uuidv4 } from 'uuid'
import { Form, Alert, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import {
  addPhil,
  getDrafts,
  updateDraft,
  selectColor,
  deleteDraft,
} from '../../../redux/actions/draft/draft.js'
import { clearDisplay } from '../../../redux/actions/user/user.js'
import { saveChat, getUserChats } from '../../../redux/actions/chat/chat.js'
import { publishTitle } from '../../../redux/actions/title/title.js'
import {StateChat, StateUser, StateDraft, Philosopher, Messages, UserChats, Comments} from '../../../redux/interfaces/interfaces'
import Button from '../../../elements/Button/Button.js'
import Panel from '../../../elements/Panel/Panel.js'
import PDF from '../../../elements/PDF/PDF.js'
import { PDFDownloadLink } from '@react-pdf/renderer'


const EditDrafts: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)

  // date variable
  const date = new Date()

  // Names for Philosophers
  const phil1: Philosopher = draft.philosopher[0]
  const phil2: Philosopher = draft.philosopher[1]
  const phil3: Philosopher = draft.philosopher[2]
  const phil4: Philosopher = draft.philosopher[3]
  const phil5: Philosopher = draft.philosopher[4]
  const phil6: Philosopher = draft.philosopher[5]

  // useState
  const [error, setError] = useState<string>('')
  const [spinner, setSpinner] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [save, setSave] = useState<boolean>(false)
  const [draftLanguage, setDraftLanguage] = useState<string>(draft.language)
  const [toggleAdmin, setToggleAdmin] = useState<boolean>(true)
  const [download, setDownload] = useState<string | boolean>(false)
  
  // Refs
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const addPhilRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLSelectElement>(null)
  const editPhilRef1 = useRef<HTMLInputElement>(null)
  const editPhilRef2 = useRef<HTMLInputElement>(null)
  const editPhilRef3 = useRef<HTMLInputElement>(null)
  const editPhilRef4 = useRef<HTMLInputElement>(null)
  const editPhilRef5 = useRef<HTMLInputElement>(null)
  const editPhilRef6 = useRef<HTMLInputElement>(null)
  const tagsRef = useRef<HTMLTextAreaElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)

  // catches key-event (esc/enter)
  function addPhilEvent(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.code === 'Enter') {
      event.preventDefault()
      // check if new name is set
      const newPhil: string | boolean = addPhilRef.current? addPhilRef.current.value : false
      if (newPhil === '') {
        return
      } else {
        //add new name
        addName()
      }
    } else if (event.code === 'Escape') {
      // clear input add name
      addPhilRef.current? addPhilRef.current.value = '' : null
    }
  }

  // for select language
  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>): void {
    setDraftLanguage(event.target.value)
  }

  // if user = admin then he can save draft as "admin" or "user"
  function toggleAdminDraft() {
    setToggleAdmin(!toggleAdmin)
  }

  // prepare download as pdf and get drafts with last changes (messages)
  function pdfdownload(id: string) {
    setDownload(id)
    dispatch(getDrafts(draft.userId))
    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }

  // for updating list of colors to select for new name
  useEffect(() => {
    if (edit) {
      draft.colors.map((color: string) => {
        if (phil1 && phil1.color === color) {
          dispatch(selectColor(color))
        }
        if (phil2 && phil2.color === color) {
          dispatch(selectColor(color))
        }
        if (phil3 && phil3.color === color) {
          dispatch(selectColor(color))
        }
        if (phil4 && phil4.color === color) {
          dispatch(selectColor(color))
        }
        if (phil5 && phil5.color === color) {
          dispatch(selectColor(color))
        }
        if (phil6 && phil6.color === color) {
          dispatch(selectColor(color))
        }
        return draft.colors
      })
    }
  }, [edit, draft.colors])

  // add new name
  function addName() {
    // delete color from list of colors
    const color = colorRef.current? colorRef.current.value : draft.colors[0]
    dispatch(selectColor(color))

    // set new name
    let names: Philosopher[] = draft.philosopher
    const newName = addPhilRef.current? addPhilRef.current.value : 'no name'
    names.push({ name: newName, color: color })
    dispatch(addPhil(names))
    // clear input
    addPhilRef.current? addPhilRef.current.value = '' : null
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    // only save if "save" is clicked
    if (save) {
      // save title, title must be set
      const title = titleRef.current? titleRef.current.value : false
      if (!title) {
        return setError('Please insert a title')
      }
      // all messages and empty variable for index
      const messages: Messages[] = draft.messages
      let indexOfMessage: number

      // 1. change name in messages
      // 2. save name and color of philosophers
      let philosopher = []
      // philosopher 1
      if (phil1) {
        const editPhil1 = editPhilRef1.current? editPhilRef1.current.value : 'no name'
        if (phil1.name !== editPhil1) {
          messages.map((m: Messages) => {
            if (phil1.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil1,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil1,
          name: editPhil1,
          color: phil1.color,
        })
      }
      // philosopher 2
      if (phil2) {
        const editPhil2 = editPhilRef2.current? editPhilRef2.current.value : 'no name'
        if (phil2.name !== editPhil2) {
          messages.map((m: Messages) => {
            if (phil2.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil2,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil2,
          name: editPhil2,
          color: phil2.color,
        })
      }
      // philosopher 3
      if (phil3) {
        const editPhil3 = editPhilRef3.current? editPhilRef3.current.value : 'no name'
        if (phil3.name !== editPhil3) {
          messages.map((m: Messages) => {
            if (phil3.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil3,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil3,
          name: editPhil3,
          color: phil3.color,
        })
      }
      // philosopher 4
      if (phil4) {
        const editPhil4 = editPhilRef4.current? editPhilRef4.current.value : 'no name'
        if (phil4.name !== editPhil4) {
          messages.map((m: any) => {
            if (phil4.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil4,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil4,
          name: editPhil4,
          color: phil4.color,
        })
      }
      // philosopher 5
      if (phil5) {
        const editPhil5 = editPhilRef5.current? editPhilRef5.current.value : 'no name'
        if (phil5.name !== editPhil5) {
          messages.map((m: any) => {
            if (phil5.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil5,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil5,
          name: editPhil5,
          color: phil5.color,
        })
      }
      // philosopher 6
      if (phil6) {
        const editPhil6 = editPhilRef6.current? editPhilRef6.current.value : 'no name'
        if (phil6.name !== editPhil6) {
          messages.map((m: any) => {
            if (phil6.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhil6,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
                repliedmessage: m.repliedmessage
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhil6,
          name: editPhil6,
          color: phil6.color,
        })
      }

      // save tags
      let tags: string[] = []
      const tagsRefValue = tagsRef.current? tagsRef.current.value : ''
      if (tagsRefValue !== '') {
        tags = tagsRefValue.split(',')
      }

      // save description
      let description: string = ''
      const descriptionRefValue = descriptionRef.current? descriptionRef.current.value : ''
      if (descriptionRefValue !== '') {
        description = descriptionRefValue
      }

      // save author
      let author: string = user.username
      const authorRefValue = authorRef.current? authorRef.current.value : ''
      if (user.admin) {
        if (authorRefValue !== '') {
          author = authorRefValue
        }
      } 

      // check if user is admin and if draft should be saved as "admin" or "user"
      let admin: boolean = draft.admin
      if (user.admin) {
        admin = toggleAdmin
      }

      // save (new) date
      let updateDateOfDraft: string = draft.date
      if (save) {
        updateDateOfDraft = date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      }

      //update draft
      const draftId = draft.draftId
      const userId = user.userId
      const published = draft.published
      dispatch(updateDraft(
        draftId,
        title,
        author,
        published,
        updateDateOfDraft,
        draftLanguage,
        tags,
        description,
        philosopher,
        messages,
        admin
      ))

      // clear data and get saved drafts
      setTimeout(() => {
        dispatch(getDrafts(userId))
      }, 500)
      setError('')
      setEdit(false)
      setSave(false)

      // spinner
      setSpinner(true)
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  // screen and set data back
  function clear() {
    dispatch(clearDisplay())
    setError('')
    setEdit(false)
    setSave(false)
    setDownload(false)
  }

  // publish draft as chat
  function publish() {
    const tags: string[] = draft.tags
    const description: string = draft.description
    const chatLanguage: string = draft.language
    // tags and description must be set before publish (save as chat)
    if (!tags.length) {
      setError('Please insert tags before publishing')
      return
    }
    if (!description) {
      setError('Please insert a description before publishing')
      return
    }

    // set new chatnumber
    let chatnumber: number
    let numberOfChats: UserChats[] = []
    chat.userChats.map((chat: any) => {
      if (chat.language === chatLanguage) {
        numberOfChats.push(chat)
      }
      return numberOfChats
    })
    chatnumber = numberOfChats.length + 1

    // date of publish
    let publishdate: string = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const comments: Comments[] = []

    //save as chat
    dispatch(saveChat(
      user.userId,
      user.username,
      chatnumber,
      draft.title,
      draft.author,
      publishdate,
      draft.language,
      draft.tags,
      draft.description,
      draft.philosopher,
      draft.messages,
      draft.admin,
      comments
    ))

    // set draft as "published = true"
    dispatch(updateDraft(
      draft.draftId,
      draft.title,
      draft.author,
      true,
      publishdate,
      chatLanguage,
      draft.tags,
      draft.description,
      draft.philosopher,
      draft.messages,
      draft.admin
    ))

    // update chatlist and set boolean for update new title in ChatboxBackend
    setTimeout(() => {
      dispatch(getUserChats(user.userId))
    }, 500)
    dispatch(publishTitle(chat.userChats.length))

    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }

  // delete draft, get all drafts after one draft is deleted and clear display
  function deleteThisDraft() {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      dispatch(deleteDraft(draft.draftId))
      setTimeout(() => {
        dispatch(getDrafts(user.userId))
      }, 500)
      clear()
    } else {
      return
    }
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------

  return (
    <Panel id="edit-draft-panel" title="Edit your draft">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form onSubmit={handleSubmit}>
        {edit ? (
          <div
            className={
              window.innerWidth <= 1000
                ? 'edit-draft-scroll-mobile'
                : 'edit-draft-scroll'
            }
          >
            <Form.Group as={Row} className="edit-draft-top">
              <Form.Label className="edit-draft-title" column sm="3">
                Title:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-title-input"
                  type="name"
                  ref={titleRef}
                  as="textarea"
                  autoFocus
                  placeholder="Choose a title for your chat"
                  defaultValue={draft.title}
                  rows = {2}
                />
              </Col>
            </Form.Group>

            {phil1 ? (
              <Form.Group as={Row} className="edit-draft-top">
                <Form.Label className="edit-draft-name" column sm="3">
                  Protagonists:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef1}
                    defaultValue={phil1.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil2 ? (
              <Form.Group as={Row} className="edit-draft-top">
                <Form.Label className="edit-draft-name" column sm="3">
                  {''}
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef2}
                    defaultValue={phil2.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil3 ? (
              <Form.Group as={Row} className="edit-draft-top-2">
                <Form.Label className="edit-draft-name" column sm="3">
                  {''}
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef3}
                    defaultValue={phil3.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil4 ? (
              <Form.Group as={Row} className="edit-draft-top-2">
                <Form.Label className="edit-draft-name" column sm="3">
                  {''}
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef4}
                    defaultValue={phil4.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil5 ? (
              <Form.Group as={Row} className="edit-draft-top-2">
                <Form.Label className="edit-draft-name" column sm="3">
                  {''}
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef5}
                    defaultValue={phil5.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil6 ? (
              <Form.Group as={Row} className="edit-draft-top-2">
                <Form.Label className="edit-draft-name" column sm="3">
                  {''}
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name"
                    type="name"
                    ref={editPhilRef6}
                    defaultValue={phil6.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil6 ? null : (
              <Form.Group as={Row} className="edit-draft-top-2">
                <Form.Label className="edit-draft-add-name" column sm="3">
                  {' '}
                  Add name:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-add-name-input"
                    type="name"
                    ref={addPhilRef}
                    onKeyDown={addPhilEvent}
                  />
                </Col>
              </Form.Group>
            )}

            {phil6 ? null : (
              <Form.Group as={Row} className="edit-draft-top">
                <Col>
                  <select
                    className="edit-draft-name-color-select"
                    defaultValue={draft.colors[0]}
                    ref={colorRef}
                  >
                    {draft.colors.map((col: string) => {
                      return (
                        <option value={col} key={uuidv4()}>
                          {col}
                        </option>
                      )
                    })}
                  </select>
                </Col>
                <Col>
                  <p
                    className="edit-draft-add-name-link"
                    onClick={() => addName()}
                  >
                    +add name
                  </p>
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row} className="edit-draft-top-2">
              <Form.Label className="edit-draft-description" column sm="3">
                Description:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-description-input"
                  type="text"
                  as="textarea"
                  ref={descriptionRef}
                  placeholder="Take notes for your chat"
                  defaultValue={draft.description}
                  rows={5}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="edit-draft-top-2">
              <Form.Label className="edit-draft-tags" column sm="3">
                Tags:{' '}
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-tags-input"
                  type="text"
                  ref={tagsRef}
                  as="textarea"
                  placeholder="E.g. philosophy, theory of mind etc."
                  defaultValue={draft.tags}
                  rows={2}
                />
              </Col>
            </Form.Group>

            {user.admin ? (
              <Form.Group as={Row} className="edit-draft-top">
                <Form.Label className="edit-draft-author" column sm="3">
                  Author:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-author-input"
                    type="text"
                    ref={authorRef}
                    defaultValue={draft.author}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {user.admin ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-admin" column sm="3">
                  {toggleAdmin ? 'Admin' : 'User'}:
                </Form.Label>
                <Col>
                  <div
                    className={
                      toggleAdmin
                        ? 'edit-draft-admin-toggle'
                        : 'edit-draft-user-toggle'
                    }
                  >
                    <Form.Check
                      type="switch"
                      id="draft-details-toggle"
                      onChange={() => toggleAdminDraft()}
                      checked={toggleAdmin ? true : false}
                    />
                  </div>
                </Col>
              </Form.Group>
            ) : null}

            <Form.Group as={Row} className="edit-draft-top-3">
              <Form.Label className="edit-draft-language" column sm="3">
                Language:
              </Form.Label>
              <Col>
                <select
                  className="edit-draft-language-select"
                  value={draftLanguage}
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
          </div>
        ) : (
          <div
            className={
              window.innerWidth <= 1000
                ? 'edit-draft-scroll-mobile'
                : 'edit-draft-scroll'
            }
          >
            <div className="draft-details">
              <p>Title:</p>
              <p className="draft-info">{draft.title}</p>
            </div>

            <div className="draft-details">
              <p>Description:</p>
              <p className="draft-info" id="draft-info-description">
                {draft.description}
              </p>
            </div>

            <div className="draft-details" id="draft-details-tags">
              <p>Tags:</p>
              <p className="draft-info" id="draft-info-tags">
                {draft.tags}
              </p>
            </div>

            <div className="draft-details">
              <p>Protagonists:</p>
              <div className="draft-info">
                {draft.philosopher.map((phil: Philosopher) => {
                  return (
                    <p key={uuidv4()} id="draft-info-phil">
                      {phil.name}
                    </p>
                  )
                })}
              </div>
            </div>

            <div className="draft-details" id="draft-info-description-margin">
              <p>Author:</p>
              <p className="draft-info" id="draft-author">
                {draft.author}
              </p>
            </div>

            {user.admin ? (
              <div className="draft-details">
                <p>Status:</p>
                <p className="draft-info" id="draft-admin">
                  {draft.admin ? 'Admin' : 'User'}
                </p>
              </div>
            ) : null}

            <div className="draft-details">
              <p>Language:</p>
              <p className="draft-info" id="draft-author">
                {draft.language}
              </p>
            </div>

            <div className="draft-details">
              <p>Messages:</p>
              <p className="draft-info" id="draft-messages">
                {draft.messages.length}
              </p>
            </div>

            <div className="draft-details">
              <p>Published:</p>
              <p className="draft-info" id="draft-date">
                {draft.published ? 'Yes' : 'Nope'}
              </p>
            </div>

            <div className="draft-details">
              <p>Updated:</p>
              <p className="draft-info" id="draft-date">
                {draft.date}
              </p>
            </div>

            <div className="draft-details" id="draft-details-download">
              <p>Download:</p>
              <div className="draft-info">
                {download ? (
                  <PDFDownloadLink
                    document={
                      <PDF
                        title={draft.title}
                        data={draft.messages}
                        author={draft.author}
                        date={draft.date}
                      />
                    }
                    fileName={draft.title + '.pdf'}
                    className="link-download-draft"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'loading...' : 'download'
                    }
                  </PDFDownloadLink>
                ) : (
                  <p
                    className={'link-download-draft'}
                    onClick={() => pdfdownload(draft.draftId)}
                  >
                    {draft.title + '.pdf'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="draft-details-border">{''}</div>
        <div className="draft-details-spinner">
          {spinner ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : null}
        </div>

        <div className="draft-details-actions">
          {!edit ? (
            <Button
              label="Edit Details"
              className="draft-details-btn"
              handleClick={() => setEdit(true)}
            ></Button>
          ) : (
            <Button
              label="Save changes"
              className="draft-details-btn"
              type="submit"
              handleClick={() => setSave(true)}
            ></Button>
          )}
          {!edit ? (
            <Button
              label="Publish"
              className="draft-details-btn"
              handleClick={() => publish()}
            ></Button>
          ) : null}

          {!edit ? (
            <Button
              label="Clear"
              className="draft-details-btn-clear"
              handleClick={() => clear()}
            ></Button>
          ) : (
            <Button
              label="Back"
              className="draft-details-btn-clear"
              handleClick={() => setEdit(false)}
            ></Button>
          )}
          {!edit ? (
            <Button
              label="Delete"
              className="draft-details-btn-delete"
              handleClick={() => deleteThisDraft()}
            ></Button>
          ) : null}
        </div>
      </Form>
    </Panel>
  )
}


export default EditDrafts
