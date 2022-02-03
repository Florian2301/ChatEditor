import React from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { changeModus, setKeyL, setKeyR } from '../../redux/actions/user'

export function SelectView(props) {
  function handleChange(e) {
    const modus = e.currentTarget.id
    props.changeModus(modus)
    if (modus === 'auto') {
      props.auto()
      props.setKeyR(!props.user.loggedIn ? 'settings' : 'login')
      props.setKeyL('userchats')
    }
    if (modus === 'desktop') {
      props.desktop()
      props.setKeyR(!props.user.loggedIn ? 'settings' : 'login')
    }
    if (modus === 'tablet') {
      props.tablet()
      props.setKeyL('userchats')
      props.setKeyR(!props.user.loggedIn ? 'settings' : 'login')
    }
    if (modus === 'mobile') {
      props.mobile()
      props.setKeyL(!props.user.loggedIn ? 'settings' : 'login')
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  return (
    <Form id={props.id}>
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="auto"
        name="modi"
        type="radio"
        id="auto"
        onChange={(e) => handleChange(e)}
        checked={props.user.modus === 'auto' ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="desktop"
        name="modi"
        type="radio"
        id="desktop"
        onChange={(e) => handleChange(e)}
        checked={props.user.modus === 'desktop' ? true : false}
        disabled={window.innerWidth <= 1400 ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="tablet"
        name="modi"
        type="radio"
        id="tablet"
        onChange={(e) => handleChange(e)}
        checked={props.user.modus === 'tablet' ? true : false}
        disabled={window.innerWidth <= 1000 ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="mobile"
        name="modi"
        type="radio"
        id="mobile"
        onChange={(e) => handleChange(e)}
        checked={props.user.modus === 'mobile' ? true : false}
      />
    </Form>
  )
}

// ------------------------------------ REDUX ---------------------------------------------

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  changeModus: changeModus,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

export default connect(mapStateToProps, mapActionsToProps)(SelectView)
