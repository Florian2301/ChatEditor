import './StartDraft.css'

import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap'
import {Philosopher, StateDraft, StateUser} from '../../../redux/interfaces/interfaces'
import React, { useRef, useState } from 'react'
import {
  addColor,
  addPhil,
  getDrafts,
  saveDraft,
  selectColor,
} from '../../../redux/actions/draft/draft'

import Button from '../../../elements/Button/Button'
import Panel from '../../../elements/Panel/Panel'
import { clearDisplay } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const StartDraft: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)

  // date variable
  const date = new Date()

  // Refs
  const titleRef = useRef<HTMLInputElement>(null)
  const philRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLSelectElement>(null)
  
  // useState
  const [error, setError] = useState<string>('')
  const [spinner, setSpinner] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)

  // catches key-event (esc/enter)
  function keyEventInputTitle(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      
    } else if (event.code === 'Escape') {
      // clear input add name and color
      titleRef.current? titleRef.current.value = '' : null
    }
  }
  
  // catches key-event (esc/enter)
  function keyEventInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      //add new name
      addName()
    } else if (event.code === 'Escape') {
      // clear input add name and color
      philRef.current? philRef.current.value = '' : null
    }
  }

  function addName() {
    // delete color from list of colors
    const color = colorRef.current? colorRef.current.value : draft.colors[0]
    dispatch(selectColor(color))

    // set new name
    let names: Philosopher[] = []
    if (draft.philosopher) {
      names = draft.philosopher
    }
    const newName = philRef.current? philRef.current.value : ''
    if (newName === '') {
      return
    }
    if (newName && names.length <= 5) {
      names.push({ name: newName, color: color })
      dispatch(addPhil(names))
      philRef.current? philRef.current.value = '' : null
    } else {
      setError('You can only add up to 6 names to your chat')
      philRef.current? philRef.current.value = '' : null
      setTimeout(() => {
        setError('')
      }, 5000)
    }
    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 500)
  }

  function removeName(name: Philosopher) {
    // remove name from array
    let names: Philosopher[] = draft.philosopher
    names.splice(names.indexOf(name), 1)
    dispatch(addPhil(names))

    // add removed color to array
    let colors: string[] = draft.colors
    colors.push(name.color)
    dispatch(addColor(colors))

    // spinner
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
    }, 500)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    if (!reset) {
      const title = titleRef.current? titleRef.current.value : 'no title'
      const updateDraft = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      if (!title) {
        return setError('Please insert a title')
      }
      dispatch(saveDraft(
        user.userId,
        user.username,
        title,
        user.username,
        updateDraft,
        user.language,
        draft.tags,
        draft.description,
        draft.philosopher,
        draft.messages,
        user.admin
      ))
      // clear data and get updated draftlist
      dispatch(clearDisplay())
      setTimeout(() => {
        dispatch(getDrafts(user.userId))
      }, 500)
    } else {
      // clear button
      dispatch(clearDisplay())
      titleRef.current? titleRef.current.value = '' : null
      philRef.current? philRef.current.value = '' : null
    }
    setReset(false)
    setError('')
  }

  // ----------------------------------- RETURN --------------------------------------------------------------------------

  return (
    <Panel id="startDraft" title="Start a draft for a new chat">
      <div className="text-center mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label id="start-title" column sm="3">
            Title:*
          </Form.Label>
          <Col>
            <Form.Control
              id="start-input-title"
              type="name"
              ref={titleRef}
              autoFocus
              placeholder="Set a title for your chat"
              onKeyDown={keyEventInputTitle}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label id="start-add-name" column sm="3">
            {' '}
            Protagonist:*
          </Form.Label>
          <Col>
            <Form.Control
              id="start-add-input-name"
              type="name"
              ref={philRef}
              placeholder="Name of philosopher"
              onKeyDown={keyEventInput}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <select
              className="start-name-color-select"
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
            <p className="start-add-name-link" onClick={() => addName()}>
              +add name
            </p>
          </Col>
        </Form.Group>

        <div className="start-spinner">
          {spinner ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : null}
        </div>

        {draft.philosopher[0] ? (
          <div className="start-border1">{''}</div>
        ) : null}

        {draft.philosopher.map((phil: Philosopher) => {
          return (
            <Form.Group as={Row} key={uuidv4()}>
              <Col>
                <p id="start-input-name">{phil.name}</p>
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


export default StartDraft
