import React from 'react';

export default function FAQ() {
  return (
    <section className="faq-section container" id="faqSection" aria-labelledby="faqHeading">
      <h2 className="section-heading" id="faqHeading">Frequently Asked Questions</h2>
      <div className="faq-list">
        <details className="faq-item">
          <summary>Where is the problem statement data sourced from?</summary>
          <p>All problem statements are pulled directly from official sih.gov.in releases under CC BY 4.0 license.</p>
        </details>
        <details className="faq-item">
          <summary>How does CSI Student Chapter analyze these statements?</summary>
          <p>Our academic and industry mentors break down each statement into technical feasibility, invention effort scores, evaluator questions, and hour-by-hour build plans.</p>
        </details>
        <details className="faq-item">
          <summary>What do the Green, Yellow, and Red verdict indicators mean?</summary>
          <p>🟢 Green indicates high feasibility and clear scope. 🟡 Yellow means workable with specific technical constraints. 🔴 Red indicates high technical risk or heavy competition.</p>
        </details>
      </div>
    </section>
  );
}
