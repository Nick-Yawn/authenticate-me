import { useParams, Prompt, useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot, deleteSpot } from '../../store/spots'
import { getSessionUser } from '../../store/session';
import { ModalContext } from '../../context/Modal';
import { setSpotToEdit } from '../../store/spotToEdit';

import './SpotPage.css';

export default function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setShowModal } = useContext(ModalContext);
  const spot = useSelector( state => state.spots?.[id] )
  const user = useSelector( state => state.session?.user )

  useEffect(()=>{
    dispatch(getSpot(id));
  }, [dispatch])

  const openEditModal = e => {
    setShowModal(true);
    dispatch(setSpotToEdit(spot));
  }

  const deleteButtonFunc = async e => {
    const success = await dispatch(deleteSpot(id));
    if( success ){ 
      dispatch(getSessionUser());    
      history.push('/my-spots')
    } else { 
      alert('Unable to delete spot. Please try again later.')
    }
  } 

  const toggleFavorite = async e => {

  }

  const previewImages = [];
  if( spot?.Images ){
    for( let i = 0 ; i < 5 ; i++ ){
      if( spot.Images[i] ){
        previewImages.push( spot.Images[i] )
      }
    }
  }


  return(
      <div className="spot-body-content">
        <div className='spot-images'>
          { previewImages.map( (img, i)  => (
          <div
            key={i}
            className="spot-preview-image"
            style={{ backgroundImage: `url(${img.url})` }}
            id={`image-${i}`}
          />)) } 
        </div> 
      { spot && (
        <div className="mid">
          <div className="mid-left">
            <div className="host-info spot-info">Hosted by: {spot.User?.username}</div>
            <div className="description spot-info">{spot.description}</div>
            <div className="amenities spot-info">
              <div className="spot-amenities-label">Amenities:</div>
              <div className="spot-amenities-list">
                { spot?.Amenities && Object.values(spot.Amenities).map( (a, i) => ( 
                  <div key={i} className="spot-amenity">
                    <i className={a.iconClass}/>
                    {a.name}
                  </div>
                ))} 
              </div>
            </div>

          </div>
          <div className="mid-right">
            <div className="booking-box">
              { spot.user_id !== user?.id && (
              <>
                <div className="booking-text">Booking</div>
                <div className="booking-text">feature</div>
                <div className="booking-text">coming</div>
                <div className="booking-text">soon!</div>
              </>
              )}
              { spot.user_id === user?.id && (
                <>
                <div className="booking-text controls-header">Manage</div>
                <div className="booking-text">your</div>
                <div className="booking-text">spot</div>
                  <div className="host-info host-controls"> 
                    <button className="control-button edit-button" onClick={openEditModal}>Edit Spot</button>
                    <button className="control-button delete-button" onClick={deleteButtonFunc}>Delete Spot</button>
                  </div>
                </>  
              )}
            </div>
          </div>

        </div>
        )}
      </div>
  )
}
