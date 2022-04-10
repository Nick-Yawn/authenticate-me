import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'
import SpotCard from './SpotCard';

import './SpotsPage.css'

export default function SpotsPage({select}) {
  const dispatch = useDispatch();  
  const { search }  = useLocation();
  const spots = useSelector( state => state.spots )
  const [ stateLoaded, setStateLoaded ] = useState(false);

  // this prevents the old state from ghosting the favorites / my-spots / spots page
  useEffect(() => {
    const asyncFunc = async () => {
      setStateLoaded(false);
      await dispatch(getSpots(select, search));
      setStateLoaded(true);
    }
    asyncFunc();
  }, [dispatch, select]) 

  return (
    <div className="spots-body-content">
      <h1>{ }</h1>
      {spots && stateLoaded && Object.keys(spots).map( key => (
        <SpotCard spot={spots[key]} key={key} />
      ))}
    </div>
  )
}

