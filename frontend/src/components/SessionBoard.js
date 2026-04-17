export default function SessionBoard({ schedule }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Smart Schedule</h3>
        <span>Offline-ready</span>
      </div>
      <div className="session-list">
        {schedule.map((session) => (
          <article className="session-item" key={session.id}>
            <div>
              <strong>{session.title}</strong>
              <p>
                {session.time} - {session.location}
              </p>
            </div>
            <div className="session-meta">
              <span>{session.track}</span>
              <button type="button">Bookmark</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
