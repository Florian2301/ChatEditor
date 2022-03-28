import { Form, Row } from 'react-bootstrap'
import React, { useState } from 'react'

import { StateUser } from '../../../redux/interfaces/interfaces'
import { selectLanguage } from '../../../redux/actions/user/user'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector'
import { v4 as uuidv4 } from 'uuid'

const Language = () => {
  // useState
  const [select, setSelect] = useState<string>('deutsch')
  
  // state
  const dispatch = useDispatch()
  const user: StateUser = useTypedSelector((state) => state.user)

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelect(event.target.value)
    dispatch(selectLanguage(event.target.value))
  }

  // -----------------------------------------------------------------------------------

  return (
    <div className="switch">
      <Form>
        <Form.Group as={Row}>
          <select
            className="options-language-select"
            value={select}
            onChange={handleChange}
          >
            {user.selectLanguage.map((lang: string) => {
              return (
                <option value={lang} key={uuidv4()}>
                  {lang}
                </option>
              )
            })}
          </select>
        </Form.Group>
      </Form>
    </div>
  )
}


export default Language
