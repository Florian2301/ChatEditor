import React from 'react'
import { useTypedSelector } from '../../redux/hooks/useTypeSelector.js'
import { Philosopher } from '../../redux/interfaces/interfaces.js'
import './Title.css'
import Panel from '../../elements/Panel/Panel.js'
import PDF from '../../elements/PDF/PDF.js'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid'
import { StateChat, StateTitle } from '../../redux/interfaces/interfaces'


const Title: React.FC = () => {
  const title: StateTitle = useTypedSelector((state) => state.title)
  const chat: StateChat = useTypedSelector((state) => state.chat)

//-------------------------------------- RETURN -------------------------------------------------------------------
  return (
    <Panel title="chat details" id="title-panel">
      <div
        className={
          window.innerWidth <= 1000 ? 'title-scroll-mobile' : 'title-scroll'
        }
      >
        <div className="title-details" id="title-number">
          <p>Chatnumber:</p>
          <p className="title-info">{title.chatnumber}</p>
        </div>

        <div className="title-details">
          <p>Title:</p>
          <p className="title-info">{title.title}</p>
        </div>

        <div className="title-details">
          <p>Description:</p>
          <p className="title-info" id="title-info-description">
            {title.description}
          </p>
        </div>

        <div className="title-details" id="title-details-tags">
          <p>Tags:</p>
          <p className="title-info" id="title-info-tags">
            {title.tags}
          </p>
        </div>

        <div className="title-details">
          <p>Philosopher:</p>
          <div className="title-info">
            {chat.philosopher.map((phil: Philosopher) => {
              return (
                <p key={uuidv4()} id="title-info-phil">
                  {phil.name}
                </p>
              )
            })}
          </div>
        </div>

        <div className="title-details" id="title-details-author">
          <p>Author:</p>
          <p className="title-info">{title.author}</p>
        </div>

        <div className="title-details">
          <p>Language:</p>
          <p className="title-info">{title.language}</p>
        </div>

        <div className="title-details">
          <p>Messages:</p>
          <p className="title-info" id="title-messages">
            {chat.messages.length !== 0
              ? chat.messages.length
              : null}
          </p>
        </div>

        <div className="title-details">
          <p>Published:</p>
          <p className="title-info" id="title-date">
            {title.date}
          </p>
        </div>

        <div className="title-details" id="title-download">
          <p>Download:</p>
          <div className="title-info">
            {title.title ? (
              <PDFDownloadLink
                document={
                  <PDF
                    title={title.title}
                    data={chat.messages}
                    author={title.author}
                    date={title.date}
                  />
                }
                fileName={
                  title.chatnumber + '. ' + title.title + '.pdf'
                }
                className="link-download-title"
              >
                {title.title}.pdf
              </PDFDownloadLink>
            ) : null}
          </div>
        </div>
      </div>
    </Panel>
  )
}


export default Title
