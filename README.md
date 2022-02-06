Note: To deploy this app on heroku, the package.json file has to be outside of the server folder.

See live demo version on heroku:

http://chat-editor.herokuapp.com/login

About the app

This app is the prototype of my self-developed chat editor. With this editor, anyone can write dialogues in the form of a chat and publish them here. Dialogues are a literary art form that I would like to transfer into a digital form with this editor. In times of messengers and social media, the "chat form" is a common way of expressing oneself. However, with previous online services, it is not possible or not intended to take on more than one speaker role, as these were primarily developed for social communication and interaction.
This chat editor is therefore a platform on which I can "chat with myself", or in other words: on which I can write a digital dialogue.

Technical details

Technical Details
The chat editor has been developed with the MERN stack, i.e. MongoDB as the database, Express as the backend framework, React as the frontend library and Nodejs as the JavaScript runtime environment. The underlying language is JavaScript. Redux was used for state management, the design was implemented with CSS and React bootstrap, and authentication with Firebase.

- MERN (MongoDB, Express, React, Nodejs)
- Javascript
- Redux
- React-Bootstrap and CSS
- Firebase

Concept and Development

The app is my first extensive web application, which I conceptualised and developed myself as part of a self-study. The project has grown organically, i.e. there were always major adjustments and changes in the course of development, because at the beginning I only had a rough idea of how the idea of a chat editor could be implemented technically.

The initial idea was to create a possibility to write and publish dialogues in the form of a chat. The chats should look like what one is used to from messengers such as Whatsapp. They are written from the first-person perspective, i.e. regardless of how many participants take part in a chat, one's own messages are always either on the left or on the right in the message flow. So to make the app look like a group chat, the first participant added is set as the first-order speaker (first-person perspective).

As with other messenger services, it is also possible to reply to individual messages, which then have a reference to each other. The message being replied to then appears in a small extra window above the current message.

The chats are initially written as a draft and are not publicly accessible. At this stage, they can be edited extensively. Content can be edited, messages can be moved or deleted. If necessary, new participants can also be added to a chat or old ones removed. After a chat has been published, it appears on the start page. Only the contents of individual messages can then be changed afterwards, e.g. to correct spelling mistakes. If a chat still needs major revision, it can be saved again as a draft and edited.

The development of the chat editor has continuously changed and adapted with my learning progress in the field of web development. Not only has my ability to implement new functionalities grown, resulting in constant restructuring, but also my ability to, for example, combine and simplify functions and write a clean code.
