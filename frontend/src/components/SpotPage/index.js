import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot } from '../../store/spots'
import { ModalContext } from '../../context/Modal';
import { setSpotToEdit } from '../../store/spotToEdit';

export default function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setShowModal } = useContext(ModalContext);
  const spot = useSelector( state => state.spots?.[id] )
  const user = useSelector( state => state.session?.user )

  useEffect(()=>{
    dispatch(getSpot(id));
  }, [dispatch])

  const openEditModal = async e => {
    setShowModal(true);
    dispatch(setSpotToEdit(spot));
  }

  return(
    <>
      {JSON.stringify(spot)}
      { spot?.user_id === user?.id && (<button onClick={openEditModal}>Edit</button>)}
    </>
  )
}
