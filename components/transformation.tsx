"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { clampCompare, withComparison, type Device } from "@/lib/comparison";

type TransformationProps = {
  initialDevice: Device;
  initialCompare: number;
};

export function Transformation({ initialDevice, initialCompare }: TransformationProps) {
  const [device, setDevice] = useState(initialDevice);
  const [split, setSplit] = useState(initialCompare);
  const rangeRef = useRef<HTMLInputElement>(null);
  const deviceRef = useRef(device);
  const splitRef = useRef(split);
  const dragging = useRef(false);
  const pushed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<{ device: Device; split: number } | null>(null);

  const scheduleUrl = (nextDevice: Device, nextSplit: number) => {
    pending.current = { device: nextDevice, split: nextSplit };
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = pending.current;
      pending.current = null;
      if (!next) return;
      const href = withComparison(window.location.href, next.device, next.split);
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (href === current) return;
      if (pushed.current) window.history.replaceState({ comparison: true }, "", href);
      else {
        window.history.pushState({ comparison: true }, "", href);
        pushed.current = true;
      }
    }, 120);
  };

  const updateSplit = (rawValue: unknown) => {
    const value = clampCompare(rawValue);
    if (rangeRef.current) rangeRef.current.value = String(value);
    if (value === splitRef.current) return;
    splitRef.current = value;
    setSplit(value);
    scheduleUrl(deviceRef.current, value);
  };

  const moveComparison = (clientX: number) => {
    const range = rangeRef.current;
    if (!range) return;
    const rect = range.getBoundingClientRect();
    if (!rect.width) return;
    updateSplit(((clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    const onPop = () => {
      pushed.current = false;
      if (timer.current) clearTimeout(timer.current);
      pending.current = null;
      const url = new URL(window.location.href);
      const compare = url.searchParams.get("compare");
      const nextDevice = url.searchParams.get("device") === "mobile" ? "mobile" : "desktop";
      const nextSplit = compare === null ? 50 : clampCompare(compare);
      deviceRef.current = nextDevice;
      splitRef.current = nextSplit;
      if (rangeRef.current) rangeRef.current.value = String(nextSplit);
      setDevice(nextDevice);
      setSplit(nextSplit);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLInputElement>) => {
    // Preserve vertical touch scrolling; horizontal dragging reveals the redesign.
    if (event.button !== 0 && event.pointerType !== "touch") return;
    event.preventDefault();
    const range = rangeRef.current;
    if (!range) return;
    range.focus({ preventScroll: true });
    dragging.current = true;
    try {
      range.setPointerCapture(event.pointerId);
    } catch {
      // Some browsers reject capture for this pointer; movement still updates the split.
    }
    moveComparison(event.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  const chooseDevice = (nextDevice: Device) => {
    if (nextDevice === deviceRef.current) return;
    deviceRef.current = nextDevice;
    setDevice(nextDevice);
    scheduleUrl(nextDevice, splitRef.current);
  };

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THE TRANSFORMATION</p>
            <h2 id="work-title">
              The same business.
              <br />
              <em>A whole new feeling.</em>
            </h2>
          </div>
          <p>A stronger website starts with seeing the potential in what’s already there. Move the slider to explore our redesign concept.</p>
        </div>
        <div className="case-toolbar">
          <div className="case-name">
            <span className="case-monogram" aria-hidden="true">
              L.
            </span>
            <div>
              <h3>Linden & Co.</h3>
              <p>Interior design studio · Concept project</p>
            </div>
          </div>
          <div className="view-toggle" role="group" aria-label="Preview size">
            <button type="button" data-device="desktop" aria-pressed={device === "desktop"} onClick={() => chooseDevice("desktop")}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <rect x="2" y="3" width="16" height="11" rx="1" />
                <path d="M7 17h6M10 14v3" />
              </svg>
              <span>Desktop</span>
            </button>
            <button type="button" data-device="mobile" aria-pressed={device === "mobile"} onClick={() => chooseDevice("mobile")}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <rect x="5" y="2" width="10" height="16" rx="2" />
                <path d="M9 15h2" />
              </svg>
              <span>Mobile</span>
            </button>
          </div>
        </div>
        <div className="comparison-stage" data-device={device}>
          <div className="comparison" id="comparison" style={{ "--split": `${split}%` } as CSSProperties}>
            <div className="compare-chrome">
              <span className="window-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span>lindenandco.example</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="site-scene before-scene" aria-hidden="true">
              <div className="before-banner">
                <span>LINDEN & CO.</span>
                <small>Interior Design Services</small>
              </div>
              <div className="before-nav">Home &nbsp; | &nbsp; About Us &nbsp; | &nbsp; Our Services &nbsp; | &nbsp; Gallery &nbsp; | &nbsp; Contact Us</div>
              <div className="before-body">
                <h4>Welcome to Linden & Co.!</h4>
                <p>We provide a wide range of quality interior design services for all your requirements.</p>
                <img src="/assets/courtyard.jpg" alt="" width={1800} height={1200} />
                <div className="before-bottom">
                  <div>
                    <b>About our company</b>
                    <p>Welcome to our website. Please browse our services and contact us for more information.</p>
                  </div>
                  <span>
                    CLICK HERE
                    <br />
                    TO CONTACT US
                  </span>
                </div>
              </div>
            </div>
            <div className="site-scene after-scene" aria-hidden="true">
              <div className="after-nav">
                <b>linden & co.</b>
                <span>
                  Our spaces &nbsp; The studio &nbsp; <u>Start a project ↗</u>
                </span>
              </div>
              <div className="after-hero">
                <div className="after-copy">
                  <span className="micro">INTERIORS, WITH INTENTION.</span>
                  <h4>
                    Space for
                    <br />
                    <em>living well.</em>
                  </h4>
                  <p>We create thoughtful interiors that feel like you. Considered from the first conversation to the final detail.</p>
                  <span className="after-button">
                    Explore our spaces <b>↗</b>
                  </span>
                </div>
                <div className="after-image">
                  <img src="/assets/courtyard.jpg" alt="" width={1800} height={1200} />
                  <span>THE OAK HOUSE &nbsp; ↗</span>
                </div>
              </div>
              <div className="after-foot">
                <span>
                  HOMES WITH CHARACTER.
                  <br />
                  SPACES WITH PURPOSE.
                </span>
                <p>
                  Good design is a conversation.
                  <br />
                  Let’s start yours.
                </p>
                <span>↓</span>
              </div>
            </div>
            <span className="comparison-label label-before" hidden={split > 96} aria-hidden="true">
              BEFORE
            </span>
            <span className="comparison-label label-after" hidden={split < 4} aria-hidden="true">
              AFTER
            </span>
            <div className="comparison-divider" hidden={split === 0 || split === 100} aria-hidden="true">
              <span>
                ‹<i></i>›
              </span>
            </div>
            <p id="comparison-description" className="sr-only">
              Before: a crowded, generic welcome page with small imagery and a buried contact link. After: a clear interiors headline, generous project imagery, and a prominent project enquiry. Both are fictional concepts.
            </p>
            <label htmlFor="comparison-range" className="sr-only">
              Reveal redesigned website. 0 shows before, 100 shows after.
            </label>
            <input
              ref={rangeRef}
              id="comparison-range"
              className="comparison-range"
              type="range"
              min={0}
              max={100}
              defaultValue={initialCompare}
              aria-describedby="comparison-description"
              aria-valuetext={`${split} percent redesigned website revealed`}
              onChange={(event) => updateSplit(event.target.value)}
              onPointerDown={onPointerDown}
              onPointerMove={(event) => {
                if (dragging.current) moveComparison(event.clientX);
              }}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
              onLostPointerCapture={stopDragging}
            />
          </div>
        </div>
        <div className="compare-controls">
          <p>
            <span aria-hidden="true">↔</span> Drag to compare <span className="keyboard-hint">· Arrow keys work too</span>
          </p>
          <div role="group" aria-label="Comparison view">
            <button type="button" data-compare="0" aria-pressed={split === 0} onClick={() => updateSplit(0)}>
              Before
            </button>
            <button type="button" data-compare="50" aria-pressed={split === 50} onClick={() => updateSplit(50)}>
              Split view
            </button>
            <button type="button" data-compare="100" aria-pressed={split === 100} onClick={() => updateSplit(100)}>
              After
            </button>
          </div>
        </div>
        <div className="case-details">
          <p className="case-disclaimer">
            An original, fictional concept to show our thinking.
            <br />
            No client relationship or performance results implied.
          </p>
          <div>
            <span className="detail-number">01</span>
            <h3>A story you understand</h3>
            <p>A focused headline, a distinct identity, and an immediate sense of what the studio does.</p>
          </div>
          <div>
            <span className="detail-number">02</span>
            <h3>Work that does the talking</h3>
            <p>Generous imagery and a clear hierarchy let the interiors take center stage.</p>
          </div>
          <div>
            <span className="detail-number">03</span>
            <h3>A clear next step</h3>
            <p>A visible project enquiry guides interested visitors toward a conversation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
