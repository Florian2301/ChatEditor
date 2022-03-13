import React from 'react'
import './EmojiPicker.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const EmojiPicker = (props: any) => {
  function addEmoji(e: any) {
    let emoji = e.native
    props.getEmoji(emoji)
  }

  const popover = (
    <Popover className="fade-in-picker" id="emoji-picker">
      <Popover.Body>
        <Picker onSelect={addEmoji} showPreview={false} showSkinTones={false} />
      </Popover.Body>
    </Popover>
  )

  const InfoPopover = () => (
    <OverlayTrigger
      trigger={['click']}
      placement={window.innerWidth <= 767 ? 'top' : 'right'}
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


export default EmojiPicker
