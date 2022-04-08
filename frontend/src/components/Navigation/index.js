import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, ModalContext } from '../../context/Modal';
import ProfileButton from './ProfileButton';
import LoginSignupForm from '../LoginSignupForm';
import './Navigation.css';


function Navigation({ isLoaded }){
  const user = useSelector(state => state.session?.user);
  const { showModal, setShowModal } = useContext(ModalContext);


  return (
    <div className="nav-bar">
      <div className="Logo">
        <NavLink exact className="nav-bar-links" to="/">LOGO</NavLink>
      </div> 
      <div className="Search Bar">
        SEARCH BAR
      </div>
      <div className="Profile Links">
        {isLoaded && (<ProfileButton user={user} />)}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          { !user && (<LoginSignupForm />) }
          {  user && (<>New Spot Form</>)
          }
        </Modal>
      )}
    </div>
  );
}

export default Navigation;
