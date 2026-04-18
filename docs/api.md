# API Documentation

Base URL: `http://localhost:5000/api`

## Health

### `GET /health`

Returns server status.

## Auth

### `POST /auth/signup`

Creates a user profile with role metadata.

### `POST /auth/login`

Authenticates a user and returns a demo token fallback when Firebase Auth is not configured.

## Event

### `GET /event/dashboard/:userId`

Returns dashboard data including schedule, recommendations, announcements, crowd density, notifications, volunteer tasks, and leaderboard preview.

Optional query params:

- `name`
- `email`
- `role`
- `interests` as a comma-separated list

These values let the assistant adapt dashboard decisions to the current user context.

### `GET /event/sessions`

Returns event sessions.

### `POST /event/bookmarks`

Creates or removes a bookmark.

### `POST /event/check-in`

Records a QR or manual check-in.

### `GET /event/navigation`

Query params: `from`, `to`

## AI

### `POST /ai/chat`

Answers event questions.

Expected body:

```json
{
  "question": "Is Hall A crowded right now?",
  "language": "en",
  "user": {
    "role": "attendee",
    "interests": ["ai", "product"]
  }
}
```

### `POST /ai/recommendations`

Returns recommended sessions and people matches.

Expected body:

```json
{
  "user": {
    "role": "organizer",
    "interests": ["operations", "community"]
  }
}
```

### `POST /ai/sentiment`

Analyzes feedback sentiment.

### `POST /ai/announcements`

Generates an AI-assisted announcement.

## Notifications

### `POST /notifications/register`

Registers an FCM token.

### `POST /notifications/reminder`

Builds reminder payloads.

## Safety

### `POST /safety/sos`

Creates an SOS alert.

### `GET /safety/help-desks`

Returns nearby help desk information.

## Volunteers

### `GET /volunteers/tasks`

Returns volunteer tasks.

### `POST /volunteers/tasks`

Creates or updates a task.

## Networking

### `GET /networking/matches/:userId`

Returns networking suggestions.

### `POST /networking/connect`

Creates a connection request.

## Feedback

### `POST /feedback`

Submits feedback and sentiment.

## Gamification

### `GET /gamification/leaderboard`

Returns leaderboard standings.
