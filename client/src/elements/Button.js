import React from 'react'

export default function Button(props) {
  return (
    <button
      className={props.className}
      id={props.id}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}
