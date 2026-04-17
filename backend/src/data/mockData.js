export const users = [
  {
    id: "demo-user-1",
    name: "Aarav Mehta",
    email: "aarav@example.com",
    role: "attendee",
    interests: ["ai", "web", "product"],
    eventName: "FutureFest 2026",
    qrCode: "QR-DEMO-1A9B",
    nextSession: {
      title: "Designing AI-Native Products",
      time: "11:00 AM",
      location: "Hall A"
    },
    stats: {
      bookmarks: 6,
      points: 320,
      connections: 12
    }
  }
];

export const sessions = [
  {
    id: "session-1",
    title: "Designing AI-Native Products",
    time: "11:00 AM",
    location: "Hall A",
    track: "AI/Product",
    interests: ["ai", "product"],
    crowdScore: 89
  },
  {
    id: "session-2",
    title: "Scaling Next.js Experiences",
    time: "12:00 PM",
    location: "Tech Dome",
    track: "Web",
    interests: ["web"],
    crowdScore: 73
  },
  {
    id: "session-3",
    title: "Founder Networking Circle",
    time: "02:00 PM",
    location: "Lounge C",
    track: "Networking",
    interests: ["product", "networking"],
    crowdScore: 81
  }
];

export const announcements = [
  {
    id: "announcement-1",
    title: "Hall B start time shifted by 10 minutes",
    message: "AI-generated summary: Please proceed calmly. Volunteers are guiding attendees to updated entry points."
  },
  {
    id: "announcement-2",
    title: "Lunch counters opened in Zone Green",
    message: "Crowd load is lower near the east food court."
  }
];

export const density = [
  { zone: "Hall A", count: 120, status: "high" },
  { zone: "Tech Dome", count: 82, status: "medium" },
  { zone: "Lounge C", count: 34, status: "low" },
  { zone: "Food Court", count: 49, status: "low" }
];

export const navigationGraph = {
  Entrance: ["Registration", "Help Desk"],
  Registration: ["Entrance", "Hall A", "Tech Dome"],
  "Help Desk": ["Entrance", "Medical Bay"],
  "Hall A": ["Registration", "Lounge C"],
  "Tech Dome": ["Registration", "Food Court"],
  "Lounge C": ["Hall A", "Food Court"],
  "Food Court": ["Tech Dome", "Lounge C"],
  "Medical Bay": ["Help Desk"]
};

export const matches = [
  {
    id: "match-1",
    name: "Riya Kapoor",
    commonInterests: ["ai", "product"]
  },
  {
    id: "match-2",
    name: "Kunal Sharma",
    commonInterests: ["web"]
  }
];

export const volunteerTasks = [
  {
    id: "task-1",
    title: "Support Hall A seating",
    assignee: "Volunteer Neha",
    status: "active"
  },
  {
    id: "task-2",
    title: "Check QR scanners at Gate 2",
    assignee: "Volunteer Aman",
    status: "queued"
  }
];

export const notifications = [
  {
    id: "notification-1",
    title: "Reminder",
    body: "Your bookmarked session starts in 15 minutes."
  },
  {
    id: "notification-2",
    title: "Volunteer Update",
    body: "Gate 3 flow has normalized."
  }
];

export const leaderboard = [
  { id: "lead-1", name: "Aarav", points: 320 },
  { id: "lead-2", name: "Riya", points: 300 },
  { id: "lead-3", name: "Kunal", points: 260 }
];