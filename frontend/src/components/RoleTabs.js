const roles = ["Attendee", "Organizer", "Volunteer"];

export default function RoleTabs() {
  return (
    <div className="role-tabs">
      {roles.map((role) => (
        <button className="role-tab" key={role} type="button">
          {role}
        </button>
      ))}
    </div>
  );
}
