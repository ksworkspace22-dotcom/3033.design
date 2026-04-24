"use client";

import Link from "next/link";
import { useState } from "react";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

type Screen = "ask" | "form" | "thanks";

export default function Connect() {
  const [screen, setScreen] = useState<Screen>("ask");
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState("+91");
  const [phone, setPhone] = useState("");

  const canSubmit =
    name.trim().length > 0 &&
    /.+@.+\..+/.test(email) &&
    phone.trim().length >= 6;

  return (
    <>
      <main className={styles.stage}>
        {screen === "ask" && (
          <section className={styles.screen}>
            <h1 className={`display ${styles.head}`}>
              Let&apos;s design the <em className="em-accent">future</em>,
              together.
            </h1>
            <p className={styles.sub}>
              Tell us what&apos;s on your mind and we&apos;ll bring it to the
              bench.
            </p>
            <textarea
              className={styles.idea}
              rows={3}
              placeholder="What do you want to build?"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && idea.trim().length > 2) {
                  e.preventDefault();
                  setScreen("form");
                }
              }}
              autoFocus
            />
            <p className={styles.hint}>
              {idea.trim().length > 2
                ? "Press Enter ↵ to continue"
                : "Shift + Enter for a new line"}
            </p>
          </section>
        )}

        {screen === "form" && (
          <section className={styles.screen}>
            <h1 className={`display ${styles.head}`}>
              <em className="em-accent">Manifested.</em>
            </h1>
            <p className={styles.sub}>The future is getting built.</p>

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                if (canSubmit) setScreen("thanks");
              }}
            >
              <label className={styles.field}>
                <span className={styles.label}>Name / company</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name, or the team"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </label>

              <div className={styles.field}>
                <span className={styles.label}>Contact number</span>
                <div className={styles.phoneRow}>
                  <select value={cc} onChange={(e) => setCc(e.target.value)}>
                    <option value="+91">+91 IN</option>
                    <option value="+1">+1 US</option>
                    <option value="+44">+44 UK</option>
                    <option value="+971">+971 AE</option>
                    <option value="+65">+65 SG</option>
                    <option value="+61">+61 AU</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="00000 00000"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={!canSubmit}
              >
                Submit
                <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
                  <path
                    d="M1 5h20m0 0l-4-4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </section>
        )}

        {screen === "thanks" && (
          <section className={styles.screen}>
            <h1 className={`display ${styles.head}`}>
              <em className="em-accent">Thank you.</em>
            </h1>
            <p className={styles.sub}>
              Consider it already on the bench — we&apos;ll be in touch within{" "}
              <strong className={styles.strong}>48 hours</strong>.
            </p>
          </section>
        )}
      </main>

      <Chrome
        tl={{
          node: (
            <Link href="/" className={styles.wordmark}>
              3033
            </Link>
          ),
        }}
        tr={{ node: <NavLink href="/outputs">Enter Lab</NavLink> }}
        bl={{ node: <span className={styles.here}>Collaborate</span> }}
        br={{ node: <NavLink href="/about">About</NavLink> }}
      />
    </>
  );
}
