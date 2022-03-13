import React from 'react'

export default function Button(props: {className?: string, id?: string, handleClick?: any, label: string, type?: any}) {
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
