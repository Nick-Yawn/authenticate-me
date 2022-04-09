import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'
import SpotCard from './SpotCard';

export default function SpotsPage({select}) {
  const dispatch = useDispatch();  
  const { search }  = useLocation();
  const spots = useSelector( state => state.spots )
  
  useEffect(() => {
    dispatch(getSpots(select, search));
  }, [dispatch, select]) 

  return (
    <div className="body-content">
      <h1>{ }</h1>
      {spots && Object.keys(spots).map( key => (
        <SpotCard spot={spots[key]} key={key} />
      ))}
    </div>
  )
}

