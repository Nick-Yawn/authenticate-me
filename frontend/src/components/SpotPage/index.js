import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpot } from '../../store/spots'

export default function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector( state => state.spots?.[id] )  

  useEffect(()=>{
    dispatch(getSpot(id));
  }, [dispatch])
 
  return(
    <>
      {id}
      {JSON.stringify(spot)}
    </>
  )
}
