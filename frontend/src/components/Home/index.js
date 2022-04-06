import { useHistory } from 'react-router-dom';

import './Home.css';

export default function Home() {
  const history = useHistory();
  
  const redirectToSpots = e => {
    history.push('/spots')
  } 

  const redirectWithParams = params => e => {
    history.push(`/spots?q=${params}`)
  }

  return (
    <div className="body-content">

      <div className="impact-image" onClick={redirectToSpots}>RISE ABOVE IT</div>

      <div className="cities">
        <div className="new-york city-panel" onClick={redirectWithParams("New York")}>
          <div className="new-york-image city-image" />
          <div className="new-york-label city-label">New York</div>
        </div>
        <div className="shanghai city-panel" onClick={redirectWithParams("Shanghai")}>
          <div className="shanghai-image city-image" />
          <div className="shanghai-label city-label">Shanghai</div>
        </div>
        <div className="los-angeles city-panel" onClick={redirectWithParams("Los Angeles")}>
          <div className="los-angeles-image city-image" />
          <div className="los-angeles-label city-label">Los Angeles</div>
        </div>
        <div className="neo-tokyo city-panel" onClick={redirectWithParams("Neo Tokyo")}>
          <div className="neo-tokyo-image city-image" />
          <div className="neo-tokyo-label city-label">Neo Tokyo</div>
        </div>
      </div>

      <div className="hosting-ad">Become a host (to humans)</div>

    </div>
  )
}
