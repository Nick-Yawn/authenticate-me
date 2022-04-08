import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, ModalContext } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './ProfileButton.css' 


function ProfileDropdown({ user }){
  const dispatch = useDispatch();
  const history = useHistory();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [ showMenu, setShowMenu ] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
          <ul className="profile-dropdown">
          { user && (
            <>
              <li> {user?.email} </li>
              <li> {user?.username} </li>
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
      {showModal && (<Modal onClose={() => setShowModal(false)}>
        Modal Test
      </Modal>)
      }
    </>
  );
}

export default ProfileButton;
