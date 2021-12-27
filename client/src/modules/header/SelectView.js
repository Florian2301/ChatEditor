import React from 'react'
import './SelectView.css'
import { Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { changeModus } from '../../redux/actions/user'

export function SelectView(props) {
  function handleChange(e) {
    const modus = e.currentTarget.id
    props.changeModus(modus)
    if (modus === 'auto') {
      props.auto()
    }
    if (modus === 'desktop') {
      props.desktop()
    }
    if (modus === 'tablet') {
      props.tablet()
    }
    if (modus === 'mobile') {
      props.mobile()
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  return (
    <Form as={Row} id={props.id}>
      <div id="size">
        <Form.Group as={Row}>
          <Form.Check
            type="radio"
            id="auto"
            name="modi"
            label=""
            onChange={(e) => handleChange(e)}
            checked={props.user.modus === 'auto' ? true : false}
          />
          <Form.Label id="label-view">auto</Form.Label>
        </Form.Group>
      </div>
      <div id="size">
        <Form.Group as={Row}>
          <Form.Check
            type="radio"
            id="desktop"
            name="modi"
            label=""
            onChange={(e) => handleChange(e)}
            checked={props.user.modus === 'desktop' ? true : false}
          />
          <Form.Label
            id="label-view"
            style={
              window.innerWidth <= 979 ? { color: 'grey' } : { color: 'white' }
            }
          >
            Desktop
          </Form.Label>
        </Form.Group>
      </div>
      <div id="size">
        <Form.Group as={Row}>
          <Form.Check
            type="radio"
            id="tablet"
            name="modi"
            label=""
            onChange={(e) => handleChange(e)}
            checked={props.user.modus === 'tablet' ? true : false}
          />
          <Form.Label
            id="label-view"
            style={
              window.innerWidth <= 767 ? { color: 'grey' } : { color: 'white' }
            }
          >
            Tablet
          </Form.Label>
        </Form.Group>
      </div>
      <div id="size">
        <Form.Group as={Row}>
          <Form.Check
            type="radio"
            id="mobile"
            name="modi"
            label=""
            onChange={(e) => handleChange(e)}
            checked={props.user.modus === 'mobile' ? true : false}
          />
          <Form.Label id="label-view">Mobile</Form.Label>
        </Form.Group>
      </div>
    </Form>
  )
}

// ------------------------------------ REDUX ---------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  changeModus: changeModus,
}

export default connect(mapStateToProps, mapActionsToProps)(SelectView)
