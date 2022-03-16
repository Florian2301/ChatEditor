import React from 'react'

export default function Button(props: {className?: string, id?: string, handleClick?: any, label: string, type?: any, disabled?: boolean}) {
  return (
    <button
      disabled={props.disabled}
      className={props.className}
      id={props.id}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}
