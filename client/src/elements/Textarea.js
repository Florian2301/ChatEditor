import React from 'react'
import './Textarea.css'

/**
 * textarea for writing the message in chat
 */
export default function Textarea(props) {
  return (
    <div>
      <textarea
        className="textarea-write"
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus
        onKeyDown={props.onKeyDown}
      ></textarea>
    </div>
  )
}
