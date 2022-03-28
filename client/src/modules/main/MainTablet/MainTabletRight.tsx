import '../Main.css'

import { Container, Tab, Tabs } from 'react-bootstrap'
import {StateChat, StateDraft, StateUser} from '../../../redux/interfaces/interfaces'

import AboutEng from '../../about/Eng/AboutEng'
import AboutGer from '../../about/Ger/AboutGer'
import Authorization from '../../../authorization/authorization/Authorization'
import EditChats from '../../edit/EditChats/EditChats'
import EditDrafts from '../../edit/EditDrafts/EditDrafts'
import React from 'react'
import Settings from '../../settings/Settings/Settings'
import StartDraft from '../../edit/StartDraft/StartDraft'
import Title from '../../title/Title'
import { setKeyR } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'

interface Select {
  auto: any,
  desktop: any,
  tablet: any,
  mobile: any,
  id: string
}

const MainTabletRight: React.FC<Select> = (props: any) => {
  // state
  const dispatch = useDispatch()
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)

  // sets key for tabs
  function handleSelect(key: string | null) {
    key !== null? dispatch(setKeyR(key)) : null
  }

  // ------------- Return --------------------------------------------------------------------

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs
        activeKey={user.keyR === 'chatbox' ? 'about' : user.keyR}
        id="uncontrolled"
        style={{ borderBottom: 0 }}
        onSelect={handleSelect}
      >
        {user.loggedIn ? (
          /* eventKey = about because initial state is about when page is refreshed */
          <Tab
            eventKey="about"
            title={draft.draftEditmode ? 'Edit Draft' : 'Start Draft'}
          >
              {draft.draftEditmode ? <EditDrafts /> : <StartDraft />}
          </Tab>
        ) : (
          <Tab eventKey="about" title="About">
            {user.language === 'deutsch' ? <AboutGer /> : <AboutEng />}
          </Tab>
        )}

        {!user.loggedIn && chat.chatEditmode ? (
          <Tab eventKey="title" title="Title">
            <Title />
          </Tab>
        ) : null}

        {user.loggedIn ? (
          <Tab eventKey="chats" title="Edit Chat">
              <EditChats />
          </Tab>
        ) : null}

        {user.loggedIn ? (
          <Tab eventKey="login" title={user.loggedIn ? 'Profile' : 'Login'}>
            <Authorization
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewtablet"
            />
          </Tab>
        ) : (
          <Tab eventKey="settings" title="Settings">
            <Settings
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewtablet"
            />
          </Tab>
        )}

      </Tabs>
    </Container>
  )
}

export default MainTabletRight
