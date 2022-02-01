Note: To deploy this app on heroku, the package.json file has to be outside of the server folder.

Its a MERN stack app, means I use MongoDB as my database, express as middleware, React as framework library and node.js as runtime environment for javascript. Additionally I use Redux for state management, firebase for authorization, react-bootstrap for styling some parts (e.g. for forms) and react hooks.

For React hooks and refs you can find examples in:

    client/src/modules/editchats/EditChats.js

or for general usage of javascript within react: -/tables/Chatlist.js

For my state management you find examples in:

    client/src/redux/actions/chat.js

and:

    redux/reducers/chatReducer.js.

An example for the firebase authorization you find in:

    client/src/authorization/updateProfile.js

Routes for the database you can find in:

    server/routes/api/userChats.js

Models for the database are in e.g.:

    server/models/Chat.js

This is a demoversion for a free online chat editor for writing texts/dialogues in form of a chat and same time a platform to publish those texts. I always wanted to write down my own philosophical ideas, but couldn't find the right way to bring them on paper. Finally in 2019 I thought about writing in form of dialogues to express my thoughts. So I decided to create my own online chat editor and a platform to publish the chats.

At the beginning of 2020 I started to teach myself programming to become a web developer and building this app. This MERN stack single page application is my first project I have launched. I am using this one as a part of my job applications.

I do not follow any commercial purposes with this app.

See live demo on heroku (might take a few seconds to load, its free hosting on heroku):

http://chat-editor.herokuapp.com/login
