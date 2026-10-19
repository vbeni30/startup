"use client";

import { useEffect, useRef, useState } from "react";

type SectionId = "work" | "approach";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SectionId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 621px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const sections = ["work", "approach"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const id of ["work", "approach"] as const) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setCurrent(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6] },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.querySelector(".site-footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const button = buttonRef.current;
    if (!menu || !button) return;

    if (button.matches(":focus-visible")) menu.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        button.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const links = [...menu.querySelectorAll<HTMLElement>("a[href]")];
      const items = [button, ...links];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header wrap" ref={headerRef}>
      <a className="brand" href="#top" aria-label="Second Form home">
        <span className="brand-mark" aria-hidden="true">
          <i></i>
          <i></i>
        </span>
        <span>
          second form<span className="brand-period">.</span>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#work" aria-current={current === "work" ? "location" : undefined}>
          The transformation
        </a>
        <a href="#approach" aria-current={current === "approach" ? "location" : undefined}>
          Our approach
        </a>
      </nav>
      <a className="button button-small header-cta" href="#start">
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
      <button
        ref={buttonRef}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span></span>
        <span></span>
      </button>
      <nav
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) closeMenu();
        }}
      >
        <a href="#work" aria-current={current === "work" ? "location" : undefined}>
          The transformation
        </a>
        <a href="#approach" aria-current={current === "approach" ? "location" : undefined}>
          Our approach
        </a>
        <a href="#start">Request a website review ↗</a>
      </nav>
    </header>
  );
}
