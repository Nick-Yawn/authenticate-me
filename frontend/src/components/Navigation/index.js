import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session?.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-bar-links" to="/login">Log In</NavLink>
        <NavLink className="nav-bar-links" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="nav-bar">
      <div className="Logo">
        LOGO
      </div> 
      <div className="Search Bar">
        SEARCH BAR
      </div>
      <div className="Profile Links">
        <NavLink exact className="nav-bar-links" to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
