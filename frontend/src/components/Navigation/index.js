import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, ModalContext } from '../../context/Modal';
import ProfileButton from './ProfileButton';
import LoginSignupForm from '../LoginSignupForm';
import SpotForm from '../SpotForm';
import './Navigation.css';


function Navigation({ isLoaded }){
  const history = useHistory();
  const user = useSelector(state => state.session?.user);
  const { showModal, setShowModal } = useContext(ModalContext);

  const redirectToHome = e => {
    history.push('/')
  };

  const redirectToAllSpots = e => {
    history.push('/spots')
  }

  return (
    <div className="nav-bar">

      <div className="nav-bar-left nav-bar-section">

        <div className="logo" onClick={redirectToHome}>
          <div className="logo-text-upper">NIGHT CITY</div>
          <div className="logo-text-lower">bed &nbsp;n &nbsp;breakfast</div>
        </div> 

        <div className="all-spots-link" onClick={redirectToAllSpots}>
          All Spots
        </div>

      </div>    

      <div className="nav-bar-right nav-bar-section">
        <div className="Search Bar">
          {/*SEARCH BAR*/}
        </div>      
        <div className="Profile Links">
          {isLoaded && (<ProfileButton user={user} />)}
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            { !user && (<LoginSignupForm />) }
            {  user && (<SpotForm />)
            }
          </Modal>
        )}
      </div>

    </div>
  );
}

export default Navigation;
