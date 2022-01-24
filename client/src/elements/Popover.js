import React from 'react'
import { connect } from 'react-redux'
import './Popover.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'

export function PopoverHistory(props) {
  const title = props.title
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
      trigger={['hover', 'focus']}
      placement={'top'}
      overlay={popover}
    >
      <p>{title}</p>
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
