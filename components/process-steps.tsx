"use client";

import { useEffect, type ToggleEvent } from "react";

const STEP_IDS = ["step-01", "step-02", "step-03"] as const;

function openHashedStep() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!STEP_IDS.includes(id as (typeof STEP_IDS)[number])) return;
  const element = document.getElementById(id);
  if (element instanceof HTMLDetailsElement) element.open = true;
}

export function ProcessSteps() {
  useEffect(() => {
    openHashedStep();
    window.addEventListener("hashchange", openHashedStep);
    return () => window.removeEventListener("hashchange", openHashedStep);
  }, []);

  const onToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    const details = event.currentTarget;
    if (!details.open || window.location.hash === `#${details.id}`) return;
    const url = new URL(window.location.href);
    url.hash = details.id;
    window.history.pushState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <>
      <details id="step-01" open onToggle={onToggle}>
        <summary>
          <span>01</span>
          <h3>Find the opportunity</h3>
          <b aria-hidden="true"></b>
        </summary>
        <p>
          We look at your existing site, your audience, and what visitors need to do. You get a clear view of what’s
          working and what needs to change.
        </p>
      </details>
      <details id="step-02" onToggle={onToggle}>
        <summary>
          <span>02</span>
          <h3>Give it a new direction</h3>
          <b aria-hidden="true"></b>
        </summary>
        <p>
          We shape the structure, messaging, and visual direction around your business. Review the design before we move
          into the rebuild.
        </p>
      </details>
      <details id="step-03" onToggle={onToggle}>
        <summary>
          <span>03</span>
          <h3>Build. Refine. Hand over.</h3>
          <b aria-hidden="true"></b>
        </summary>
        <p>
          We build for phones, tablets, and desktop, check the core journeys, and prepare your site for launch. Scope,
          timing, and ongoing support are agreed together.
        </p>
      </details>
    </>
  );
}
