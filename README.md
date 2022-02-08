Note: To deploy this app on heroku, the package.json file has to be outside of the server folder.

See live demo version on heroku:

http://chat-editor.herokuapp.com/login

About the application

This application is a prototype of my self-developed chat editor. With this editor, anyone can write dialogues in the form of a chat and publish them here. Dialogues are a literary art form that I would like to transfer into a digital form. In times of messengers and social media, the "chat form" is a common way of expressing oneself. However, with existing online services the intention is not to take on more than one speaker role, as these are primarily developed for social communication and interaction. This chat editor is therefore a platform on which I can "chat with myself", or in other words: on which I can write a digital dialogue.

Technical details

The chat editor has been developed with the MERN stack, i.e. MongoDB as the database, Express as the back end framework, React as the front end library and Nodejs as the JavaScript runtime environment. The underlying language is JavaScript. Redux was used for state management, the design was implemented with CSS and React bootstrap, and authentication with Firebase.

- MERN (MongoDB, Express, React, Nodejs)
- Javascript
- Redux
- React-Bootstrap and CSS
- Firebase

Concept and Development

This is my first extensive web application, conceptualised and developed as part of self-study. The project has grown organically, with major adjustments and changes in the course of development as I have enhanced my technical knowledge.

The initial idea was to create a platform to write and publish dialogues in the form of a chat, being similar in appearance to that of messengers such as Whatsapp. They are written in the first-person perspective, i.e. regardless of how many participants take part in a chat, one's own messages are always either on the left or right in the message flow. Thus, to make the app look like a group chat the first participant added is set as the first-order speaker (first-person perspective).

As with other messenger services, it is possible to reply to individual messages, which then have a reference to each other. The message being replied to then appears in an extra window above the current message.

The chats are initially written as a draft and are not publicly accessible. At this stage content can be edited and messages can be moved or deleted. If necessary, new participants can also be added to a chat or existing ones removed. After a chat has been published it will appear on the start page. Only the chat content itself within individual messages can be edited after publication, e.g. to correct spelling mistakes. If a chat needs major revision it can be saved again as a draft and edited.

The development of the chat editor has continuously evolved as I have enhanced my workable knowledge of web development. My ability to implement new functionalities has grown, resulting in ongoing restructuring and simplification of functions with cleaner code.
