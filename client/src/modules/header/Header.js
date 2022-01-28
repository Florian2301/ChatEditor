import React, { useState } from 'react'
import './Header.css'
import { connect } from 'react-redux'
import { clearDisplay } from '../../redux/actions/user'
import SelectView from './SelectView'
import Language from './Language'

export function Header(props) {
  // clear chatbox
  function clear() {
    props.clearDisplay()
  }

  const [show, setShow] = useState(true)

  return (
    <div>
      {!show ? (
        <div id="item-show" onClick={() => setShow(!show)}>
          {show ? 'fade-out' : 'show options'}
        </div>
      ) : null}

      {show ? (
        <section className="flexContainer-header">
          <div
            className="flexItem-header"
            id="item-fade-out"
            onClick={() => setShow(!show)}
          >
            {show ? 'fade-out' : 'show options'}
          </div>
          <div className="flexItem-header" id="item-language">
            <Language />
          </div>

          <div className="flexItem-header" id="item-clear">
            <p id="header-link-clear" onClick={clear}>
              clear chatbox
            </p>
          </div>

          <div className="flexItem-header" id="item-select">
            <SelectView
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id={props.id}
            />
          </div>
        </section>
      ) : null}
    </div>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    draft: state.draft,
    user: state.user,
  }
}

const mapActionsToProps = {
  clearDisplay: clearDisplay,
}

export default connect(mapStateToProps, mapActionsToProps)(Header)
