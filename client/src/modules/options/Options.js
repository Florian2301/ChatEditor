import React from 'react'
import './Options.css'
import { connect } from 'react-redux'
import { clearDisplay } from '../../redux/actions/user'
import Panel from '../../elements/Panel'
import SelectView from './SelectView'
import Language from './Language'

export function Options(props) {
  // clear screen
  function clear() {
    props.clearDisplay()
  }

  return (
    <Panel title="Select options" id="options">
      <div className="options">
        <p>I. Select a view</p>
        <SelectView
          auto={props.auto}
          desktop={props.desktop}
          tablet={props.tablet}
          mobile={props.mobile}
          id={props.id}
        />
      </div>
      <div className="options">
        <p>II. Select a language for chats</p>
        <Language />
      </div>
      <div className="options">
        <p>III. Clear screen</p>
        <p id="options-link-clear" onClick={clear}>
          clear screen
        </p>
      </div>
      <br />
    </Panel>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {}
}

const mapActionsToProps = {
  clearDisplay: clearDisplay,
}

export default connect(mapStateToProps, mapActionsToProps)(Options)
