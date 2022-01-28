import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ChatList.css'
import { v4 as uuidv4 } from 'uuid'
import { getUserChats, getOneChat } from '../../redux/actions/chat'
import { getUserTitles, getOneTitle } from '../../redux/actions/title'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'

export function Chats(props) {
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

  // -------------------- return --------------------------------------------------

  let chats

  return (
    <div className="table-chats">
      <div className="data-rows-chats-1">
        <div className="thead-chats" id="thead-chats-number">
          #
        </div>
        <div className="thead-chats">Your published chats</div>
        <div className="thead-chats">Date</div>
      </div>
      <div
        className={
          window.innerWidth <= 1000
            ? 'chatlist-scroll-mobile'
            : 'chatlist-scroll'
        }
      >
        {
          (chats = userChats.map((chat) => {
            if (chat.language === props.user.language) {
              return (
                <div
                  key={uuidv4()}
                  className="data-rows-chats-2"
                  onClick={() => getOneChat(chat._id)}
                >
                  <div
                    className="data-columns-chats"
                    id="data-columns-chats-number"
                  >
                    {chat.chatnumber}
                  </div>
                  <div
                    className="data-columns-chats"
                    id="data-columns-chats-title"
                  >
                    {chat.title}
                  </div>
                  <div
                    className="data-columns-chats"
                    id="data-columns-chats-date"
                  >
                    {chat.date}
                  </div>
                </div>
              )
            }
            return chats
          }))
        }
      </div>
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
  getUserTitles: getUserTitles,
  getOneTitle: getOneTitle,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
}

let ChatList = connect(mapStateToProps, mapDispatchToProps)(Chats)

export default ChatList
