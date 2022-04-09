import { useParams, Prompt, useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot, deleteSpot } from '../../store/spots'
import { getSessionUser } from '../../store/session';
import { ModalContext } from '../../context/Modal';
import { setSpotToEdit } from '../../store/spotToEdit';

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

  return(
    <>
      {JSON.stringify(spot)}
      { spot?.user_id === user?.id && (<button onClick={openEditModal}>Edit</button>)}
      { spot?.user_id === user?.id && (<button onClick={deleteButtonFunc}>Delete</button>)}
    </>
  )
}
