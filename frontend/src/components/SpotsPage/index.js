import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSpots } from '../../store/spots'

export default function SpotsPage() {
  const dispatch = useDispatch();  
  const spots = useSelector( state => state.spots )
  
  useEffect(() => {
    dispatch(setSpots());
  }, [dispatch]) 

  console.log("spots: ", spots);

  return (
    <div className="body-content">
      {spots && Object.keys(spots).forEach(key => {
        const spot = spots[key];
        return (
          <div key={key}>
            test
          </div>
        )})

      } 
    </div>
  )
}
