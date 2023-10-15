import React from 'react'

export default function ButtonCancel({setViewEditForm}) {
  return (
    <button type='button' onClick={() => setViewEditForm(false)}>
      Cancelar
    </button>  ) 
}
