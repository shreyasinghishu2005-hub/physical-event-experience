export default function NetworkingPanel({ networking }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Networking</h3>
        <span>Matchmaking</span>
      </div>
      {networking.matches.map((match) => (
        <article className="stack-item" key={match.id}>
          <strong>{match.name}</strong>
          <p>{match.commonInterests.join(", ")}</p>
          <button type="button">Connect</button>
        </article>
      ))}
    </section>
  );
}