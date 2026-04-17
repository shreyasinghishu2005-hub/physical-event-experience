"use client";

import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export default function VoiceAssistantPanel() {
  const { supported, listening, transcript, startListening, speak } = useVoiceAssistant();

  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Voice Assistant</h3>
        <span>Hands-free support</span>
      </div>
      <p>{supported ? transcript || "Say: Show next session" : "Voice features unavailable in this browser."}</p>
      <div className="action-row">
        <button type="button" onClick={startListening} disabled={!supported || listening}>
          {listening ? "Listening..." : "Start Voice Command"}
        </button>
        <button type="button" onClick={() => speak("Your next session starts at 11:00 AM in Hall A.")}>
          Read Next Session
        </button>
      </div>
    </section>
  );
}