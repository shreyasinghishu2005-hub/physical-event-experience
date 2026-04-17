export default function AnnouncementPanel({ announcements }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Smart Announcements</h3>
        <span>AI assisted</span>
      </div>
      {announcements.map((notice) => (
        <article className="stack-item" key={notice.id}>
          <strong>{notice.title}</strong>
          <p>{notice.message}</p>
        </article>
      ))}
    </section>
  );
}