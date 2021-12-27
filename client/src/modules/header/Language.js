import React, { useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Form, Row } from 'react-bootstrap'
import { selectLanguage } from '../../redux/actions/user'

export function Language(props) {
  const [select, setSelect] = useState('deutsch')

  function handleChange(event) {
    setSelect(event.target.value)
    props.selectLanguage(event.target.value)
  }

  // -----------------------------------------------------------------------------------

  return (
    <div className="switch" id={props.id}>
      <Form>
        <Form.Group as={Row}>
          <select
            className="header-language-select"
            value={select}
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
        </Form.Group>
      </Form>
    </div>
  )
}

// ------------------------------------ REDUX ---------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  selectLanguage: selectLanguage,
}

export default connect(mapStateToProps, mapActionsToProps)(Language)
