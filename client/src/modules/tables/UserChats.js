import React from 'react'
import './UserChats.css'
import { connect } from 'react-redux'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'
import { getOneChat } from '../../redux/actions/chat'
import { getOneTitle } from '../../redux/actions/title'
import Popover from '../../elements/Popover'
import { writeMessage } from '../../redux/actions/draft'

export function UserChatsTable(props) {
  function displayChat(id, chatId) {
    props.clearDisplay()
    props.getOneTitle(id)
    props.getOneChat(chatId)
    props.setKeyL('chatbox') // for navigation of mobile version
    props.setKeyR('title') // for navigation of Tablet version (right side)
    props.writeMessage(false)
  }

  let usertitles

  //--------------------- return -----------------------------------------------------------
  return (
    <div className="table-userchats">
      <div className="data-columns-userchats">
        <div className="thead-userchats-1">Author</div>
        <div className="thead-userchats-2">No.</div>
        <div className="thead-userchats-3">Title</div>
        <div className="thead-userchats-4">Date</div>
      </div>
      {
        (usertitles = props.title.allTitles.map((title) => {
          if (!title.admin && props.user.language === title.language) {
            return (
              <div key={uuidv4()} className="data-rows-userchats">
                <div className="userchats-column-1">{title.author}</div>
                <div className="userchats-column-2">{title.chatnumber}</div>
                <div
                  className="userchats-column-3"
                  onClick={() => displayChat(title._id, title.chatId)}
                >
                  <Popover
                    title={title.title}
                    tags={title.tags}
                    description={title.description}
                  />
                </div>
                <div className="userchats-column-4">
                  {title.chatnumber === props.chat.chatnumber &&
                  title.userId === props.chat.userId &&
                  !props.user.loggedIn ? (
                    <PDFDownloadLink
                      document={
                        <PDF
                          title={title.title}
                          data={props.chat.messages}
                          author={title.author}
                          date={title.date}
                        />
                      }
                      fileName={title.chatnumber + '. ' + title.title + '.pdf'}
                      className="link-download-userchat"
                    >
                      download
                    </PDFDownloadLink>
                  ) : (
                    title.date
                  )}
                </div>
              </div>
            )
          }
          return usertitles
        }))
      }
    </div>
  )
}

// ------------------------ redux -----------------------------------------------------------------

let mapStateToProps = (state) => {
  return {
    chat: state.chat,
    title: state.title,
    user: state.user,
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getOneChat: getOneChat,
  getOneTitle: getOneTitle,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
  writeMessage: writeMessage,
}

let UserChats = connect(mapStateToProps, mapDispatchToProps)(UserChatsTable)

export default UserChats
