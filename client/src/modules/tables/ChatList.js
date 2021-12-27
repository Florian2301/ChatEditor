import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ChatList.css'
import { v4 as uuidv4 } from 'uuid'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDF from '../../elements/PDF'
import { getUserChats, getOneChat, deleteChat } from '../../redux/actions/chat'
import {
  getUserTitles,
  getOneTitle,
  deleteTitle,
} from '../../redux/actions/title'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'

export function Chats(props) {
  const [download, setDownload] = useState(false)
  const [list, setList] = useState(false)
  const userId = props.user.userId
  const userChats = props.chat.userChats

  useEffect(() => {
    if (!list) {
      // get all chats
      if (!userChats[0]) {
        props.getUserChats(userId)
        props.getUserTitles(userId)
        setList(true)
      }
    }
  }, [userChats, userId, props, list])

  // show one chat
  function getOneChat(chatId) {
    props.clearDisplay()
    props.setKeyL('chatbox') // for mobile/tablet navigation
    props.setKeyR('chats') // for tablet navigation
    let titleId = ''
    props.getOneChat(chatId) // get one chat
    props.title.userTitles.map((title) => {
      // get one title
      if (title.chatId === chatId) {
        titleId = title._id
      }
      return titleId
    })
    props.getOneTitle(titleId)
  }

  // prepare download as pdf and get chats with last changes
  function pdfdownload(id) {
    props.getUserChats(userId)
    setDownload(id)
  }

  // delete one title + chat
  function deleteChat(chatId) {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      let titleId = ''
      props.deleteChat(chatId)
      props.title.allTitles.map((title) => {
        // adminTitle has own state
        if (title.chatId === chatId) {
          titleId = title._id
        }
        return titleId
      })
      props.deleteTitle(titleId)
      setTimeout(() => {
        props.getUserChats(userId)
        props.getUserTitles(userId)
      }, 500)
    } else {
      return
    }
  }

  // -------------------- return --------------------------------------------------
  return (
    <div className="table-chats">
      <div className="data-rows-chats">
        <div className="thead-chats">Your published chats</div>
        <div className="thead-chats">Delete</div>
        <div className="thead-chats">Download</div>
      </div>
      {userChats.map(({ _id, chatnumber, title, author, date, messages }) => {
        return (
          <div key={uuidv4()} className="data-rows-chats">
            <div
              className="data-columns-drafts"
              id="data-columns-chats-title"
              onClick={() => getOneChat(_id)}
            >
              {chatnumber + ' ' + title}
            </div>
            <div className="data-columns-chats">
              {props.chat.chatId !== _id ? (
                <p
                  className="link-download-chat"
                  onClick={() => deleteChat(_id)}
                >
                  delete
                </p>
              ) : (
                <p className="link-download-chat-active">delete</p>
              )}
            </div>
            <div className="data-columns-chats">
              {download === _id && props.chat.chatId !== _id ? (
                <PDFDownloadLink
                  document={
                    <PDF
                      title={title}
                      data={messages}
                      author={author}
                      date={date}
                    />
                  }
                  fileName={title + '.pdf'}
                  className="link-download-chat"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'loading...' : 'download'
                  }
                </PDFDownloadLink>
              ) : (
                <p
                  className={
                    props.chat.chatId !== _id
                      ? 'link-download-chat'
                      : 'link-download-chat-active'
                  }
                  onClick={() => pdfdownload(_id)}
                >
                  pdf
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

//------------------------- redux -------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
    chat: state.chat,
    title: state.title,
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getUserChats: getUserChats,
  getOneChat: getOneChat,
  deleteChat: deleteChat,
  getUserTitles: getUserTitles,
  getOneTitle: getOneTitle,
  deleteTitle: deleteTitle,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

let ChatList = connect(mapStateToProps, mapDispatchToProps)(Chats)

export default ChatList
