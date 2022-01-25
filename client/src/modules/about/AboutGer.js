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

  function createEmail() {
    let email1 = 'flokrates'
    let email2 = 'online'
    let email3 = 'gmail.com'
    setEmail(email1 + '.' + email2 + '@' + email3)

    setTimeout(() => {
      setEmail(false)
    }, 10000)
  }

  //-------------------------- RETURN -----------------------------------------------------------------------
  return (
    <Panel title="Demo-Version Chat-Editor" id="about">
      <div className="about">
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
                    Diese App ist eine Demo-Version meines selbst entwickelten
                    Chat-Editors. Mit diesem Editor kann jeder Dialoge in Form
                    eines Chats schreiben und hier veröffentlichen. Dialoge sind
                    eine literarische Kunstform, die ich mit diesem Editor in
                    eine digitale Form überführen möchte. In Zeiten von
                    Messengern und Social Media ist die „Chatform“ eine
                    geläufige Art, sich zu auszudrücken. Jedoch ist es bei
                    bisherigen Online-Diensten nicht möglich bzw. nicht
                    vorgesehen, mehr als eine Sprecherrolle einzunehmen, da
                    diese vornehmlich zur sozialen Kommunikation und Interaktion
                    entwickelt wurden.
                  </p>
                  <p>
                    Dieser Chat-Editor ist daher eine Möglichkeit, mit „sich
                    selbst zu chatten“, oder in anderen Worten: einen digitalen
                    Dialog zu schreiben.
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
                    Seit vielen Jahren möchte ich meine philosophischen Gedanken
                    über das Leben, das Selbst und die Wirklichkeit
                    niederschreiben, habe aber nie die richtige Form gefunden,
                    in der ich mich ausdrücken kann. In meinen Gedanken waren es
                    schon immer Dialoge, die stattgefunden haben, mal mit mir
                    selber, mal mit realen oder erfundenen Personen. Mir ist
                    bewusst, dass dies meine eigene spezielle Weise des Denkens
                    ist, an der ich jetzt andere teilhaben lassen möchte.
                  </p>
                  <p>
                    Mein Studium der Philosophie an der Universität hat mich in
                    meinem Denken und meiner Persönlichkeit sehr geprägt, wobei
                    ich hier aber nicht den Anspruch vertrete, eine rein
                    akademische Philosophie zu betreiben. Ich möchte auch von
                    Nicht-Akademikern verstanden werden und wende mich an alle
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
                    Die Konzeptionierung und Entwicklung des Chat-Editors hat
                    sich laufend mit meinem Lernfortschritt im Bereich der
                    Webentwicklung verändert und angepasst. Eine grobe Idee
                    davon, wie der Editor am Ende aussehen soll, hatte ich
                    bereits von Anfang an. Jedoch ergab sich im Laufe der
                    Entwicklung der App eine immer größer werdende
                    Ausdifferenzierung der einzelnen Schritte zum Schreiben
                    eines Chats.
                  </p>
                  <p>
                    Darunter waren zum Beispiel die getrennte Behandlung von
                    Entwürfen (drafts) und veröffentlichten Chats (chats). Aber
                    auch die Frage, inwieweit können oder sollen veröffentlichte
                    Chats noch verändert werden? Rechtschreibfehler korrigieren
                    ist ok, aber keine weiteren Texte schreiben bzw.
                    Protagonisten hinzufügen. Für diesen Fall gibt es die
                    Möglichkeit, den Chat wieder als Entwurf zu speichern und
                    dann nach erfolgter Bearbeitung wieder zu veröffentlichen.
                  </p>
                  <p>
                    Die App ist ein gewachsenes Projekt, welches immer wieder zu
                    Umstrukturierungen, Veränderungen und Anpassungen führte.
                    Zum Beispiel war das Statemanangement nach einigen Monaten
                    sehr aufgebläht und unübersichtlich geworden. Dies führte zu
                    einem wichtigen Prozess bei der Entwicklung, nämlich der
                    Vereinfachung und Zusammenfassung von Funktionen und
                    Prozessen.
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
                    d.h. MongoDB als Datenbank, Express als Backend, React als
                    Frontend und Nodejs als Entwicklungsumgebung. Die
                    zugrundeliegende Sprache ist Javascript. Als Statemanagement
                    habe ich REDUX verwendet und das Design mit CSS und
                    React-Bootstrap umgesetzt.
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
                    veröffentlichen. Jedoch fehlen mir noch weiterführende
                    Funktionen. Hier sind ein paar Beispiele, um die ich den
                    Editor in Zukunft noch ergänzen möchte:
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
                    onClick={() => createEmail()}
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
