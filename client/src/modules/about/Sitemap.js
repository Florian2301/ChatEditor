import React from 'react'
import Panel from '../../elements/Panel'
import './Sitemap.css'

export function Sitemap() {
  return (
    <Panel title="Your guide of this app" id="sitemap-panel-desktop">
      <h2 className="sitemap-para-desktop">History</h2>
      <p className="sitemap-para">
        Under <span className="sitemap-para-inline">"History"</span> you will
        find an introduction about how to use this chat editor. In this section
        i will also post my own chats in the future
      </p>
      <p className="sitemap-para">
        If you click on the title of a chat it will be displayed in{' '}
        <span className="sitemap-para-inline">"Chat"</span>.
      </p>
      <p className="sitemap-para">
        After you clicked the title, the "date" will change to a download link
        where you can download the chat as a PDF document.
      </p>
      <p className="sitemap-para">
        If you hover over the title additional informations about the chat will
        appear: Tags and a brief description of the chat.
      </p>

      <h2 className="sitemap-para-desktop">Userchats</h2>
      <p className="sitemap-para">
        Under <span className="sitemap-para-inline">"Userchats"</span> you can
        publish your own chats. At the moment you can see example dialogues i
        quoted from the great Plato, to see how your chat could look like.
      </p>

      <h2 className="sitemap-para-desktop">Chat</h2>
      <p className="sitemap-para">
        On <span className="sitemap-para-inline">"Chat"</span> the published
        chats will be displayed. When you are logged in, you will write your
        chats in this section as well.
      </p>

      <h2 className="sitemap-para-desktop">Login / Logout</h2>
      <p className="sitemap-para">
        If you like to have a look "inside" the chat editor, to see how to use
        it, you can go to <span className="sitemap-para-inline">"Login"</span>{' '}
        and log in with the given testuser credentials. Feel free to write, edit
        and publish a chat for testing purposes.
      </p>

      <h2 className="sitemap-para-desktop">Drafts</h2>
      <p className="sitemap-para">
        if you log in you can start writing a chat in the{' '}
        <span className="sitemap-para-inline">"Drafts"</span> section.
      </p>
      <p className="sitemap-para">
        First add names (your participants), set a title and click "new chat".
        Afterwards you can start writing your own chat.
      </p>

      <h2 className="sitemap-para-desktop">Publish</h2>
      <p className="sitemap-para">
        Once you are ready to publish you go to{' '}
        <span className="sitemap-para-inline">"Publish"</span> and set a
        "chatnumber" and a "date", then click on "publish chat", your chat will
        be displayed in <span className="sitemap-para-inline">"Userchats"</span>
        .
      </p>

      <h2 className="sitemap-para-desktop">About</h2>
      <p className="sitemap-para">
        On <span className="sitemap-para-inline">"About"</span> you will find a
        short explanation about why i created this app, get more technical
        informations about it and find a link to my github repository to see the
        code.
      </p>
      <br></br>
    </Panel>
  )
}

export default Sitemap
