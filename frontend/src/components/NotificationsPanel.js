export default function NotificationsPanel({ notifications }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Notifications</h3>
        <span>Realtime reminders</span>
      </div>
      {notifications.map((notice) => (
        <article className="stack-item" key={notice.id}>
          <strong>{notice.title}</strong>
          <p>{notice.body}</p>
        </article>
      ))}
    </section>
  );
}