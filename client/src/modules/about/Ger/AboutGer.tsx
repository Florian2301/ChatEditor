import React, { useState } from 'react'
import '../About.css'
import { v4 as uuidv4 } from 'uuid'
import Panel from '../../../elements/Panel/Panel.js'
import { Collapse } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const About: React.FC = () => {
  // useState
  const [about, setAbout] = useState<boolean>(true)
  const [tech, setTech] = useState<boolean>(false)
  const [background, setBackground] = useState<boolean>(false)
  const [concept, setConcept] = useState<boolean>(false)
  const [future, setFuture] = useState<boolean>(false)
  const [contact, setContact] = useState<boolean>(false)
  const [email, setEmail] = useState<boolean | string>(false)

  function toggleDetails(key: string) {
    key === 'about' ? setAbout(!about) : setAbout(false)
    key === 'tech' ? setTech(!tech) : setTech(false)
    key === 'background' ? setBackground(!background) : setBackground(false)
    key === 'concept' ? setConcept(!concept) : setConcept(false)
    key === 'future' ? setFuture(!future) : setFuture(false)
    key === 'contact' ? setContact(!contact) : setContact(false)
  }

  function getEmail() {
    const Email: string = require('../Contact.js').ContactEmail
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
            Über den Chat-Editor
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
                    Dieser Chat-Editor ist eine Plattform auf der man Dialoge
                    mit bis zu sechs Charakteren schreiben kann, die in einer
                    Chatgruppe miteinander interagieren.
                  </p>
                  <p>
                    Diese App ist der Prototyp eines selbst entwickelten
                    Chat-Editors. Jeder kann mit diesem Dialoge in Form eines
                    Chats schreiben und veröffentlichen. Dialoge sind eine
                    literarische Kunstform, die gut in eine digitale Form
                    überführt werden können. In Zeiten von Messengern und Social
                    Media ist die „Chatform“ eine geläufige Art, sich
                    auszudrücken. Jedoch ist es bei bisherigen Online-Diensten
                    nicht vorgesehen, mehr als eine Sprecherrolle einzunehmen.
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
            Hintergrund
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
                    Mit dieser App habe ich mir eine Möglichkeit geschaffen,
                    meine philosophischen Gedanken über das Leben, das Selbst
                    und die Wirklichkeit niederzuschreiben. Dialoge sind für
                    mich eine geeignete Form, Philosophie lebendig und lebensnah
                    zu präsentieren.
                  </p>
                  <p>
                    Mein Studium der Philosophie hat mich in meinem Denken und
                    meiner Persönlichkeit sehr geprägt, wobei ich mich nicht an
                    ein rein akademisches Publikum wende, sondern an alle
                    diejenigen, die an Philosophie, Selbstreflexion und einem
                    Gedankenaustausch Interesse und ihre Freude haben.
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
            Konzeption und Entwicklung
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
                    Die App ist meine erste umfangreiche Webanwendung, die ich
                    im Rahmen eines Selbststudiums selbst konzeptioniert und
                    entwickelt habe. Das Projekt ist organisch gewachsen, d.h.
                    es kam es immer wieder zu größeren Anpassungen und
                    Veränderungen während der Entwicklung.
                  </p>
                  <p>
                    Die Idee war zunächst, eine Plattform zu schaffen, Dialoge
                    in Form eines Chats schreiben und veröffentlichen zu können.
                    Dabei sollen sie aussehen wie man es von Messengern wie z.B.
                    Whatsapp gewohnt ist. Auch hier kann man auf einzelne
                    Nachrichten antworten, die dann einen Bezug zueinander
                    haben. Die Nachricht, auf die geantwortet wird, erscheint
                    dann in einem kleinen Fenster über der aktuellen Nachricht.
                  </p>
                  <p>
                    Die Chats werden zunächst als Entwurf geschrieben und sind
                    öffentlich nicht zugänglich. In diesem Stadium lassen sie
                    sich Inhalte bearbeiten, Nachrichten verschieben oder
                    löschen. Gegebenenfalls können auch neue Teilnehmer zu einem
                    Chat hinzugefügt bzw. alte entfernt werden. Nach der
                    Veröffentlichung eines Chats erscheinen diese auf der
                    Startseite, wobei dann nur noch die Inhalte einzelner
                    Nachrichten verändert werden können, z.B. um
                    Rechtschreibfehler zu korrigieren. Wenn ein Chat dennoch
                    einer größeren Überarbeitung bedarf, kann er wieder als
                    Entwurf gespeichert und bearbeitet werden.
                  </p>
                  <p>
                    Die Entwicklung des Chat-Editors hat sich laufend an meinen
                    Lernfortschritt im Bereich der Webentwicklung angepasst. Das
                    Wachsen meiner Fähigkeit, neue Funktionalitäten zu
                    implementieren, führte zu größeren Umstrukturierungen sowie
                    meine Fähigkeit, Funktionen zu vereinfachen und den Code
                    „sauber“ zu schreiben, führte vielerorts zu einer Neufassung
                    des bestehenden Codes.
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
            Technische Details
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
                    Der Chat-Editor ist mit dem MERN-Stack entwickelt worden,
                    d.h. MongoDB als Datenbank, Express als Backend-Framework,
                    React als Frontend-Library und Nodejs als JavaScript
                    Laufzeitumgebung. Die zugrundeliegende Sprache ist
                    JavaScript. Als State Management wurde Redux verwendet, das
                    Design mit CSS und React-Bootstrap umgesetzt und die
                    Authentifizierung mit Firebase.
                  </p>
                  <p>
                    Der Code kann{' '}
                    <a
                      id="git"
                      href="https://github.com/Florian2301/ChatEditor"
                      target="_blank"
                    >
                      hier auf Github
                    </a>{' '}
                    eingesehen werden.
                  </p>
                  <br />
                  <p>- MERN (MongoDB, Express, React, Nodejs)</p>
                  <p>- Javascript</p>
                  <p>- Redux</p>
                  <p>- Typescript</p>
                  <p>- React-Bootstrap und CSS</p>
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
            Ausblick
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
                    Der Editor ist so weit entwickelt, um Chats schreiben zu
                    können, zu bearbeiten und dauerhaft zu veröffentlichen.
                    Jedoch befindet sich die Anwendung noch in der
                    Entwicklungsphase und ist nur als Prototyp verfügbar,
                    weitere Module und Funktionen werden noch entwickelt.
                  </p>
                  <p>Zum Beispiel:</p>

                  <p>- eine Suchfunktion (Themen, Stichworte)</p>
                  <p>- eine Verlinkung der Chats untereinander</p>
                  <p>
                    - externe Kommentare zu einzelnen Nachrichten bzw.
                    Verlinkung zu den Nachrichten
                  </p>
                  <p>
                    - weitere Funktionen beim Schreiben von Nachrichten (fett,
                    kursiv, Bilder einfügen){' '}
                  </p>
                  <p>
                    - benutzerspezifische Einstellungen (Schriftgröße,
                    Hintergrund etc)
                  </p>
                  <p>
                    - einen Algorithmus entwickeln, mit dem ein Chat in
                    „Echtzeit“ abgespielt werden kann, also als ob man anderen
                    beim Chatten zusehen würde
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
                    id={!email ? 'about-email' : ""}
                    onClick={() => getEmail()}
                  >
                    {email
                      ? email
                      : 'Klicke hier, um die Email-Adresse anzuzeigen'}
                  </p>
                </div>
              </Collapse>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <br />
        <div id="about-border"></div>
        <p id="about-update">
          ~ Alle hier veröffentlichten Werke sind urheberrechtlich geschützt ~
        </p>
      </div>
    </Panel>
  )
}

export default About