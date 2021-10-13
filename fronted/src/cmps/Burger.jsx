import React from 'react';
import { RightNav } from './RightNav';


export function Burger({ open, toggleOpen, user, onLogout }) {
  return (
    <>
      <div className={`burger ${open ? 'open' : ''}`} onClick={toggleOpen}>
        <div className={`burgers ${open ? 'open' : ''}`} />
        <div className={`burgers ${open ? 'open' : ''}`} />
        <div className={`burgers ${open ? 'open' : ''}`} />
      </div>
      <RightNav open={open} toggleOpen={toggleOpen} onLogout={onLogout} user={user} />
    </>
  )
}


