# Physical Event Experience Assistant

An AI-powered full-stack web application that enhances attendee, organizer, and volunteer experiences in large-scale physical events such as hackathons, fests, expos, and conferences.

## Problem Statement

Large physical events often suffer from fragmented communication, poor venue navigation, overcrowded sessions, limited personalization, weak emergency workflows, and scattered volunteer coordination. Attendees struggle to discover the right sessions and people, organizers lack real-time operational visibility, and volunteers need faster task coordination.

This project solves that by providing a unified event experience platform with smart schedules, AI guidance, density awareness, safety tooling, QR-based movement tracking, networking, and offline-ready attendee support.

## Challenge Alignment

This solution is designed to demonstrate the following evaluation priorities:

- Smart assistant behavior through role-aware AI guidance and dynamic recommendations
- Logical decision-making using user role, interests, session context, and crowd density
- Effective Google Services integration with Firebase-ready data flows and Gemini-compatible AI hooks
- Practical real-world usability for attendees, organizers, and volunteers
- Clean and maintainable code through modular frontend and backend architecture
- Accessible and inclusive UX with responsive layouts, clear forms, and readable interaction patterns

## Approach And Logic

The system is built as a clean full-stack split:

- `frontend/`: Next.js application focused on mobile-first attendee and operations UX.
- `backend/`: Express API server exposing modular endpoints for event intelligence, networking, safety, AI assistance, and volunteer operations.
- `Firebase`: Planned source of truth for authentication, user roles, Firestore documents, and push notifications.
- `AI Services`: Gemini/Dialogflow-ready service layer for chatbot, recommendations, announcement generation, and sentiment analysis.

### Logic Highlights

- Personalized recommendations are derived from user interests and interaction history.
- Trending sessions use lightweight crowd/activity scoring.
- Indoor navigation is simulated through event zones and shortest-path routing.
- Crowd density is estimated from check-ins and can be extended to Firestore live updates.
- Feedback is analyzed through an AI service abstraction with a local fallback.
- Offline mode caches dashboard data and serves a PWA-ready shell.
- Assistant responses adapt to role context so organizers get operational suggestions while attendees get experience-focused help.

## Feature Explanation

### Core Features

- Role-based authentication for Attendees, Organizers, and Volunteers
- Smart dashboard with personalized schedule and quick-glance insights
- Session bookmarking and real-time update-ready notifications
- AI recommendation engine for sessions and trending discovery
- Navigation panel for venue zone visualization and shortest path routing
- AI chatbot assistant for FAQs, location guidance, and support prompts
- Push notification-ready backend APIs for reminders and updates
- Crowd density monitor for busy and quiet zones

### Advanced Features

- QR-based smart entry representation for user movement/check-in flows
- Networking matchmaking based on overlapping interests
- Emergency and safety panel with SOS and nearest help desk guidance
- Feedback collection flow with AI sentiment classification
- Gamification leaderboard with points-based engagement
- Volunteer management panel for task visibility and coordination
- Offline support through cached dashboard data and service worker registration
- Voice assistant support using browser speech APIs
- Smart announcement generation through AI service hooks

## How The System Works

1. A user signs up or logs in with a role.
2. The frontend loads the personalized dashboard from the backend.
3. Sessions, announcements, density data, networking matches, leaderboard data, and volunteer tasks are rendered in one unified interface.
4. AI endpoints support chatbot responses, recommendations, sentiment analysis, and smart announcement drafting.
5. QR check-ins and session interactions can feed crowd tracking, badges, reminders, and analytics.
6. Organizers can extend the existing endpoints to broadcast updates, monitor safety incidents, and coordinate volunteers in real time.

## Folder Structure

```text
.
|-- backend
|   |-- package.json
|   `-- src
|       |-- config
|       |-- controllers
|       |-- data
|       |-- middleware
|       |-- routes
|       |-- services
|       |-- utils
|       `-- server.js
|-- docs
|   `-- api.md
|-- frontend
|   |-- package.json
|   |-- public
|   `-- src
|       |-- app
|       |-- components
|       |-- hooks
|       |-- lib
|       `-- styles
|-- .gitignore
`-- README.md
```

## Assumptions

- Real Firebase, Google Maps, Google Calendar, and Gemini/Dialogflow credentials will be supplied through environment variables.
- The current version includes mock-backed flows so the app can be explored without external credentials.
- Indoor routing is represented as zone-to-zone pathfinding, not a production indoor positioning system.
- Push notification delivery requires FCM setup in a real Firebase project.
- Offline mode currently targets key read scenarios such as schedule access and dashboard continuity.

## Google Services Strategy

- Firebase Authentication can secure sign-in and role-aware access control.
- Cloud Firestore can store live schedules, check-ins, volunteer tasks, crowd updates, and announcements.
- Firebase Cloud Messaging can support reminders, emergency alerts, and real-time updates.
- Gemini can power chat assistance, smart announcements, recommendation refinement, and sentiment summarization.
- Google Maps Platform can extend venue navigation into map-assisted routing.
- Google Calendar can sync bookmarked sessions and attendee schedules.

## Future Scope

- Firestore real-time listeners for live density and announcement streaming
- Production QR scanner and kiosk integration
- Role-specific dashboards and permission enforcement middleware
- Richer recommendation models with collaborative filtering
- Calendar sync to Google Calendar for each user
- Live multilingual chatbot with Gemini or Dialogflow fulfillment
- Beacon or map-overlay based indoor navigation
- Incident escalation workflows and live organizer command center

## Setup Instructions

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api`

## Render Deployment

This repository is configured to deploy on Render as a single web service.

Use these settings:

- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`

In production, the backend server also serves the Next.js frontend:

- App UI: `/`
- API: `/api/*`

You can also deploy directly from the included `render.yaml` Blueprint.

## Environment Variables

### `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### `backend/.env`

```env
PORT=5000
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=
GOOGLE_MAPS_API_KEY=
GOOGLE_CALENDAR_ID=
```

## Testing

The backend includes lightweight automated tests for:

- role-aware dashboard generation
- assistant fallback behavior
- recommendation logic and action summaries

Run:

```bash
cd backend
npm test
```

Or from the repo root:

```bash
npm test
npm run verify
npm run test:e2e
npm run verify:full
```

## Notes

- The current implementation is designed as a strong MVP scaffold with clear extension points.
- The backend falls back to local demo data when Firebase is not configured.
- API details are available in `docs/api.md`.
