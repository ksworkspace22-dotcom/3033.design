import Link from "next/link";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

export const metadata = { title: "Notes — 3033" };

const notes = [
  {
    slug: "why-small",
    title: "Why we stay small",
    date: "2026-03-18",
    kind: "Essay",
    excerpt:
      "A three-person bench can run one idea all the way to the field. Past that, the bench slows down faster than it speeds up.",
  },
  {
    slug: "bench-is-interview",
    title: "The bench is the interview",
    date: "2026-02-02",
    kind: "Practice",
    excerpt:
      "We don't hire off decks. A half-day at the bench tells us more than a half-hour of questions ever will.",
  },
  {
    slug: "field-notes-quadruped",
    title: "Field notes — quadruped v2 gait tuning",
    date: "2026-01-11",
    kind: "Lab log",
    excerpt:
      "Three days in Ladakh cold, four failed belt tensioners, one good data set. What the field taught us that the bench could not.",
  },
  {
    slug: "make-it-ugly-first",
    title: "Make the ugly thing first",
    date: "2025-11-04",
    kind: "Principle",
    excerpt:
      "The prettiest first draft is almost always wrong. We aim for ugly-and-working, then earn our way back to beautiful.",
  },
];

export default function Notes() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className="eyebrow">Notes — from the bench</p>
          <h1 className={`display ${styles.headline}`}>
            Notes from the <em className="em-accent">bench</em> and the field,
            plus a few principles we keep learning the hard way.
          </h1>
        </header>

        <section className={styles.list}>
          {notes.map((n) => (
            <article key={n.slug} className={styles.note}>
              <div className={styles.meta}>
                <span>{n.kind}</span>
                <span className={styles.metaDot} />
                <time>{n.date}</time>
              </div>
              <h2 className={`display ${styles.noteTitle}`}>{n.title}</h2>
              <p className={styles.excerpt}>{n.excerpt}</p>
            </article>
          ))}
        </section>
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
        bl={{ node: <span className={styles.here}>Notes</span> }}
        br={{
          node: (
            <NavLink href="/connect" variant="accent">
              Let&apos;s Collaborate
            </NavLink>
          ),
        }}
      />
    </>
  );
}
