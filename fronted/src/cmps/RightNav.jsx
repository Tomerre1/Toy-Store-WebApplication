import React from 'react';
import { NavLink } from 'react-router-dom';
export const RightNav = ({ open, toggleOpen, user, onLogout }) => {
  return (
    <ul className={`right-nav ${open ? 'open' : ''}`} >
      <NavLink onClick={toggleOpen} exact to="/">Home</NavLink>
      {user && <NavLink onClick={toggleOpen} to="/user">Profile</NavLink>}
      <NavLink onClick={toggleOpen} to="/toy">Toys</NavLink>
      <NavLink onClick={toggleOpen} to="/review">Reviews</NavLink>
      <NavLink onClick={toggleOpen} to="/about">About</NavLink>
      <NavLink onClick={toggleOpen} to="/chart">Chart</NavLink>
      {user && <NavLink onClick={onLogout} to="/login">Logout</NavLink>}
      {!user && <NavLink onClick={toggleOpen} to="/login">Login</NavLink>}
    </ul>
  )
}
