export default function VolunteerPanel({ volunteerTasks }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Volunteer Coordination</h3>
        <span>Task board</span>
      </div>
      {volunteerTasks.map((task) => (
        <article className="stack-item" key={task.id}>
          <strong>{task.title}</strong>
          <p>
            {task.assignee} - {task.status}
          </p>
        </article>
      ))}
    </section>
  );
}
