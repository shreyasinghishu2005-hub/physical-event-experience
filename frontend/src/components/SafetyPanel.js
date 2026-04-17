export default function SafetyPanel() {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Emergency & Safety</h3>
        <span>Help desk routing</span>
      </div>
      <button type="button" className="sos-button">
        Send SOS Alert
      </button>
      <p>Nearest help desk: Medical Bay 1, 2 minutes away.</p>
    </section>
  );
}