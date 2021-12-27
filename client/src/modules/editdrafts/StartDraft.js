import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './StartDraft.css'
import { connect } from 'react-redux'
import {
  addPhil,
  saveDraft,
  getDrafts,
  selectColor,
  addColor,
} from '../../redux/actions/draft'
import { clearDisplay } from '../../redux/actions/user'

export function StartDraft(props) {
  const KEY_ENTER = 13
  const KEY_ESC = 27
  const date = new Date()
  const titleRef = useRef()
  const philRef = useRef()
  const colorRef = useRef()
  const [error, setError] = useState('')
  const [reset, setReset] = useState(false)

  // catches key-event (esc/enter)
  function keyEventInput(event) {
    if (event.keyCode === KEY_ENTER) {
      event.preventDefault()
      //add new name
      addName()
    } else if (event.keyCode === KEY_ESC) {
      // clear input add name and color
      philRef.current.value = null
      colorRef.current.value = null
    }
  }

  function addName() {
    // delete color from list of colors
    let color = colorRef.current.value
    props.selectColor(color)

    // set new name
    let names = []
    if (props.draft.philosopher) {
      names = props.draft.philosopher
    }
    let newName = philRef.current.value
    if (newName === '') {
      return
    }
    if (newName && names.length <= 5) {
      names.push({ name: newName, color: color })
      props.addPhil(names)
      philRef.current.value = ''
    } else {
      setError('You can only add up to 6 names to your chat')
      philRef.current.value = ''
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  function removeName(name) {
    // remove name from array
    let names = props.draft.philosopher
    names.splice(names.indexOf(name), 1)
    props.addPhil(names)
    // add removed color to array
    let colors = props.draft.colors
    colors.push(name.color)
    props.addColor(colors)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!reset) {
      const admin = props.user.admin
      const userId = props.user.userId
      const user = props.user.username
      const title = titleRef.current.value
      const author = props.user.username
      const language = props.user.language
      const philosopher = props.draft.philosopher
      const tags = props.draft.tags
      const description = props.draft.description
      const updateDraft = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const messages = props.draft.messages
      if (!title) {
        return setError('Please insert a title')
      }
      props.saveDraft(
        userId,
        user,
        title,
        author,
        updateDraft,
        language,
        tags,
        description,
        philosopher,
        messages,
        admin
      )
      props.clearDisplay()
      setTimeout(() => {
        props.getDrafts(userId)
      }, 500)
    } else {
      // clear button
      props.clearDisplay()
    }
    setReset(false)
    setError('')
    e.target.reset()
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------

  return (
    <Panel id="startDraft" title="Draft details">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label id="start-title">Title:*</Form.Label>
          <Col>
            <Form.Control
              id="start-input-title"
              type="name"
              ref={titleRef}
              autoFocus
              placeholder="Set a title for your chat"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label id="start-add-name"> Philosopher*:</Form.Label>
          <Col>
            <Form.Control
              id="start-add-input-name"
              type="name"
              ref={philRef}
              placeholder="Name of participant"
              onKeyDown={keyEventInput}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <select
              className="start-name-color-select"
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
            <p className="start-add-name-link" onClick={() => addName()}>
              +add name
            </p>
          </Col>
        </Form.Group>

        {props.draft.philosopher[0] ? (
          <div className="start-border1">{''}</div>
        ) : null}

        {props.draft.philosopher.map((phil) => {
          return (
            <Form.Group as={Row} key={uuidv4()}>
              <Col>
                <Form.Label id="start-input-name">{phil.name}</Form.Label>
              </Col>

              <Col>
                <p
                  className="start-name-remove"
                  onClick={() => removeName(phil)}
                >
                  remove
                </p>
              </Col>
            </Form.Group>
          )
        })}

        <div className="start-border2">{''}</div>

        <div className="start-actions">
          <Button label="New chat" id="start-btn" type="submit"></Button>
          <Button
            label="Clear"
            id="start-btn-clear"
            type="submit"
            handleClick={() => setReset(true)}
          ></Button>
        </div>
      </Form>
    </Panel>
  )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = (state) => ({
  draft: state.draft,
  user: state.user,
})

const mapActionsToProps = {
  clearDisplay: clearDisplay,
  saveDraft: saveDraft,
  addPhil: addPhil,
  getDrafts: getDrafts,
  selectColor: selectColor,
  addColor: addColor,
}

export default connect(mapStateToProps, mapActionsToProps)(StartDraft)
