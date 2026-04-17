export default function TopBar({ user }) {
  return (
    <header className="topbar card">
      <div>
        <p className="eyebrow">Physical Event Experience Assistant</p>
        <h1>{user.eventName}</h1>
      </div>
      <div className="topbar-user">
        <span className="role-chip">{user.role}</span>
        <div>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
        </div>
      </div>
    </header>
  );
}
