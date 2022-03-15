import '../Main.css'

import { Container, Tab, Tabs } from 'react-bootstrap'
import React, { Suspense } from 'react'
import {StateChat, StateDraft, StateUser} from '../../../redux/interfaces/interfaces'

import AboutEng from '../../about/Eng/AboutEng.js'
import AboutGer from '../../about/Ger/AboutGer.js'
import EditChats from '../../edit/EditChats/EditChats.js'
import EditDrafts from '../../edit/EditDrafts/EditDrafts.js'
import Settings from '../../settings/Settings/Settings.js'
import StartDraft from '../../edit/StartDraft/StartDraft.js'
import Title from '../../title/Title.js'
import { setKeyR } from '../../../redux/actions/user/user.js'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'

//import Authorization from '../../../authorization/Authorization.js'










const Authorization = React.lazy(() => import('../../../authorization/Authorization.js'))
// Lazy Load
/*
const EditChats = React.lazy(() => import ('../../edit/EditChats/EditChats.js'))
const EditDrafts = React.lazy(() => import ('../../edit/EditDrafts/EditDrafts.js'))
const StartDraft = React.lazy(() => import ('../../edit/StartDraft/StartDraft.js'))
*/

const MainTabletRight: React.FC = (props: any) => {
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
            <Suspense fallback={<div>Loading...</div>}>
            <Authorization
              auto={props.auto}
              desktop={props.desktop}
              tablet={props.tablet}
              mobile={props.mobile}
              id="viewtablet"
            />
            </Suspense>
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
