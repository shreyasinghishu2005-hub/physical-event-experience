"use client";

import { useState } from "react";
import { askChatbot } from "@/lib/api";

export default function ChatAssistant() {
  const [question, setQuestion] = useState("Where is Hall A?");
  const [reply, setReply] = useState("Ask the assistant about sessions, locations, safety, or announcements.");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    try {
      const data = await askChatbot(question);
      setReply(data.answer);
    } catch (error) {
      setReply("The assistant is offline right now. Please check the help desk map.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card panel panel-wide">
      <div className="panel-header">
        <h3>AI Chatbot Assistant</h3>
        <span>FAQ + multilingual</span>
      </div>
      <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={3} />
      <button type="button" onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask Assistant"}
      </button>
      <p className="assistant-reply">{reply}</p>
    </section>
  );
}