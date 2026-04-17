export default function HeroOverview({ user, announcements }) {
  const highlight = announcements[0];

  return (
    <section className="hero">
      <div className="card hero-primary">
        <p className="eyebrow">Today at a glance</p>
        <h2>{user.nextSession.title}</h2>
        <p>
          {user.nextSession.time} at {user.nextSession.location}
        </p>
        <div className="hero-metrics">
          <span>{user.stats.bookmarks} bookmarks</span>
          <span>{user.stats.points} points</span>
          <span>{user.stats.connections} connections</span>
        </div>
      </div>
      <div className="card hero-secondary">
        <p className="eyebrow">Smart announcement</p>
        <h3>{highlight.title}</h3>
        <p>{highlight.message}</p>
      </div>
    </section>
  );
}
