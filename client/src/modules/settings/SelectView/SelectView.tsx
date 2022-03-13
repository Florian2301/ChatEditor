import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js'
import { changeModus, setKeyL, setKeyR } from '../../../redux/actions/user/user.js'
import { StateUser } from '../../../redux/interfaces/interfaces'


const SelectView = (props: {auto: any, desktop: any, tablet: any, mobile: any, id: string}) => {
  // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const modus = e.currentTarget.id
    dispatch(changeModus(modus))
    if (modus === 'auto') {
      props.auto()
      dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'))
      dispatch(setKeyL('userchats'))
    }
    if (modus === 'desktop') {
      props.desktop()
      dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'))
    }
    if (modus === 'tablet') {
      props.tablet()
      dispatch(setKeyL('userchats'))
      dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'))
    }
    if (modus === 'mobile') {
      props.mobile()
      dispatch(setKeyL(!user.loggedIn ? 'settings' : 'login'))
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  return (
    <Form id={props.id}>
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="auto"
        name="modi"
        type="radio"
        id="auto"
        onChange={(e) => handleChange(e)}
        checked={user.modus === 'auto' ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="desktop"
        name="modi"
        type="radio"
        id="desktop"
        onChange={(e) => handleChange(e)}
        checked={user.modus === 'desktop' ? true : false}
        disabled={window.innerWidth <= 1400 ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="tablet"
        name="modi"
        type="radio"
        id="tablet"
        onChange={(e) => handleChange(e)}
        checked={user.modus === 'tablet' ? true : false}
        disabled={window.innerWidth <= 1000 ? true : false}
      />
      <Form.Check
        style={{ fontSize: '12px' }}
        inline
        label="mobile"
        name="modi"
        type="radio"
        id="mobile"
        onChange={(e) => handleChange(e)}
        checked={user.modus === 'mobile' ? true : false}
      />
    </Form>
  )
}


export default SelectView
