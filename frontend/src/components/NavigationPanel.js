export default function NavigationPanel({ navigation }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Smart Navigation</h3>
        <span>Venue routing</span>
      </div>
      <div className="map-grid">
        {navigation.zones.map((zone) => (
          <div className={`zone zone-${zone.density}`} key={zone.id}>
            <strong>{zone.name}</strong>
            <span>{zone.density}</span>
          </div>
        ))}
      </div>
      <div className="route-box">
        <p>Best path</p>
        <strong>{navigation.route.join(" -> ")}</strong>
      </div>
    </section>
  );
}
