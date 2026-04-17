export default function GamificationPanel({ leaderboard }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Gamification</h3>
        <span>Leaderboard</span>
      </div>
      {leaderboard.map((entry) => (
        <div className="inline-stat" key={entry.id}>
          <span>{entry.name}</span>
          <strong>{entry.points}</strong>
        </div>
      ))}
    </section>
  );
}