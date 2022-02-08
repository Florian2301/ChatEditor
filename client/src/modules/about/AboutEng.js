import React, { useState } from 'react'
import './About.css'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../../elements/Panel'
import { Collapse } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function About() {
  const [about, setAbout] = useState(true)
  const [tech, setTech] = useState(false)
  const [background, setBackground] = useState(false)
  const [concept, setConcept] = useState(false)
  const [future, setFuture] = useState(false)
  const [contact, setContact] = useState(false)
  const [email, setEmail] = useState(false)

  function toggleDetails(key) {
    key === 'about' ? setAbout(!about) : setAbout(false)
    key === 'tech' ? setTech(!tech) : setTech(false)
    key === 'background' ? setBackground(!background) : setBackground(false)
    key === 'concept' ? setConcept(!concept) : setConcept(false)
    key === 'future' ? setFuture(!future) : setFuture(false)
    key === 'contact' ? setContact(!contact) : setContact(false)
  }

  function getEmail() {
    const Email = require('./Contact').ContactEmail
    setEmail(Email)
    setTimeout(() => {
      setEmail(false)
    }, 10000)
  }

  //-------------------------- RETURN -----------------------------------------------------------------------
  return (
    <Panel title="Demo-Version Chat-Editor" id="about">
      <div className={window.innerWidth <= 1000 ? 'about-mobile' : 'about'}>
        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('about')}
            aria-controls="example-collapse-text"
            aria-expanded={about}
          >
            About the application
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={about}>
                <div className="about-details" id="example-collapse-text">
                  <p>
                    This application is a prototype of my self-developed chat
                    editor. With this editor, anyone can write dialogues in the
                    form of a chat and publish them here. Dialogues are a
                    literary art form that I would like to transfer into a
                    digital form. In times of messengers and social media, the
                    "chat form" is a common way of expressing oneself. However,
                    with existing online services the intention is not to take
                    on more than one speaker role, as these are primarily
                    developed for social communication and interaction.
                  </p>
                  <p>
                    This chat editor is therefore a platform on which I can
                    "chat with myself", or in other words: on which I can write
                    a digital dialogue.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <br />

        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('background')}
            aria-controls="example-collapse-text"
            aria-expanded={background}
          >
            Background
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={background}>
                <div className="about-details" id="example-collapse-text">
                  <p>
                    With this application, I have created a way for myself to
                    write down my philosophical thoughts about life, the self
                    and reality. Dialogues are a suitable form for me to present
                    philosophy in a lively and true-to-life way.
                  </p>
                  <p>
                    My studies in philosophy have had a great impact on my
                    thinking and personality, although I do not intend here to
                    pursue a purely academic philosophy, nor to address a purely
                    academic audience. On the contrary, I am addressing all
                    those who are interested in and enjoy philosophy,
                    self-reflection and an exchange of ideas.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />

        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('concept')}
            aria-controls="example-collapse-text"
            aria-expanded={concept}
          >
            Concept and development
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={concept}>
                <div className="about-details" id="example-collapse-text">
                  <p>
                    This is my first extensive web application, conceptualised
                    and developed as part of self-study. The project has grown
                    organically, with major adjustments and changes in the
                    course of development as I have enhanced my technical
                    knowledge.
                  </p>
                  <p>
                    The initial idea was to create a platform to write and
                    publish dialogues in the form of a chat, being similar in
                    appearance to that of messengers such as Whatsapp. They are
                    written in the first-person perspective, i.e. regardless of
                    how many participants take part in a chat, one's own
                    messages are always either on the left or right in the
                    message flow. Thus, to make the app look like a group chat
                    the first participant added is set as the first-order
                    speaker (first-person perspective).
                  </p>
                  <p>
                    As with other messenger services, it is possible to reply to
                    individual messages, which then have a reference to each
                    other. The message being replied to then appears in an extra
                    window above the current message.
                  </p>
                  <p>
                    The chats are initially written as a draft and are not
                    publicly accessible. At this stage content can be edited and
                    messages can be moved or deleted. If necessary, new
                    participants can also be added to a chat or existing ones
                    removed. After a chat has been published it will appear on
                    the start page. Only the chat content itself within
                    individual messages can be edited after publication, e.g. to
                    correct spelling mistakes. If a chat needs major revision it
                    can be saved again as a draft and edited.
                  </p>
                  <p>
                    The development of the chat editor has continuously evolved
                    as I have enhanced my workable knowledge of web development.
                    My ability to implement new functionalities has grown,
                    resulting in ongoing restructuring and simplification of
                    functions with cleaner code.
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />

        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('tech')}
            aria-controls="example-collapse-text"
            aria-expanded={tech}
          >
            Technical details
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={tech}>
                <div className="about-details" id="example-collapse-text">
                  <p>
                    The chat editor has been developed with the MERN stack, i.e.
                    MongoDB as the database, Express as the backend framework,
                    React as the frontend library and Nodejs as the JavaScript
                    runtime environment. The underlying language is JavaScript.
                    Redux was used for state management, the design was
                    implemented with CSS and React bootstrap, and authentication
                    with Firebase.
                  </p>
                  <p>
                    <a
                      id="git"
                      href="https://github.com/Florian2301/ChatEditor"
                      target="_blank"
                    >
                      The code is viewable on Github.
                    </a>
                  </p>
                  <br />
                  <p>- MERN (MongoDB, Express, React, Nodejs)</p>
                  <p>- Javascript</p>
                  <p>- Redux</p>
                  <p>- React-Bootstrap and CSS</p>
                  <p>- Firebase</p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />

        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('future')}
            aria-controls="example-collapse-text"
            aria-expanded={future}
          >
            Upcoming features
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={future}>
                <div className="about-details" id="example-collapse-text">
                  <p>
                    The editor is developed to the extent that it can write,
                    edit and permanently publish chats. However, this is only a
                    prototype of the chat editor, as I will be developing
                    further modules and functions.
                  </p>
                  <p>For example:</p>

                  <p>- search tool (topics, tags)</p>
                  <p>- links between chats</p>
                  <p>
                    - external comments on single messages/links to messages
                  </p>
                  <p>
                    - more writing and editing functions (bold, italic, add
                    pictures)
                  </p>
                  <p>- usability functions (font-size, background etc.)</p>
                  <p>
                    - development of an algorithm to “play” a chat in real time
                    (as you would watch the protagonists while chatting)
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />
        <div>
          <div
            className="about-menu"
            onClick={() => toggleDetails('contact')}
            aria-controls="example-collapse-text"
            aria-expanded={contact}
          >
            Kontakt
          </div>
          <TransitionGroup>
            <CSSTransition
              key={uuidv4()}
              timeout={1}
              classNames="transition-menu"
            >
              <Collapse in={contact}>
                <div className="about-details" id="example-collapse-text">
                  <p
                    id={!email ? 'about-email' : null}
                    onClick={() => getEmail()}
                  >
                    {email ? email : 'click here to show the email-address'}
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />
        <div id="about-border"></div>
        <p id="about-update">~ All works are protected by copyright ~</p>
      </div>
    </Panel>
  )
}
