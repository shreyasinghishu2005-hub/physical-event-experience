const helpDesks = [
  { id: "help-1", name: "Help Desk Central", location: "Registration" },
  { id: "help-2", name: "Medical Bay 1", location: "Medical Bay" }
];

export function getHelpDesks() {
  return helpDesks;
}

export function createSosAlert(payload) {
  return {
    success: true,
    escalationLevel: "high",
    nearestHelpDesk: helpDesks[1],
    ...payload
  };
}