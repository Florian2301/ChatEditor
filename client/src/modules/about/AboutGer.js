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
            Über diese App
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
                    Diese App ist der Prototyp meines selbst entwickelten
                    Chat-Editors. Mit diesem Editor kann jeder Dialoge in Form
                    eines Chats schreiben und hier veröffentlichen. Dialoge sind
                    eine literarische Kunstform, die ich mit diesem Editor in
                    eine digitale Form überführen möchte. In Zeiten von
                    Messengern und Social Media ist die „Chatform“ eine
                    geläufige Art, sich zu auszudrücken. Jedoch ist es bei
                    bisherigen Online-Diensten nicht möglich bzw. nicht
                    vorgesehen, mehr als eine Sprecherrolle einzunehmen, da
                    diese vornehmlich zur sozialen Kommunikation und Interaktion
                    entwickelt wurden
                  </p>
                  <p>
                    Dieser Chat-Editor ist daher eine Plattform, auf der ich
                    „mit mir selber chatten“ kann, oder in anderen Worten: auf
                    der ich einen digitalen Dialog schreiben kann.
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
                    meine eigenen philosophischen Gedanken über das Leben, das
                    Selbst und die Wirklichkeit niederzuschreiben. Dialoge sind
                    für mich eine geeignete Form, Philosophie lebendig und
                    lebensnah zu präsentieren.
                  </p>
                  <p>
                    Mein Studium der Philosophie hat mich in meinem Denken und
                    meiner Persönlichkeit sehr geprägt, wobei ich hier nicht
                    beabsichtige, eine rein akademische Philosophie zu betreiben
                    noch mich an ein rein akademisches Publikum zu wenden. Im
                    Gegenteil, ich wende mich an alle diejenigen, die an
                    Philosophie, Selbstreflexion und einem Gedankenaustausch
                    Interesse und ihre Freude haben.
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
                    Veränderungen im Laufe der Entwicklung, da ich am Anfang nur
                    eine grobe Vorstellung davon hatte, wie sich die Idee eines
                    Chat-Editors technisch umsetzen lässt.
                  </p>
                  <p>
                    Die Idee war zunächst, eine Möglichkeit zu schaffen, Dialoge
                    in Form eines Chats schreiben und veröffentlichen zu können.
                    Die Chats sollten so aussehen wie man es von Messengern wie
                    z.B. Whatsapp gewohnt ist. Sie werden aus der
                    Ich-Perspektive geschrieben, d.h unabhängig davon, wie viele
                    Teilnehmer in einem Chat teilnehmen, die eigenen Nachrichten
                    stehen immer entweder links oder rechts in dem
                    Nachrichtenfluss. Um die App also wie einen Gruppenchat
                    aussehen zu lassen, wird der erste hinzugefügte Teilnehmer
                    als Sprecher erster Ordnung gesetzt (Ich-Perspektive).
                  </p>
                  <p>
                    Wie bei anderen Messenger-Diensten lässt sich auch hier auf
                    einzelne Nachrichten antworten, die dann einen Bezug
                    zueinander haben. Die Nachricht, auf die geantwortet wird,
                    erscheint dann in einem kleine Extra-Fenster über der
                    aktuellen Nachricht.
                  </p>
                  <p>
                    Die Chats werden zunächst als Entwurf geschrieben und sind
                    öffentlich nicht zugänglich. In diesem Stadium lassen sie
                    sich umfangreich bearbeiten. Es können Inhalte bearbeitet,
                    Nachrichten verschoben oder gelöscht werden. Gegebenenfalls
                    können auch neue Teilnehmer zu einem Chat hinzugefügt bzw.
                    alte entfernt werden. Nach der Veröffentlichung eines Chats
                    erscheinen diese auf der Startseite, wobei dann nachträglich
                    nur noch die Inhalte einzelner Nachrichten verändert werden
                    können, z.B. um Rechtschreibfehler zu korrigieren. Wenn ein
                    Chat dennoch einer größeren Überarbeitung bedarf, kann er
                    wieder als Entwurf gespeichert und bearbeitet werden.
                  </p>
                  <p>
                    Die Entwicklung des Chat-Editors hat sich laufend mit meinem
                    Lernfortschritt im Bereich der Webentwicklung verändert und
                    angepasst. Nicht nur, dass meine Fähigkeit, neue
                    Funktionalitäten zu implementieren, gewachsen ist und damit
                    ständig Umstrukturierungen vorgenommen wurden, sondern auch
                    meine Fähigkeit, z.B. Funktionen zusammenzufassen und zu
                    vereinfachen und den Code „sauber“ zu schreiben. Einen
                    Überblick über die verwendete Technologie und einen Link zu
                    dem Code findet sich im nächsten Abschnitt „Technische
                    Details“.
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
                    Der gesamte Code kann{' '}
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
                    Der Editor ist vom Umfang her so weit entwickelt, um Chats
                    schreiben können, zu bearbeiten und dauerhaft zu
                    veröffentlichen. Jedoch handelt es sich bislang nur um einen
                    Prototyp des Chat-Editors, weitere Module und Funktionen
                    möchte ich noch entwickeln. Hier sind ein paar Beispiele:
                  </p>

                  <p>
                    - weitere Funktionen beim Schreiben von Nachrichten (fett,
                    kursiv, Bilder einfügen){' '}
                  </p>
                  <p>- Schriftgröße, Hintergrund etc. anpassen</p>
                  <p>- eine Suchfunktion (Themen, Stichworte) </p>
                  <p>
                    - eine Verlinkung der Chats untereinander (um thematische
                    Bezüge herzustellen)
                  </p>
                  <p>
                    - externe Kommentare zu einzelnen Nachrichten bzw.
                    Verlinkung zu den Nachrichten
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
                    id={!email ? 'about-email' : null}
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
