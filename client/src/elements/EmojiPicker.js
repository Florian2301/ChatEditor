import React from 'react'
import { connect } from 'react-redux'
import './EmojiPicker.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export function EmojiPicker(props) {
  function addEmoji(e) {
    let emoji = e.native
    props.getEmoji(emoji)
  }

  const popover = (
    <Popover className="fade-in-picker" id="emoji-picker">
      <Popover.Content>
        <Picker onSelect={addEmoji} showPreview={false} showSkinTones={false} />
      </Popover.Content>
    </Popover>
  )

  const InfoPopover = () => (
    <OverlayTrigger
      trigger={['click']}
      placement={window.innerWidth <= 767 ? 'bottom' : 'right'}
      overlay={popover}
    >
      <p className="emojipicker">Add emoji</p>
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

let Emoji = connect(mapStateToProps, mapDispatchToProps)(EmojiPicker)

export default Emoji
