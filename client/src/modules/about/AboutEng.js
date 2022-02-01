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
    const Email = process.env.ContactEmail || require('./Contact').ContactEmail
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
            About this app
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
                    This app is a demo version of a chat editor, which I
                    developed by myself. Through this app everyone is able to
                    write dialogues in form of a chat und publish those.
                    Dialogues are form literary form of art, which I transfer to
                    a digital form with this editor. In time of messengers and
                    social media a “chat” is a common way to express yourself.
                    Though it is not possible or not intended on previous online
                    chat services to be more than one speaker. Online chats are
                    mainly there for social communication and interaction.
                  </p>
                  <p>
                    This chat editor enables you to “chat with yourself”, or in
                    other words: to write a digital dialogue.
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
                    Since many years I want to write down my philosophical
                    thoughts about life, the self and the reality, but I never
                    found the right way to express myself. In my mind I always
                    had internal dialogues, some with myself, some with real or
                    others with fictional people. I am aware that this is my
                    special way of thinking, which I would like to let other
                    people take part of.
                  </p>
                  <p>
                    My studies of philosophy at the university had a strong
                    influence to my way of thinking and on my personality. Even
                    though I do not intend to write an academic philosophy here.
                    I rather like to be understood also from non-academic people
                    and so I reach out for anyone who is interested in and enjoy
                    philosophy, self-reflexion and the exchange of thoughts.
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
                    The concept and development of this chat editor changed and
                    adjusted during my process about learning webdevelopment.
                    From the beginning I had a rough idea of how the chat editor
                    should look like. However during the development of the app
                    the differentiation of the single steps to write a chat was
                    growing on and on.
                  </p>
                  <p>
                    For example the different treatment of drafts and published
                    chats. Also the question if and how published chats are able
                    to be changed? To correct mistyping yes, but not adding new
                    messages or new protagonists. In this case you have the
                    option to safe the published chat as a draft and then upload
                    it again as a chat.
                  </p>
                  <p>
                    This app is a grown project, which means there were plenty
                    restructuring, changing and adjustments. For example the
                    state management was grown so far so I lost the overview
                    about it. That was leading to an important insight about
                    developing: to simplify and unification of functions and
                    processes.
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
                    I developed this chat editor with the MEARN stack. MERN
                    stands for MongoDb as database, Express as backend, React as
                    Frontend and Nodejs as environment for developing. The
                    programming language is javascript and as state management I
                    am using Redux. The design is composed with CSS and
                    React-Bootstrap.
                  </p>
                  <p>
                    You can see the whole code{' '}
                    <a
                      id="git"
                      href="https://github.com/Florian2301/ChatEditor"
                      target="_blank"
                    >
                      here on Github
                    </a>{' '}
                    .
                  </p>
                  <br />
                  <p>- MERN (MongoDB, Express, React, Nodejs)</p>
                  <p>- Javascript</p>
                  <p>- Redux</p>
                  <p>- React-Bootstrap and CSS</p>
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
                    The editor is as far developed that you can already write,
                    edit and publish chats. However there are more features I am
                    missing and which I will develop in the future:
                  </p>

                  <p>
                    - more functions for writing and editing messages (bold,
                    italic, add pictures)
                  </p>
                  <p>
                    - to change the font-size, background etc. for usability
                  </p>
                  <p>- a search tool (topics, tags) </p>
                  <p>- to create links between chats (to refer to them)</p>
                  <p>
                    - external comments on single messages/links to messages
                  </p>
                  <p>
                    - to develop an algorithm to “play” a chat in real time (as
                    you would watch the protagonists while chatting)
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
