import './Home.css';

export default function Home() {
  return (
    <div className="body-content">

      <div className="impact-image">RISE ABOVE IT</div>

      <div className="cities">
        <div className="new-york city-panel">
          <div className="new-york-image city-image" />
          <div className="new-york-label city-label">New York</div>
        </div>
        <div className="shanghai city-panel">
          <div className="shanghai-image city-image" />
          <div className="shanghai-label city-label">Shanghai</div>
        </div>
        <div className="los-angeles city-panel">
          <div className="los-angeles-image city-image" />
          <div className="los-angeles-label city-label">Los Angeles</div>
        </div>
        <div className="neo-tokyo city-panel">
          <div className="neo-tokyo-image city-image" />
          <div className="neo-tokyo-label city-label">Neo Tokyo</div>
        </div>
      </div>

      <div className="hosting-ad">Become a host (to humans)</div>

    </div>
  )
}
