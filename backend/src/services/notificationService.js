export async function registerNotificationToken(payload) {
  return {
    success: true,
    ...payload
  };
}

export async function createReminder(payload) {
  return {
    success: true,
    reminder: {
      title: `Reminder for ${payload.sessionTitle}`,
      body: `Your session starts in ${payload.minutesBefore} minutes.`
    }
  };
}