import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, ModalContext } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './ProfileButton.css' 
import LoginSignupForm from '../LoginSignupForm';

function ProfileDropdown({ user }){
  const dispatch = useDispatch();
  const history = useHistory();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [ showMenu, setShowMenu ] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const redirectToTrips = e => {
    history.push('/trips') 
  }

  const redirectToWishlist = e => {
    history.push('/favorites') 

  }

  const openHostForm = e => {
    alert('pretend theres a form here')
  }

  const redirectToUserSpots = e => {
    history.push('/bookings') 
  }

  return (
          <ul className="profile-dropdown">
          { user && (
            <>
              <li className='dropdown-user'> {user?.username} </li>
              <li className='dropdown-clickable'
                onClick={redirectToTrips}> Trips </li>
              <li className='dropdown-clickable'
                onClick={redirectToWishlist}> Wishlist </li>
              <li className='dropdown-clickable'
                onClick={openHostForm}> Host Your Home </li>
              {user.spots?.length > 0 && (
                <li className='dropdown-clickable'
                  onClick={redirectToUserSpots}> My Spots </li>
              )}
              <li className='dropdown-clickable'
                 onClick={logout}> Logout </li>
            </>        
          )}
          { !user && (
            <>
              <li className='dropdown-clickable' 
                onClick={()=>setShowModal(true)}> Login </li>
              <li className='dropdown-clickable'
                onClick={()=>setShowModal(true)}> Sign Up </li>
            </>
          )}
          </ul>
        )
}

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { showModal, setShowModal } = useContext(ModalContext);
   
  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };
 
  useEffect(() => {
    if (showMenu){
      const closeMenu = () => {
        setShowMenu(false);
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [showMenu]);


  return (
    <>
      <div onClick={openMenu} className="profile-hamburger">
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user"></i>
      </div>
      {showMenu && (<ProfileDropdown user={user} />)}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginSignupForm />
        </Modal>
      )}
    </>
  );
}

export default ProfileButton;
