import './DraftList.css'

import React, { useEffect, useState } from 'react'
import { StateDraft, StateUser, UserDrafts } from '../../../redux/interfaces/interfaces'
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user'
import { getDrafts, getOneDraft } from '../../../redux/actions/draft/draft'

import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const DraftList: React.FC = () => {
  // state
  const dispatch = useDispatch()
  const draft: StateDraft = useTypedSelector((state) => state.draft)
  const user: StateUser = useTypedSelector((state) => state.user)
  
  // const
  const userId: string = user.userId
  const userDraftArray: UserDrafts[] = draft.userDrafts
  
  // useState
  const [list, setList] = useState<boolean>(false)

  useEffect(() => {
    if (!list) {
      // get all drafts from user
      if (!userDraftArray[0]) {
        dispatch(getDrafts(userId))
      }
      setList(true)
    }
  }, [userDraftArray, userId, list])

  // show one draft and disable pdf-download
  function showDraft(id: string) {
    dispatch(clearDisplay())
    dispatch(setKeyL('chatbox')) // for mobile/tablet navigation
    dispatch(setKeyR('about')) // for tablet navigation
    dispatch(getOneDraft(id))
  }

  // -------------------- return --------------------------------------------------

  // empty variable for return statement
  let drafts: any

  return (
    <div className="table-drafts">
      <div className="data-rows-drafts-1">
        <div className="thead-drafts">Your drafts</div>
        <div className="thead-drafts">Date</div>
      </div>
      <div
        className={
          window.innerWidth <= 1000
            ? 'draftlist-scroll-mobile'
            : 'draftlist-scroll'
        }
      >
        {
          (drafts = userDraftArray.map((draft: any) => {
            if (draft.language === user.language) {
              return (
                <div
                  key={uuidv4()}
                  className="data-rows-drafts-2"
                  onClick={() => showDraft(draft._id)}
                >
                  <div
                    className="data-columns-drafts"
                    id="data-columns-drafts-title"
                  >
                    <span id="draft-title">{draft.title}</span>
                    <span id="draft-published">
                      {draft.published ? ' (published)' : ''}
                    </span>
                  </div>
                  <div
                    className="data-columns-drafts"
                    id="data-columns-draft-date"
                  >
                    {draft.date}
                  </div>
                </div>
              )
            }
            return drafts
          }))
        }
      </div>
    </div>
  )
}

export default DraftList
