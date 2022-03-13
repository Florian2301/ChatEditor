import React from 'react'
import './Popover.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'

export function PopoverChat(props: {date: string, tags: string, description: string}) {
  const date = props.date
  const tags = props.tags
  const description = props.description

  const popover = (
    <Popover id="popover" className="fade-in-popover">
      <Popover.Header id="popover-header">{tags ? tags : null}</Popover.Header>
      <Popover.Body id="popover-body">
        {description ? description : null}
      </Popover.Body>
    </Popover>
  )

  const InfoPopover = () => (
    <OverlayTrigger
      trigger={['click', 'focus']}
      placement={window.innerWidth <= 1000 ? 'left' : 'right'}
      overlay={popover}
    >
      <p id="popover-title">{date}</p>
    </OverlayTrigger>
  )

  return (
    <div>
      <InfoPopover />
    </div>
  )
}

export default PopoverChat
