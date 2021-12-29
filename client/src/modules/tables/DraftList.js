import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './DraftList.css'
import { v4 as uuidv4 } from 'uuid'
import { getDrafts, getOneDraft } from '../../redux/actions/draft'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'

export function Drafts(props) {
  const userId = props.user.userId
  const userDrafts = props.draft.userDrafts
  const [list, setList] = useState(false)

  useEffect(() => {
    if (!list) {
      // get all drafts from user
      if (!userDrafts[0]) {
        props.getDrafts(userId)
      }
      setList(true)
    }
  }, [userDrafts, userId, props, list])

  // show one draft and disable pdf-download
  function showDraft(id) {
    props.clearDisplay()
    props.setKeyL('chatbox') // for mobile/tablet navigation
    props.setKeyR('about') // for tablet navigation
    props.getOneDraft(id)
  }

  // -------------------- return --------------------------------------------------

  let drafts

  return (
    <div className="table-drafts">
      <div className="data-rows-drafts">
        <div className="thead-drafts">Your drafts</div>
        <div className="thead-drafts">Date</div>
      </div>
      {
        (drafts = userDrafts.map((draft) => {
          if (draft.language === props.user.language) {
            return (
              <div key={uuidv4()} className="data-rows-drafts">
                <div
                  className="data-columns-drafts"
                  id="data-columns-drafts-title"
                  onClick={() => showDraft(draft._id)}
                >
                  <span id="draft-title">{draft.title}</span>
                  <span id="draft-published">
                    {draft.published ? ' (published)' : ''}
                  </span>
                </div>
                <div
                  className="data-columns-drafts"
                  id="data-columns-draft-date"
                  onClick={() => showDraft(draft._id)}
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
  )
}

//------------------------- redux -------------------------------------------

let mapStateToProps = (state) => {
  return {
    draft: state.draft,
    user: state.user,
  }
}

let mapDispatchToProps = {
  getDrafts: getDrafts,
  getOneDraft: getOneDraft,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
  clearDisplay: clearDisplay,
}

let ListOfDrafts = connect(mapStateToProps, mapDispatchToProps)(Drafts)

export default ListOfDrafts
