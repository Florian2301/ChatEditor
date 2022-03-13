import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import './ChatList.css'
import { v4 as uuidv4 } from 'uuid'
import { getUserChats, getOneChat } from '../../../redux/actions/chat/chat.js'
import { getUserTitles, getOneTitle } from '../../../redux/actions/title/title.js'
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user.js'
import { StateChat, StateUser, StateTitle, UserChats } from '../../../redux/interfaces/interfaces'


const ChatList: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const title: StateTitle = useTypedSelector((state) => state.title)
  const chat: StateChat = useTypedSelector((state) => state.chat)
  const user: StateUser = useTypedSelector((state) => state.user)

  // useState
  const [list, setList] = useState<boolean>(false)
  
  // const
  const userId: string = user.userId
  const userChats: UserChats[] = chat.userChats

  useEffect(() => {
    if (!list) {
      // get all chats
      if (!userChats[0]) {
        dispatch(getUserChats(userId))
        dispatch(getUserTitles(userId))
      }
      setList(true)
    }
  }, [userChats, userId, list])

  // show one chat
  function getChat(chatId: string) {
    dispatch(clearDisplay())
    dispatch(setKeyL('chatbox')) // for mobile/tablet navigation
    dispatch(setKeyR('chats')) // for tablet navigation
    let titleId: string = ''
    dispatch(getOneChat(chatId)) // get one chat
    title.userTitles.map((title: any ) => {
      // get one title
      if (title.chatId === chatId) {
        titleId = title._id
      }
      return titleId
    })
    dispatch(getOneTitle(titleId))
  }

  // -------------------- return --------------------------------------------------

  // empty variable for return statement
  let chats: any

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
          (chats = userChats.map((chat: any) => {
            if (chat.language === user.language) {
              return (
                <div
                  key={uuidv4()}
                  className="data-rows-chats-2"
                  onClick={() => getChat(chat._id)}
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

export default ChatList
