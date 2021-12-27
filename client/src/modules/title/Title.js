import React from 'react'
import { connect } from 'react-redux'
import './Title.css'
import Panel from '../../elements/Panel'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid'

export function Title(props) {
  return (
    <Panel title="chat details" id="title-panel">
      <div>
        <div className="title-details" id="title-number">
          <p>Chatnumber:</p>
          <p className="title-info">{props.title.chatnumber}</p>
        </div>

        <div className="title-details">
          <p>Title:</p>
          <p className="title-info">{props.title.title}</p>
        </div>

        <div className="title-details">
          <p>Philosopher:</p>
          <div className="title-info">
            {props.chat.philosopher.map((phil) => {
              return <p key={uuidv4()}>{phil.name}</p>
            })}
          </div>
        </div>

        <div className="title-details">
          <p>Messages:</p>
          <p className="title-info" id="title-messages">
            {props.chat.messages.length !== 0
              ? props.chat.messages.length
              : null}
          </p>
        </div>

        <div className="title-details">
          <p>Description:</p>
          <p className="title-info">{props.title.description}</p>
        </div>

        <div className="title-details">
          <p>Tags:</p>
          <p className="title-info">{props.title.tags}</p>
        </div>

        <div className="title-details">
          <p>Author:</p>
          <p className="title-info">{props.title.author}</p>
        </div>

        <div className="title-details">
          <p>Language:</p>
          <p className="title-info">{props.title.language}</p>
        </div>

        <div className="title-details">
          <p>Published:</p>
          <p className="title-info" id="title-date">
            {props.title.date}
          </p>
        </div>

        <div className="title-details" id="title-download">
          <p>Download:</p>
          <div className="title-info">
            {props.title.title ? (
              <PDFDownloadLink
                document={
                  <PDF
                    title={props.title.title}
                    data={props.chat.messages}
                    author={props.title.author}
                    date={props.title.date}
                  />
                }
                fileName={
                  props.title.chatnumber + '. ' + props.title.title + '.pdf'
                }
                className="link-download-title"
              >
                {props.title.title}.pdf
              </PDFDownloadLink>
            ) : null}
          </div>
        </div>
      </div>
    </Panel>
  )
}

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    chat: state.chat,
    title: state.title,
  }
}

let mapDispatchToProps = {}

let TitleContainer = connect(mapStateToProps, mapDispatchToProps)(Title)

export default TitleContainer
