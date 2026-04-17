export default function QRPanel({ user }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>QR Smart Entry</h3>
        <span>Scan-ready</span>
      </div>
      <div className="qr-box">{user.qrCode}</div>
      <p>Use this pass for gates, booths, and attendance tracking.</p>
    </section>
  );
}