import Link from "next/link";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

export const metadata = {
  title: "About — 3033",
};

const people = [
  { name: "Sam U.", role: "Systems & field" },
  { name: "Kathan", role: "Industrial design" },
  { name: "Nidhish", role: "Mechanical" },
];

const phases = [
  { n: "01", title: "Frame", sub: "The problem, sharply." },
  { n: "02", title: "Sketch", sub: "Three to five options." },
  { n: "03", title: "CAD", sub: "The first real drawing." },
  { n: "04", title: "Bench", sub: "V1 assembly." },
  { n: "05", title: "Field", sub: "In the wild." },
  { n: "06", title: "Ship", sub: "Handoff and care." },
];

export default function About() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className="eyebrow">About · A studio of three</p>
          <h1 className={`display ${styles.headline}`}>
            Small on <em className="em-accent">purpose</em>.<br />
            Close to the <em className="em-accent">bench</em>.
          </h1>
          <p className={styles.lede}>
            3033 is a hardware and robotics studio in Bengaluru and Ahmedabad.
            We take ideas from sketch to field in months, not quarters — and we
            stay on the bench with you after they ship.
          </p>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">The team</p>
          <div className={styles.peopleRow}>
            {people.map((p) => (
              <div key={p.name} className={styles.person}>
                <div className={styles.portrait} aria-hidden />
                <h3 className={styles.personName}>{p.name}</h3>
                <p className={styles.role}>{p.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">How we work — six phases</p>
          <div className={styles.phases}>
            {phases.map((ph) => (
              <div key={ph.n} className={styles.phase}>
                <div className={styles.phaseN}>{ph.n}</div>
                <h4 className={styles.phaseTitle}>{ph.title}</h4>
                <p className={styles.phaseSub}>{ph.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={`display ${styles.ctaHead}`}>
            If this sounds like your <em className="em-accent">kind</em> of
            studio —
          </h2>
          <Link href="/connect" className={styles.ctaBtn}>
            <span>Start a project</span>
            <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden>
              <path
                d="M1 6h26m0 0l-5-5m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
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
        bl={{ node: <span className={styles.here}>About</span> }}
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
