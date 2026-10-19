import { EnquiryForm } from "@/components/enquiry-form";
import { ProcessSteps } from "@/components/process-steps";

export function Approach() {
  return (
    <section className="approach-section wrap" id="approach" aria-labelledby="approach-title">
      <div className="approach-intro">
        <p className="eyebrow">02 / A THOUGHTFUL WAY FORWARD</p>
        <h2 id="approach-title">
          A fresh start.
          <br />
          <em>Without the guesswork.</em>
        </h2>
        <p>From the first look at your current website to a site you’re proud to share. One small team, with you throughout.</p>
      </div>
      <div className="approach-grid">
        <div className="process">
          <ProcessSteps />
          <div className="included">
            <span>THE FOUNDATIONS</span>
            <p>
              Responsive design <i>+</i> Clear page structure <i>+</i> Essential page metadata <i>+</i> Launch handover
            </p>
          </div>
        </div>
        <div className="contact-card" id="start">
          <div className="contact-card-head">
            <span className="contact-spark" aria-hidden="true">
              ↗
            </span>
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
          </div>
          <h3>
            Let’s look at
            <br />
            <em>your website.</em>
          </h3>
          <p>Tell us where you are now, and what you want your website to do next.</p>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
