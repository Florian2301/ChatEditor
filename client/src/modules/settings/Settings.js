import React from 'react'
import './Settings.css'
import { connect } from 'react-redux'
import { clearDisplay } from '../../redux/actions/user'
import Panel from '../../elements/Panel'
import SelectView from './SelectView'
import Language from './Language'
import { setKeyR, setKeyL } from '../../redux/actions/user'

export function Settings(props) {
  // clear screen
  function clear() {
    props.clearDisplay()
    props.setKeyL('userchats')
    props.setKeyR('about')
  }

  //----------------------RETURN------------------------------------------
  return (
    <Panel title="Settings" id="settings">
      <div className="options">
        <p>I. Select a view for your device</p>
        <SelectView
          auto={props.auto}
          desktop={props.desktop}
          tablet={props.tablet}
          mobile={props.mobile}
          id={props.id}
        />
      </div>
      <div className="options">
        <p>II. Select language of chats</p>
        <Language />
      </div>
      <div className="options">
        <p>III. Go back to startpage</p>
        <p id="options-link-clear" onClick={clear}>
          Startpage
        </p>
      </div>
      <br />
    </Panel>
  )
}

// ------------- REDUX ---------------------------------------

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapActionsToProps = {
  clearDisplay: clearDisplay,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

export default connect(mapStateToProps, mapActionsToProps)(Settings)
