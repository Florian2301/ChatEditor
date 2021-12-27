import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './DraftList.css'
import { v4 as uuidv4 } from 'uuid'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { getDrafts, getOneDraft, deleteDraft } from '../../redux/actions/draft'
import { clearDisplay, setKeyL, setKeyR } from '../../redux/actions/user'

export function Drafts(props) {
  const userId = props.user.userId
  const userDrafts = props.draft.userDrafts
  const [download, setDownload] = useState(false)
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
    setDownload(false)
    props.setKeyL('chatbox') // for mobile/tablet navigation
    props.setKeyR('about') // for tablet navigation
    props.getOneDraft(id)
  }

  // prepare download as pdf and get drafts with last changes (messages)
  function pdfdownload(id) {
    setDownload(id)
    props.getDrafts(userId)
  }

  // delete draft, get all drafts after one draft is deleted and clear display
  function deleteDraft(id) {
    let answer = window.confirm('Delete this message?')
    if (answer) {
      props.deleteDraft(id)
      setTimeout(() => {
        props.getDrafts(userId)
      }, 500)
      props.clearDisplay()
    } else {
      return
    }
  }

  // -------------------- return --------------------------------------------------

  return (
    <div className="table-drafts">
      <div className="data-rows-drafts">
        <div className="thead-drafts">Your drafts</div>
        <div className="thead-drafts">Delete</div>
        <div className="thead-drafts">Download</div>
      </div>
      {userDrafts.map(({ _id, title, author, date, messages }) => {
        return (
          <div key={uuidv4()} className="data-rows-drafts">
            <div
              className="data-columns-drafts"
              id="data-columns-drafts-title"
              onClick={() => showDraft(_id)}
            >
              {title}
            </div>
            <div className="data-columns-drafts">
              {props.draft.draftId !== _id ? (
                <p
                  className="link-download-draft"
                  onClick={() => deleteDraft(_id)}
                >
                  delete
                </p>
              ) : (
                <p className="link-download-draft-active">delete</p>
              )}
            </div>
            <div className="data-columns-drafts">
              {download === _id && props.draft.draftId !== _id ? (
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
                  className="link-download-draft"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'loading...' : 'download'
                  }
                </PDFDownloadLink>
              ) : (
                <p
                  className={
                    props.draft.draftId !== _id
                      ? 'link-download-draft'
                      : 'link-download-draft-active'
                  }
                  onClick={() => pdfdownload(_id)}
                >
                  {date}
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
    draft: state.draft,
    user: state.user,
  }
}

let mapDispatchToProps = {
  getDrafts: getDrafts,
  getOneDraft: getOneDraft,
  deleteDraft: deleteDraft,
  setKeyL: setKeyL,
  setKeyR: setKeyR,
  clearDisplay: clearDisplay,
}

let ListOfDrafts = connect(mapStateToProps, mapDispatchToProps)(Drafts)

export default ListOfDrafts
