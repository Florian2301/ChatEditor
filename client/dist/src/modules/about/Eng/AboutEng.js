import '../About.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Panel from '../../../elements/Panel/Panel';
import { v4 as uuidv4 } from 'uuid';
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
        const Email = require('../Contact').ContactEmail;
        setEmail(Email);
        setTimeout(() => {
            setEmail(false);
        }, 10000);
    }
    //-------------------------- RETURN -----------------------------------------------------------------------
    return (React.createElement(Panel, { title: "Demo-Version Chat-Editor", id: "about" },
        React.createElement("div", { className: window.innerWidth <= 1000 ? 'about-mobile' : 'about' },
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('about'), "aria-controls": "example-collapse-text", "aria-expanded": about }, "About this chat editor"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: about },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "This chat editor is a platform on which you can create a dialogue for up to six characters that converse with each other within one chat group."),
                                React.createElement("p", null, "This application is a prototype of a self-developed chat editor. Anyone can write dialogues in the form of a chat and publish them. Dialogues are a literary art form that transfer well into digital form. In times of messengers and social media, the \"chat form\" is a common way of expressing oneself. However, with existing chat applications the intention is not to take on more than one speaker role.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('background'), "aria-controls": "example-collapse-text", "aria-expanded": background }, "Background"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: background },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "I have created a way for myself to write philosophical thoughts about life, the self and reality. Dialogues are a suitable form for me to present philosophy in a lively and true-to-life way"),
                                React.createElement("p", null, "My studies in philosophy have had a great impact on my thinking and personality, although I do not intend to pursue a purely academic audience. I am addressing all those who are interested in and enjoy philosophy, self-reflection and an exchange of ideas.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('concept'), "aria-controls": "example-collapse-text", "aria-expanded": concept }, "Concept and development"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: concept },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "This is my first extensive web application, conceptualised and developed as part of self-study. The project has grown organically, with major adjustments and changes in the course of development as I have enhanced my technical knowledge."),
                                React.createElement("p", null, "The initial idea was to create a platform to write and publish dialogues in the form of a chat, being similar in appearance to that of messengers such as Whatsapp. It is possible to reply to individual messages, which have a reference to each other. The message being replied to appears in an extra window above the current message."),
                                React.createElement("p", null, "The chats are initially written as a draft and are not publicly accessible. At this stage content can be edited and messages can be moved or deleted. If necessary, new participants can also be added to a chat or existing ones removed. After a chat has been published it will appear on the start page. Only the chat content itself within individual messages can be edited after publication, e.g. to correct spelling mistakes. If a chat needs major revision it can be saved again as a draft and edited."),
                                React.createElement("p", null, "The development of this chat editor has continuously evolved as I have enhanced my workable knowledge of web development. My ability to implement new functionalities has grown, resulting in ongoing restructuring and simplification of functions with cleaner code.")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('tech'), "aria-controls": "example-collapse-text", "aria-expanded": tech }, "Technical details"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: tech },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "This chat editor has been developed with the MERN stack, i.e. MongoDB as the database, Express as the back end framework, React as the front end library and Nodejs as the JavaScript runtime environment. The underlying language is JavaScript. Redux was used for state management, design was implemented with CSS and React bootstrap, and authentication with Firebase."),
                                React.createElement("p", null,
                                    React.createElement("a", { id: "git", href: "https://github.com/Florian2301/ChatEditor", target: "_blank" }, "The code is viewable on Github.")),
                                React.createElement("br", null),
                                React.createElement("p", null, "- MERN (MongoDB, Express, React, Nodejs)"),
                                React.createElement("p", null, "- Javascript"),
                                React.createElement("p", null, "- Redux"),
                                React.createElement("p", null, "- Typescript"),
                                React.createElement("p", null, "- React-Bootstrap and CSS"),
                                React.createElement("p", null, "- Firebase")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('future'), "aria-controls": "example-collapse-text", "aria-expanded": future }, "Upcoming features"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: future },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", null, "The editor is developed to the extent that it can write, edit and permanently publish chats. However, this is only a prototype of the chat editor, as further modules and functions will be developed."),
                                React.createElement("p", null, "For example:"),
                                React.createElement("p", null, "- search tool (topics, tags)"),
                                React.createElement("p", null, "- links between chats"),
                                React.createElement("p", null, "- external comments on single messages/links to messages"),
                                React.createElement("p", null, "- more writing and editing functions (bold, italic, add pictures)"),
                                React.createElement("p", null, "- usability functions (font-size, background etc.)"),
                                React.createElement("p", null, "- development of an algorithm to \u201Cplay\u201D a chat in real time (as you would watch the protagonists while chatting)")))))),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("div", { className: "about-menu", onClick: () => toggleDetails('contact'), "aria-controls": "example-collapse-text", "aria-expanded": contact }, "Kontakt"),
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-menu" },
                        React.createElement(Collapse, { in: contact },
                            React.createElement("div", { className: "about-details", id: "example-collapse-text" },
                                React.createElement("p", { id: !email ? 'about-email' : "", onClick: () => getEmail() }, email ? email : 'click here to show the email-address')))))),
            React.createElement("br", null),
            React.createElement("div", { id: "about-border" }),
            React.createElement("p", { id: "about-update" }, "~ All works are protected by copyright ~"))));
};
export default About;
//# sourceMappingURL=AboutEng.js.map