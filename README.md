# Second Form

A private studio website for a founding team offering website redesigns and rebuilds. The page keeps the original warm paper, graphite, and vermilion design, and now runs as a Next.js app.

## Direction

Warm paper, graphite, vermilion accents, DM Sans and Instrument Serif. The working name “Second Form” expresses a considered next chapter for an existing business. It is a placeholder, not a trademark or domain availability claim.

Three sections: offer, interactive transformation, and approach/enquiry. The fictional Linden & Co. concept uses an interiors image sourced from Unsplash (`photo-1600607687920-4e2a09cf159d`). No client history, testimonials, results, or performance metrics are implied.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm test` checks website normalization, comparison addresses, and the enquiry brief. `npm run build` produces the production app.

## Interactions

- Keyboard and pointer accessible before/after comparison with endpoint and split buttons.
- The comparison position and desktop/mobile preview are stored in the page address, so a view can be shared and restored with the browser back button.
- Desktop/mobile concept preview switch.
- Mobile navigation traps keyboard focus, and dismisses on Escape, outside click, link activation, and desktop widths. The current section is exposed to assistive technology.
- Expandable approach details. Opening a step updates the address, and `#step-01`, `#step-02`, or `#step-03` opens that step.
- Validated enquiry brief with copy, text download, and edit flow. An invalid website is flagged when the field is left, copy selects the brief if the clipboard is blocked, and the download name includes the website hostname.

The enquiry form is an explicitly labeled local preview. It does not send data, call a server, or retain personal information across reloads. The form uses POST so a no-JavaScript submit cannot place the brief in the address bar. Connect a verified team inbox or form endpoint and update the copy before using the site for actual outreach. Change the footer's private-concept label when appropriate. No external integrations or analytics are installed.

Static assets and fonts are served locally from `public/assets`. `noindex` and `robots.txt` supplement access control; they do not replace it. Maintain owner-only access until the owner authorizes a change.

The original static files remain in `dist/` for reference.
