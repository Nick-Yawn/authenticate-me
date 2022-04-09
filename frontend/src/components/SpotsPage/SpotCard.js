import './SpotCard.css';
import { useHistory } from 'react-router-dom';

export default function SpotCard({ spot }) {
  const history = useHistory();

  const imgLink = spot.Images[0]?.url;
  const cardRedirect = e => {
    history.push(`/spots/${spot.id}`)  
  }

  return (
    <div  className="spot-card" 
          onClick={cardRedirect}
    >
      <div className="spot-image"
          style={{ backgroundImage: `url(${imgLink})`}}
      />
      <div className='spot-label'>
        <div className='spot-label-left'>{spot.city + ', ' + spot.country }</div>
        <div className='spot-label-right'>{'\u00A4 ' + Math.round(spot.price) + ' night' }</div>
      </div>
  
    </div>
  )
}
