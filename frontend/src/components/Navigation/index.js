import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session?.user);


  return (
    <div className="nav-bar">
      <div className="Logo">
        <NavLink exact className="nav-bar-links" to="/">LOGO</NavLink>
      </div> 
      <div className="Search Bar">
        SEARCH BAR
      </div>
      <div className="Profile Links">
        {isLoaded && (<ProfileButton user={sessionUser} />)}
      </div>
    </div>
  );
}

export default Navigation;
