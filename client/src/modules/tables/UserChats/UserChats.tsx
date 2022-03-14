import React from 'react'
import './UserChats.css'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user.js'
import { getOneChat } from '../../../redux/actions/chat/chat.js'
import { getOneTitle } from '../../../redux/actions/title/title.js'
import { writeMessage } from '../../../redux/actions/draft/draft.js'
import { StateUser, StateTitle, UserChats } from '../../../redux/interfaces/interfaces'
import Popover from '../../../elements/Popover/Popover.js'


const UserChats: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const title: StateTitle = useTypedSelector((state) => state.title)
  const user: StateUser = useTypedSelector((state) => state.user)

  function displayChat(id: string, chatId: string) {
    dispatch(clearDisplay())
    dispatch(getOneTitle(id))
    dispatch(getOneChat(chatId))
    dispatch(setKeyL('chatbox')) // for navigation of mobile version
    dispatch(setKeyR('title')) // for navigation of Tablet version (right side)
    dispatch(writeMessage(false))
  }

  //--------------------- return -----------------------------------------------------------

  // empty variabel for return statement
  let usertitles: any

  return (
    <div className="table-userchats">
      <div className="data-columns-userchats-1">
        <div className="thead-userchats-1">User</div>
        <div className="thead-userchats-2">#</div>
        <div className="thead-userchats-3">Title</div>
        <div className="thead-userchats-4">Date</div>
      </div>
      <div
        className={
          window.innerWidth <= 1000
            ? 'userchats-scroll-mobile'
            : 'userchats-scroll'
        }
      >
        {
          (usertitles = title.allTitles.map((t: any) => {
            if (user.language === t.language) {
              return (
                <div key={uuidv4()} className="data-columns-userchats-2">
                  <div className="userchats-column-1">{t.author}</div>
                  <div className="userchats-column-2">{t.chatnumber}</div>
                  <div
                    className="userchats-column-3"
                    onClick={() => displayChat(t._id, t.chatId)}
                  >
                    {t.title}
                  </div>
                  <div className="userchats-column-4">
                    <Popover
                      date={t.date}
                      tags={t.tags}
                      description={t.description}
                    />
                  </div>
                </div>
              )
            }
            return usertitles
          }))
        }
      </div>
    </div>
  )
}

export default UserChats
