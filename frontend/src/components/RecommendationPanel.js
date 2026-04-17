export default function RecommendationPanel({ recommendations }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>AI Recommendations</h3>
        <span>Interests + activity</span>
      </div>
      {recommendations.sessions.map((item) => (
        <article className="stack-item" key={item.id}>
          <strong>{item.title}</strong>
          <p>{item.reason}</p>
        </article>
      ))}
      <div className="panel-divider" />
      <h4>Trending right now</h4>
      {recommendations.trending.map((item) => (
        <div className="inline-stat" key={item.id}>
          <span>{item.title}</span>
          <strong>{item.score}</strong>
        </div>
      ))}
    </section>
  );
}
