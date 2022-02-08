import React from 'react'
import { connect } from 'react-redux'
import './Popover.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'

export function PopoverHistory(props) {
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

//----------- REDUX ----------------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = {}

let PopoverContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopoverHistory)

export default PopoverContainer
