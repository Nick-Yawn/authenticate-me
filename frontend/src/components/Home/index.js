import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSpotToEdit } from '../../store/spotToEdit';
import { ModalContext } from '../../context/Modal';

import './Home.css';

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setShowModal } = useContext(ModalContext); 
 
  const redirectToSpots = e => {
    history.push('/spots')
  } 

  const redirectWithParams = params => e => {
    history.push(`/spots?q=${params}`)
  }

  const openModal = e => {
    dispatch(setSpotToEdit(null));
    setShowModal(true)
  }

  return (
    <div className="home-body-content">

      <div className="impact-image" onClick={redirectToSpots}>RISE ABOVE IT</div>

      <div className="cities">
        <div className="sub-cities">
          <div className="new-york city-panel" onClick={redirectWithParams("New York")}>
            <div className="new-york-image city-image" />
            <div className="new-york-label city-label">New York</div>
          </div>
          <div className="shanghai city-panel" onClick={redirectWithParams("Shanghai")}>
            <div className="shanghai-image city-image" />
            <div className="shanghai-label city-label">Shanghai</div>
          </div>
        </div>
        <div className="sub-cities"> 
          <div className="los-angeles city-panel" onClick={redirectWithParams("Los Angeles")}>
            <div className="los-angeles-image city-image" />
            <div className="los-angeles-label city-label">Los Angeles</div>
          </div>
          <div className="neo-tokyo city-panel" onClick={redirectWithParams("Tokyo")}>
            <div className="neo-tokyo-image city-image" />
            <div className="neo-tokyo-label city-label">Neo Tokyo</div>
          </div>
        </div>
      </div>

      <div onClick={openModal} className="hosting-ad">
        <div className="host" id="host-1"/>
        <div className="host" id="host-2"/>
        <div className="host" id="host-3"/>
        <div className="host" id="host-4"/>
        <div className="host" id="host-5"/>
        <div className="host" id="host-6"/>
        <div className="host" id="host-7"/>
        <div className="host" id="host-8"/>
        <div className="host" id="host-9"/>
        <div className="host" id="host-10"/>
        <div className="hosts-label">Become a host (to humans)</div>
      </div>

    </div>
  )
}
