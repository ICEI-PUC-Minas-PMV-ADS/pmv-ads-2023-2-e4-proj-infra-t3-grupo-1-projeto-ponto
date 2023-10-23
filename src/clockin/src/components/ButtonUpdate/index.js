import React from 'react'
import {BiSolidEditAlt} from "react-icons/bi"

export default function ButtonUpdate({setViewEditForm}) {
  return (
    <button onClick={() => setViewEditForm(true)}>
      <BiSolidEditAlt/>
    </button>  )
}
