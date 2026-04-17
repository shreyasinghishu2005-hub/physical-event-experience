export default function CrowdPanel({ density }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Crowd Density</h3>
        <span>Check-in driven</span>
      </div>
      {density.map((zone) => (
        <div className="inline-stat" key={zone.zone}>
          <span>{zone.zone}</span>
          <strong>{zone.status}</strong>
        </div>
      ))}
    </section>
  );
}