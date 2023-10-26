import React from 'react'
import {BiSolidEditAlt} from "react-icons/bi"

import styles from './index.module.css'

export default function ButtonUpdate({setViewEditForm}) {
  return (
    <button data-cy="update" className={styles.buttonUpdate} onClick={() => setViewEditForm(true)}>
      <BiSolidEditAlt/>
    </button>  )
}
