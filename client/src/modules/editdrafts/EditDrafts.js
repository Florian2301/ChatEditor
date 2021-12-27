import React, { useRef, useState, useEffect } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './EditDrafts.css'
import { connect } from 'react-redux'
import {
  addPhil,
  getDrafts,
  updateDraft,
  selectColor,
} from '../../redux/actions/draft'
import { clearDisplay } from '../../redux/actions/user'
import { saveChat, getUserChats } from '../../redux/actions/chat'
import { publishTitle } from '../../redux/actions/title'

export function EditDrafts(props) {
  const KEY_ENTER = 13
  const KEY_ESC = 27
  const date = new Date()
  const phil1 = props.draft.philosopher[0]
  const phil2 = props.draft.philosopher[1]
  const phil3 = props.draft.philosopher[2]
  const phil4 = props.draft.philosopher[3]
  const phil5 = props.draft.philosopher[4]
  const phil6 = props.draft.philosopher[5]
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(false)
  const [save, setSave] = useState(false)
  const [draftLanguage, setDraftLanguage] = useState(props.draft.language)
  const [toggleAdmin, setToggleAdmin] = useState(true)
  const titleRef = useRef()
  const addPhilRef = useRef()
  const colorRef = useRef()
  const editPhilRef1 = useRef()
  const editPhilRef2 = useRef()
  const editPhilRef3 = useRef()
  const editPhilRef4 = useRef()
  const editPhilRef5 = useRef()
  const editPhilRef6 = useRef()
  const tagsRef = useRef()
  const descriptionRef = useRef()
  const authorRef = useRef()

  // catches key-event (esc/enter)
  function keyEventInput(event) {
    if (event.keyCode === KEY_ENTER) {
      event.preventDefault()
      // check if new name is set
      if (addPhilRef.current.value === '') {
        return
      } else {
        //add new name
        addName()
      }
    } else if (event.keyCode === KEY_ESC) {
      // clear input add name
      addPhilRef.current.value = null
    }
  }

  // for select language
  function handleChange(event) {
    setDraftLanguage(event.target.value)
  }

  // if user = admin then he can save draft as "admin" or "user"
  function toggleAdminDraft() {
    setToggleAdmin(!toggleAdmin)
  }

  // for updating list of colors to select for new name
  useEffect(() => {
    if (edit) {
      props.draft.colors.map((color) => {
        if (phil1 && phil1.color === color) {
          props.selectColor(color)
        }
        if (phil2 && phil2.color === color) {
          props.selectColor(color)
        }
        if (phil3 && phil3.color === color) {
          props.selectColor(color)
        }
        if (phil4 && phil4.color === color) {
          props.selectColor(color)
        }
        if (phil5 && phil5.color === color) {
          props.selectColor(color)
        }
        if (phil6 && phil6.color === color) {
          props.selectColor(color)
        }
        return props.draft.colors
      })
    }
  })

  // add new name
  function addName() {
    // delete color from list of colors
    let color = colorRef.current.value
    props.selectColor(color)

    // set new name
    let names = props.draft.philosopher
    let newName = addPhilRef.current.value
    names.push({ name: newName, color: color })
    props.addPhil(names)
    addPhilRef.current.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()

    // only save if "save" is clicked
    if (save) {
      // save title, title must be set
      const title = titleRef.current.value
      if (!title) {
        return setError('Please insert a title')
      }
      // all messages and empty variable for index
      let messages = props.draft.messages
      let indexOfMessage

      // 1. change name in messages
      // 2. save name and color of philosophers
      let philosopher = []
      // philosopher 1
      if (phil1) {
        if (phil1.name !== editPhilRef1.current.value) {
          messages.map((m) => {
            if (phil1.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef1.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef1.current.value,
          name: editPhilRef1.current.value,
          color: phil1.color,
        })
      }
      // philosopher 2
      if (phil2) {
        if (phil2.name !== editPhilRef2.current.value) {
          messages.map((m) => {
            if (phil2.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef2.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef2.current.value,
          name: editPhilRef2.current.value,
          color: phil2.color,
        })
      }
      // philosopher 3
      if (phil3) {
        if (phil3.name !== editPhilRef3.current.value) {
          messages.map((m) => {
            if (phil3.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef3.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef3.current.value,
          name: editPhilRef3.current.value,
          color: phil3.color,
        })
      }
      // philosopher 4
      if (phil4) {
        if (phil4.name !== editPhilRef4.current.value) {
          messages.map((m) => {
            if (phil4.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef4.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef4.current.value,
          name: editPhilRef4.current.value,
          color: phil4.color,
        })
      }
      // philosopher 5
      if (phil5) {
        if (phil5.name !== editPhilRef5.current.value) {
          messages.map((m) => {
            if (phil5.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef5.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef5.current.value,
          name: editPhilRef5.current.value,
          color: phil5.color,
        })
      }
      // philosopher 6
      if (phil6) {
        if (phil6.name !== editPhilRef6.current.value) {
          messages.map((m) => {
            if (phil6.name === m.name) {
              indexOfMessage = messages.indexOf(m)
              messages.splice(indexOfMessage, 1, {
                _id: m._id,
                messagenumber: m.messagenumber,
                name: editPhilRef6.current.value,
                text: m.text,
                time: m.time,
                color: m.color,
                position: m.position,
                tags: m.tags,
              })
              return messages
            }
            return messages
          })
        }
        philosopher.push({
          id: editPhilRef6.current.value,
          name: editPhilRef6.current.value,
          color: phil6.color,
        })
      }

      // save tags
      let tags = []
      if (tagsRef.current.value !== '') {
        let tagsValue = tagsRef.current.value
        tags = tagsValue.split(',')
      }

      // save description
      let description
      if (descriptionRef.current.value !== '') {
        description = descriptionRef.current.value
      }

      // save author
      let author
      if (authorRef.current.value !== '') {
        author = authorRef.current.value
      }

      // save admin
      let admin = props.draft.admin
      if (props.user.admin) {
        admin = toggleAdmin
      }

      // save date
      let updateDraft = props.draft.date
      if (save) {
        updateDraft = date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      }

      //update draft
      const draftId = props.draft.draftId
      const userId = props.user.userId
      props.updateDraft(
        draftId,
        title,
        author,
        updateDraft,
        draftLanguage,
        tags,
        description,
        philosopher,
        messages,
        admin
      )
      setTimeout(() => {
        props.getDrafts(userId)
      }, 500)
      setError('')
      e.target.reset()
    }
    if (save) {
      setEdit(false)
      setSave(false)
    }
  }

  // screen and set data back
  function clear() {
    props.clearDisplay()
    setError('')
    setEdit(false)
    setSave(false)
  }

  // publish draft
  function publish() {
    const admin = props.user.admin
    const userId = props.user.userId
    const user = props.user.username
    const title = props.draft.title
    const author = props.draft.author
    const chatLanguage = props.draft.language
    const tags = props.draft.tags
    const description = props.draft.description
    const philosopher = props.draft.philosopher
    const messages = props.draft.messages

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
    let chatnumber
    let language = []
    props.chat.userChats.map((chat) => {
      if (chat.language === chatLanguage) {
        language.push(chat)
      }
      return language
    })
    chatnumber = language.length + 1

    // date of publish
    let publishdate = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    //save as chat
    props.saveChat(
      userId,
      user,
      chatnumber,
      title,
      author,
      publishdate,
      chatLanguage,
      tags,
      description,
      philosopher,
      messages,
      admin
    )
    // clear screen, update chatlist and set boolean for update new title in ChatboxBackend
    clear()
    setTimeout(() => {
      props.getUserChats(userId)
    }, 500)
    props.publishTitle(props.chat.userChats.length)
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------

  return (
    <Panel id="edit-draft-panel" title="Edit your draft">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form className="edit-draft-form" onSubmit={handleSubmit}>
        {edit ? (
          <div>
            <Form.Group as={Row}>
              <Form.Label className="edit-draft-title">Title:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-title-input"
                  type="name"
                  ref={titleRef}
                  autoFocus
                  placeholder="Choose a title for your chat"
                  defaultValue={props.draft.title}
                />
              </Col>
            </Form.Group>

            {phil1 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">
                  Philosopher:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-name-input-1"
                    type="name"
                    ref={editPhilRef1}
                    defaultValue={phil1.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil2 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">{''}</Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-name-input-2"
                    type="name"
                    ref={editPhilRef2}
                    defaultValue={phil2.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil3 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">{''}</Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name-2"
                    type="name"
                    ref={editPhilRef3}
                    defaultValue={phil3.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil4 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">{''}</Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name-2"
                    type="name"
                    ref={editPhilRef4}
                    defaultValue={phil4.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil5 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">{''}</Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name-2"
                    type="name"
                    ref={editPhilRef5}
                    defaultValue={phil5.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil6 ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-name">{''}</Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-input-name-2"
                    type="name"
                    ref={editPhilRef6}
                    defaultValue={phil6.name}
                  />
                </Col>
              </Form.Group>
            ) : null}

            {phil6 ? null : (
              <Form.Group as={Row} key={uuidv4()}>
                <Form.Label className="edit-draft-add-name">
                  {' '}
                  Add name:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="edit-draft-add-name-input"
                    type="name"
                    ref={addPhilRef}
                    onKeyDown={keyEventInput}
                  />
                </Col>
              </Form.Group>
            )}

            {phil6 ? null : (
              <Form.Group as={Row}>
                <Col>
                  <select
                    className="edit-draft-name-color-select"
                    type="text"
                    defaultValue={props.draft.colors[0]}
                    ref={colorRef}
                  >
                    {props.draft.colors.map((col) => {
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

            <Form.Group as={Row}>
              <Form.Label className="edit-draft-description">
                Description:
              </Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-description-input"
                  type="text"
                  as="textarea"
                  ref={descriptionRef}
                  placeholder="Take notes for your chat"
                  defaultValue={props.draft.description}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label className="edit-draft-tags">Tags: </Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-tags-input"
                  type="text"
                  ref={tagsRef}
                  placeholder="E.g. philosophy, theory of mind etc."
                  defaultValue={props.draft.tags}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label className="edit-draft-author">Author:</Form.Label>
              <Col>
                <Form.Control
                  className="edit-draft-author-input"
                  type="text"
                  ref={authorRef}
                  defaultValue={props.draft.author}
                />
              </Col>
            </Form.Group>

            {props.user.admin ? (
              <Form.Group as={Row}>
                <Form.Label className="edit-draft-admin">
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

            <Form.Group as={Row}>
              <Form.Label className="edit-draft-language">Language:</Form.Label>
              <Col>
                <select
                  className="edit-draft-language-select"
                  type="text"
                  value={draftLanguage}
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
          </div>
        ) : (
          <div>
            <div className="draft-details">
              <p>Title:</p>
              <p className="draft-info">{props.draft.title}</p>
            </div>

            <div className="draft-details">
              <p>Philosopher:</p>
              <div className="draft-info">
                {props.draft.philosopher.map((phil) => {
                  return <p key={uuidv4()}>{phil.name}</p>
                })}
              </div>
            </div>

            <div className="draft-details">
              <p>Messages:</p>
              <p className="draft-info" id="draft-messages">
                {props.draft.messages.length}
              </p>
            </div>

            <div className="draft-details">
              <p>Description:</p>
              <p className="draft-info">{props.draft.description}</p>
            </div>

            <div className="draft-details">
              <p>Tags:</p>
              <p className="draft-info">{props.draft.tags}</p>
            </div>

            <div className="draft-details">
              <p>Author:</p>
              <p className="draft-info" id="draft-author">
                {props.draft.author}
              </p>
            </div>

            {props.user.admin ? (
              <div className="draft-details">
                <p>Admin:</p>
                <p className="draft-info" id="draft-admin">
                  {props.draft.admin ? 'Admin' : 'User'}
                </p>
              </div>
            ) : null}

            <div className="draft-details">
              <p>Language:</p>
              <p className="draft-info" id="draft-author">
                {props.draft.language}
              </p>
            </div>

            <div className="draft-details">
              <p>Updated:</p>
              <p className="draft-info" id="draft-date">
                {props.draft.date}
              </p>
            </div>
          </div>
        )}

        <div className="draft-details-border">{''}</div>

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
        </div>
      </Form>
    </Panel>
  )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = (state) => ({
  draft: state.draft,
  user: state.user,
  chat: state.chat,
  title: state.title,
})

const mapActionsToProps = {
  clearDisplay: clearDisplay,
  addPhil: addPhil,
  getDrafts: getDrafts,
  updateDraft: updateDraft,
  saveChat: saveChat,
  getUserChats: getUserChats,
  selectColor: selectColor,
  publishTitle: publishTitle,
}

export default connect(mapStateToProps, mapActionsToProps)(EditDrafts)
