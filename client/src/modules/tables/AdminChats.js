import React from 'react'
import './AdminChats.css'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'
import { getOneChat } from '../../redux/actions/chat'
import { getOneTitle } from '../../redux/actions/title'
import Popover from '../../elements/Popover'
import { writeMessage } from '../../redux/actions/draft'

export function AdminChatsTable(props) {
  function displayChat(id, chatId) {
    props.clearDisplay()
    props.getOneTitle(id)
    props.getOneChat(chatId)
    props.setKeyL('chatbox') // for navigation of mobile/tablet version
    props.setKeyR('title') // for navigation of Tablet version (right side)
    props.writeMessage(false)
  }

  //--------------------- return -----------------------------------------------------------

  let admintitles

  return (
    <div className="table-adminchats">
      <div className="data-columns-adminchats-1">
        <div className="thead-adminchats-1">#</div>
        <div className="thead-adminchats-2">Title</div>
        <div className="thead-adminchats-3">Date</div>
      </div>
      <div
        className={
          window.innerWidth <= 979
            ? 'adminchats-scroll-mobile'
            : 'adminchats-scroll'
        }
      >
        {
          (admintitles = props.title.allTitles.map((title) => {
            if (title.admin && props.user.language === title.language) {
              return (
                <div
                  key={uuidv4()}
                  className="data-columns-adminchats-2"
                  onClick={() => displayChat(title._id, title.chatId)}
                >
                  <div className="adminchats-column-1">{title.chatnumber}</div>
                  <div className="adminchats-column-2">
                    <Popover
                      title={title.title}
                      tags={title.tags}
                      description={title.description}
                    />
                  </div>
                  <div className="adminchats-column-3">{title.date}</div>
                </div>
              )
            }
            return admintitles
          }))
        }
      </div>
    </div>
  )
}

// ------------------------ redux -----------------------------------------------------------------

let mapStateToProps = (state) => {
  return {
    title: state.title,
    chat: state.chat,
    user: state.user,
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getOneTitle: getOneTitle,
  getOneChat: getOneChat,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
  writeMessage: writeMessage,
}

let Adminchats = connect(mapStateToProps, mapDispatchToProps)(AdminChatsTable)

export default Adminchats
