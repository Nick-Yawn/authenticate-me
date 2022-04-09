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
          style={{ backgroundImage: `url(${imgLink})`}} 
    >
      {spot.city} 
    </div>
  )
}
