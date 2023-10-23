import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBaarLink({to, children}) {
  return (
    <NavLink to={to}>{children}</NavLink>
  )
}
