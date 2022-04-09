import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'
import SpotCard from './SpotCard';

export default function SpotsPage() {
  const dispatch = useDispatch();  
  const spots = useSelector( state => state.spots )
  
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]) 

  return (
    <div className="body-content">
      {spots && Object.keys(spots).map( key => (
        <SpotCard spot={spots[key]} key={key} />
      ))}
    </div>
  )
}
