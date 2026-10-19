export function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot"></span> A SMALL STUDIO. A FRESH PERSPECTIVE.
        </p>
        <h1 id="hero-title">
          Good business.
          <br />
          Outgrown
          <br />
          <em>your website?</em>
        </h1>
        <p className="hero-description">
          We redesign and rebuild outdated websites into clear, considered experiences that make your next customer feel
          in the right place.
        </p>
        <div className="hero-actions">
          <a className="button" href="#start">
            Get a website review <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#work">
            See the difference <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="quiet-note">A fresh perspective on your current site. No hard sell.</p>
      </div>
      <div className="hero-art" aria-label="A website transformation concept for a fictional interior design studio">
        <div className="art-grid" aria-hidden="true"></div>
        <div className="orbit-label" aria-hidden="true">
          <span>THOUGHTFULLY</span>
          <b>↗</b>
          <span>REIMAGINED</span>
        </div>
        <div className="hero-window">
          <div className="window-chrome">
            <span className="window-dots">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>lindenandco.example</span>
            <span className="chrome-lock" aria-hidden="true">
              ⌁
            </span>
          </div>
          <div className="mini-site">
            <div className="mini-nav">
              <b>linden & co.</b>
              <span>
                Spaces &nbsp; Studio &nbsp; <u>Enquire ↗</u>
              </span>
            </div>
            <div className="mini-content">
              <span className="micro">INTERIORS, WITH INTENTION.</span>
              <h2>
                Space for
                <br />
                <em>living well.</em>
              </h2>
              <span className="mini-line">Thoughtful spaces. Everyday life.</span>
              <span className="mini-button">Discover our work ↗</span>
            </div>
            <img
              src="/assets/courtyard.jpg"
              width={1800}
              height={1200}
              alt="Sunlit contemporary interior with natural wood and open living spaces"
              fetchPriority="high"
            />
            <div className="mini-bottom">
              <span>RESIDENTIAL & COMMERCIAL INTERIORS</span>
              <span>01 — 06</span>
            </div>
          </div>
        </div>
        <div className="old-window" aria-hidden="true">
          <div className="old-chrome">www.lindenandco.example</div>
          <b>LINDEN & CO.</b>
          <span className="old-rule"></span>
          <strong>
            Welcome to
            <br />
            our website!
          </strong>
          <span className="old-links">Home | About | Services | Contact</span>
          <img src="/assets/courtyard.jpg" alt="" width={1800} height={1200} />
          <span className="old-caption">Quality interiors since day one.</span>
        </div>
        <span className="art-note">
          <span aria-hidden="true">↳</span> Same business. A better first impression.
        </span>
        <span className="concept-tag">ILLUSTRATIVE REDESIGN</span>
      </div>
      <div className="offer-strip">
        <p>
          Built around
          <br />
          <strong>your next chapter.</strong>
        </p>
        <span>
          <b>01</b> Clearer story
        </span>
        <span>
          <b>02</b> Considered design
        </span>
        <span>
          <b>03</b> Responsive rebuild
        </span>
        <a href="#work" aria-label="Explore the website transformation">
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
