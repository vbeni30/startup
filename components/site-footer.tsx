export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer wrap">
      <a className="brand" href="#top">
        <span className="brand-mark" aria-hidden="true">
          <i></i>
          <i></i>
        </span>
        <span>
          second form<span className="brand-period">.</span>
        </span>
      </a>
      <p>A better next chapter for your website.</p>
      <div>
        <span>
          © <span id="year">{year}</span> Second Form
        </span>
        <small>Working studio name · Private concept</small>
      </div>
      <a href="#top" className="back-top" aria-label="Back to top">
        ↑
      </a>
    </footer>
  );
}
