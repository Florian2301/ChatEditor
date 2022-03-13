import React, { useState } from 'react';
import '../About.css';
import { v4 as uuidv4 } from 'uuid';
import Panel from '../../../elements/Panel/Panel.js';
import { Collapse } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const About = () => {
    // useState
    const [about, setAbout] = useState(true);
    const [tech, setTech] = useState(false);
    const [background, setBackground] = useState(false);
    const [concept, setConcept] = useState(false);
    const [future, setFuture] = useState(false);
    const [contact, setContact] = useState(false);
    const [email, setEmail] = useState(false);
    function toggleDetails(key) {
        key === 'about' ? setAbout(!about) : setAbout(false);
        key === 'tech' ? setTech(!tech) : setTech(false);
        key === 'background' ? setBackground(!background) : setBackground(false);
        key === 'concept' ? setConcept(!concept) : setConcept(false);
        key === 'future' ? setFuture(!future) : setFuture(false);
        key === 'contact' ? setContact(!contact) : setContact(false);
    }
    function getEmail() {
        const Email = require('../Contact.js').ContactEmail;
        setEmail(Email);
        setTimeout(() => {
            setEmail(false);
        }, 10000);
    }
    //-------------------------- RETURN -----------------------------------------------------------------------
    return (React.createElement(Panel, { title: "Demo-Version Chat-Editor", id: "about" },
        React.createElement("div", { className: window.innerWidth <= 1000 ? 'about-mobile' : 'about' },
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('about'), "aria-controls": "example-collapse-text", "aria-expanded": about }, "\u00DCber den Chat-Editor"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: about },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "Dieser Chat-Editor ist eine Plattform auf der man Dialoge mit bis zu sechs Charakteren schreiben kann, die in einer Chatgruppe miteinander interagieren."),
                                React.createElement("p", null, "Diese App ist der Prototyp eines selbst entwickelten Chat-Editors. Jeder kann mit diesem Dialoge in Form eines Chats schreiben und ver\u00F6ffentlichen. Dialoge sind eine literarische Kunstform, die gut in eine digitale Form \u00FCberf\u00FChrt werden k\u00F6nnen. In Zeiten von Messengern und Social Media ist die \u201EChatform\u201C eine gel\u00E4ufige Art, sich auszudr\u00FCcken. Jedoch ist es bei bisherigen Online-Diensten nicht vorgesehen, mehr als eine Sprecherrolle einzunehmen.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('background'), "aria-controls": "example-collapse-text", "aria-expanded": background }, "Hintergrund"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: background },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "Mit dieser App habe ich mir eine M\u00F6glichkeit geschaffen, meine philosophischen Gedanken \u00FCber das Leben, das Selbst und die Wirklichkeit niederzuschreiben. Dialoge sind f\u00FCr mich eine geeignete Form, Philosophie lebendig und lebensnah zu pr\u00E4sentieren."),
                                React.createElement("p", null, "Mein Studium der Philosophie hat mich in meinem Denken und meiner Pers\u00F6nlichkeit sehr gepr\u00E4gt, wobei ich mich nicht an ein rein akademisches Publikum wende, sondern an alle diejenigen, die an Philosophie, Selbstreflexion und einem Gedankenaustausch Interesse und ihre Freude haben.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('concept'), "aria-controls": "example-collapse-text", "aria-expanded": concept }, "Konzeption und Entwicklung"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: concept },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "Die App ist meine erste umfangreiche Webanwendung, die ich im Rahmen eines Selbststudiums selbst konzeptioniert und entwickelt habe. Das Projekt ist organisch gewachsen, d.h. es kam es immer wieder zu gr\u00F6\u00DFeren Anpassungen und Ver\u00E4nderungen w\u00E4hrend der Entwicklung."),
                                React.createElement("p", null, "Die Idee war zun\u00E4chst, eine Plattform zu schaffen, Dialoge in Form eines Chats schreiben und ver\u00F6ffentlichen zu k\u00F6nnen. Dabei sollen sie aussehen wie man es von Messengern wie z.B. Whatsapp gewohnt ist. Auch hier kann man auf einzelne Nachrichten antworten, die dann einen Bezug zueinander haben. Die Nachricht, auf die geantwortet wird, erscheint dann in einem kleinen Fenster \u00FCber der aktuellen Nachricht."),
                                React.createElement("p", null, "Die Chats werden zun\u00E4chst als Entwurf geschrieben und sind \u00F6ffentlich nicht zug\u00E4nglich. In diesem Stadium lassen sie sich Inhalte bearbeiten, Nachrichten verschieben oder l\u00F6schen. Gegebenenfalls k\u00F6nnen auch neue Teilnehmer zu einem Chat hinzugef\u00FCgt bzw. alte entfernt werden. Nach der Ver\u00F6ffentlichung eines Chats erscheinen diese auf der Startseite, wobei dann nur noch die Inhalte einzelner Nachrichten ver\u00E4ndert werden k\u00F6nnen, z.B. um Rechtschreibfehler zu korrigieren. Wenn ein Chat dennoch einer gr\u00F6\u00DFeren \u00DCberarbeitung bedarf, kann er wieder als Entwurf gespeichert und bearbeitet werden."),
                                React.createElement("p", null, "Die Entwicklung des Chat-Editors hat sich laufend an meinen Lernfortschritt im Bereich der Webentwicklung angepasst. Das Wachsen meiner F\u00E4higkeit, neue Funktionalit\u00E4ten zu implementieren, f\u00FChrte zu gr\u00F6\u00DFeren Umstrukturierungen sowie meine F\u00E4higkeit, Funktionen zu vereinfachen und den Code \u201Esauber\u201C zu schreiben, f\u00FChrte vielerorts zu einer Neufassung des bestehenden Codes.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('tech'), "aria-controls": "example-collapse-text", "aria-expanded": tech }, "Technische Details"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: tech },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "Der Chat-Editor ist mit dem MERN-Stack entwickelt worden, d.h. MongoDB als Datenbank, Express als Backend-Framework, React als Frontend-Library und Nodejs als JavaScript Laufzeitumgebung. Die zugrundeliegende Sprache ist JavaScript. Als State Management wurde Redux verwendet, das Design mit CSS und React-Bootstrap umgesetzt und die Authentifizierung mit Firebase."),
                                React.createElement("p", null,
                                    "Der Code kann",
                                    ' ',
                                    React.createElement("a", { id: "git", href: "https://github.com/Florian2301/ChatEditor", target: "_blank" }, "hier auf Github"),
                                    ' ',
                                    "eingesehen werden."),
                                React.createElement("br", null),
                                React.createElement("p", null, "- MERN (MongoDB, Express, React, Nodejs)"),
                                React.createElement("p", null, "- Javascript"),
                                React.createElement("p", null, "- Redux"),
                                React.createElement("p", null, "- React-Bootstrap und CSS"),
                                React.createElement("p", null, "- Firebase")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('future'), "aria-controls": "example-collapse-text", "aria-expanded": future }, "Ausblick"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: future },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "Der Editor ist so weit entwickelt, um Chats schreiben zu k\u00F6nnen, zu bearbeiten und dauerhaft zu ver\u00F6ffentlichen. Jedoch befindet sich die Anwendung noch in der Entwicklungsphase und ist nur als Prototyp verf\u00FCgbar, weitere Module und Funktionen werden noch entwickelt."),
                                React.createElement("p", null, "Zum Beispiel:"),
                                React.createElement("p", null, "- eine Suchfunktion (Themen, Stichworte)"),
                                React.createElement("p", null, "- eine Verlinkung der Chats untereinander"),
                                React.createElement("p", null, "- externe Kommentare zu einzelnen Nachrichten bzw. Verlinkung zu den Nachrichten"),
                                React.createElement("p", null,
                                    "- weitere Funktionen beim Schreiben von Nachrichten (fett, kursiv, Bilder einf\u00FCgen)",
                                    ' '),
                                React.createElement("p", null, "- benutzerspezifische Einstellungen (Schriftgr\u00F6\u00DFe, Hintergrund etc)"),
                                React.createElement("p", null, "- einen Algorithmus entwickeln, mit dem ein Chat in \u201EEchtzeit\u201C abgespielt werden kann, also als ob man anderen beim Chatten zusehen w\u00FCrde")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('contact'), "aria-controls": "example-collapse-text", "aria-expanded": contact }, "Kontakt"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: contact },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", { id: !email ? 'about-email' : "", onClick: () => getEmail() }, email
                                    ? email
                                    : 'Klicke hier, um die Email-Adresse anzuzeigen')))))),
            React.createElement("br", null),
            React.createElement("div", { id: "about-border" }),
            React.createElement("p", { id: "about-update" }, "~ Alle hier ver\u00F6ffentlichten Werke sind urheberrechtlich gesch\u00FCtzt ~"))));
};
export default About;
//# sourceMappingURL=AboutGer.js.map