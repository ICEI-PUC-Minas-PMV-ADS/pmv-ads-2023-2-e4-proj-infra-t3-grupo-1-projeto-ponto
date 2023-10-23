import React from 'react'

export default function InputForm({value, changeValue, required, type, placeholder, label}) {
  const editPlaceHolder =  `${placeholder}...`

  function onChange(event){
    changeValue(event.target.value)
  }

  return (
    <div>
      <label>{label}</label> 
      <input value={value} onChange={onChange} required={required} type={type} placeholder={editPlaceHolder}/>
    </div>
  )
}
