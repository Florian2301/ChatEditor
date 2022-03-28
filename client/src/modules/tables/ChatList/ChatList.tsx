import './ChatList.css'

import React, { useEffect, useState } from 'react'
import { StateChat, StateTitle, StateUser, UserChats } from '../../../redux/interfaces/interfaces'
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user'
import { getOneChat, getUserChats } from '../../../redux/actions/chat/chat'
import { getOneTitle, getUserTitles } from '../../../redux/actions/title/title'

import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

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
