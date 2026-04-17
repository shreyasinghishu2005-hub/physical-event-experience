export default function FeedbackPanel({ feedbackSummary }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h3>Feedback Sentiment</h3>
        <span>AI summary</span>
      </div>
      <div className="inline-stat">
        <span>Positive</span>
        <strong>{feedbackSummary.positive}%</strong>
      </div>
      <div className="inline-stat">
        <span>Neutral</span>
        <strong>{feedbackSummary.neutral}%</strong>
      </div>
      <div className="inline-stat">
        <span>Negative</span>
        <strong>{feedbackSummary.negative}%</strong>
      </div>
    </section>
  );
}