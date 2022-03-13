import React from 'react'
import './Panel.css'


export default function Panel(props: {id: string, title: string, children: any}) {
  return (
    <div className="panel" id={props.id}>
      <h3 className="panel-title">{props.title}</h3>
      <div className="panel-content">{props.children}</div>
    </div>
  )
}
