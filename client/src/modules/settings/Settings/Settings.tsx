import './Settings.css'

import { setKeyL, setKeyR } from '../../../redux/actions/user/user'

import Language from '../Language/Language'
import Panel from '../../../elements/Panel/Panel'
import React from 'react'
import SelectView from '../SelectView/SelectView'
import { clearDisplay } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'

const Settings = (props: {auto: any, desktop: any, tablet: any, mobile: any, id: string}) => {
  const dispatch = useDispatch()

  // clear screen
  function clear() {
    dispatch(clearDisplay())
    dispatch(setKeyL('userchats'))
    dispatch(setKeyR('about'))
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


export default Settings
