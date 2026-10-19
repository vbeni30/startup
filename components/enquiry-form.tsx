"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildBrief, enquiryFilename } from "@/lib/brief";
import { normalizeWebsite } from "@/lib/website";

const WEBSITE_MESSAGE = "Enter a website such as yourbusiness.com.";

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  const focusResult = useRef(false);
  const focusName = useRef(false);
  const [websiteInvalid, setWebsiteInvalid] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [brief, setBrief] = useState("");
  const [filename, setFilename] = useState("second-form-website-enquiry.txt");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (prepared && focusResult.current) {
      focusResult.current = false;
      resultRef.current?.focus({ preventScroll: true });
    }
    if (!prepared && focusName.current) {
      focusName.current = false;
      nameRef.current?.focus({ preventScroll: true });
    }
  }, [prepared]);

  const clearWebsiteError = () => {
    setWebsiteInvalid(false);
    websiteRef.current?.setCustomValidity("");
  };

  const showWebsiteError = () => {
    setWebsiteInvalid(true);
    websiteRef.current?.setCustomValidity(WEBSITE_MESSAGE);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearWebsiteError();
    const form = formRef.current;
    if (!form?.reportValidity()) return;

    const data = new FormData(form);
    const url = normalizeWebsite(String(data.get("website") ?? ""));
    if (!url) {
      showWebsiteError();
      websiteRef.current?.focus();
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      nameRef.current?.setCustomValidity("Enter your name.");
      nameRef.current?.reportValidity();
      return;
    }

    focusResult.current = true;
    setBrief(
      buildBrief({
        name,
        email: String(data.get("email") ?? "").trim(),
        website: url,
        goal: String(data.get("goal") ?? ""),
      }),
    );
    setFilename(enquiryFilename(url));
    setStatus("");
    setPrepared(true);
  };

  const onEdit = () => {
    focusName.current = true;
    setPrepared(false);
  };

  const onCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(brief);
      setStatus("Brief copied. Nothing has been sent.");
    } catch {
      const preview = previewRef.current;
      const selection = window.getSelection();
      if (preview && selection) {
        const range = document.createRange();
        range.selectNodeContents(preview);
        selection.removeAllRanges();
        selection.addRange(range);
        setStatus("Clipboard access is unavailable. The brief is selected so you can copy it manually, or download the file.");
        return;
      }
      setStatus("Clipboard access is unavailable. Select the brief text or download the file.");
    }
  };

  const onDownload = () => {
    const objectUrl = URL.createObjectURL(new Blob(["\uFEFF", brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setStatus("Brief prepared for download. Nothing has been sent.");
  };

  return (
    <>
      <form id="enquiry-form" method="post" action="#start" ref={formRef} onSubmit={onSubmit} hidden={prepared}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">
              Your name <span aria-hidden="true">*</span>
            </label>
            <input
              ref={nameRef}
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              maxLength={100}
              required
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </div>
          <div className="field">
            <label htmlFor="email">
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@yourbusiness.com"
              maxLength={200}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="website">
            Current website <span aria-hidden="true">*</span>
          </label>
          <input
            ref={websiteRef}
            id="website"
            name="website"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            maxLength={500}
            required
            aria-invalid={websiteInvalid || undefined}
            aria-describedby={websiteInvalid ? "website-error" : undefined}
            onInput={clearWebsiteError}
            onBlur={() => {
              const value = websiteRef.current?.value ?? "";
              if (!value.trim() || normalizeWebsite(value)) clearWebsiteError();
              else showWebsiteError();
            }}
          />
          <span className="field-error" id="website-error" hidden={!websiteInvalid}>
            {WEBSITE_MESSAGE}
          </span>
        </div>
        <div className="field">
          <label htmlFor="goal">What would you like to improve?</label>
          <select id="goal" name="goal" defaultValue="Refresh our look and credibility">
            <option>Refresh our look and credibility</option>
            <option>Make our offer clearer</option>
            <option>Get more enquiries</option>
            <option>Improve the mobile experience</option>
            <option>Plan a complete rebuild</option>
          </select>
        </div>
        <button className="button form-submit" type="submit">
          Prepare my enquiry <span aria-hidden="true">↗</span>
        </button>
        <p className="form-notice">
          Preview mode: this prepares a brief for you to copy or download. Nothing is sent. A studio inbox will be
          connected before launch.
        </p>
      </form>
      <div id="enquiry-result" className="enquiry-result" hidden={!prepared} tabIndex={-1} ref={resultRef}>
        <span className="result-icon" aria-hidden="true">
          ✓
        </span>
        <h4>Your enquiry is ready.</h4>
        <p>Save the brief below for your conversation with the studio. Nothing has been sent.</p>
        <pre id="brief-preview" ref={previewRef}>
          {brief}
        </pre>
        <div className="result-actions">
          <button type="button" className="button" id="copy-brief" onClick={onCopy}>
            Copy brief <span aria-hidden="true">↗</span>
          </button>
          <button type="button" className="download-brief text-link" onClick={onDownload}>
            Download .txt ↓
          </button>
        </div>
        <p id="copy-status" role="status" aria-live="polite">
          {status}
        </p>
        <button type="button" id="edit-brief" className="edit-link" onClick={onEdit}>
          ← Edit details
        </button>
      </div>
    </>
  );
}
