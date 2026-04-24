import Link from "next/link";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.stage}>
        <div className={styles.grid} aria-hidden />
        <div className={styles.halo} aria-hidden />

        <div className={styles.statement}>
          <h1 className={`display ${styles.hero}`}>
            3<span className={styles.zero}>0</span>33
          </h1>

          <p className={`display ${styles.tagline}`}>
            Hardware <span className={styles.cross}>×</span> Robotics{" "}
            <em className="em-accent">Studio</em>
          </p>

          <p className={styles.sub}>
            We take mechanisms from the first sketch through field testing, and
            stay on the bench for every revision after that. Two shops —
            Bengaluru and Ahmedabad — working with small teams that actually
            ship.
          </p>

          <div className={styles.ctas}>
            <Link href="/outputs" className={styles.ctaPrimary}>
              <span>Enter Lab</span>
              <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden>
                <path
                  d="M1 6h26m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <Link href="/connect" className={styles.ctaSecondary}>
              <span>
                Let&apos;s <em className="em-accent">collaborate</em>
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Chrome
        tr={{ node: <NavLink href="/about">About</NavLink> }}
        bl={{
          node: (
            <span className={styles.corner}>
              <span className={styles.dot} aria-hidden />
              <span>Bengaluru · Ahmedabad</span>
            </span>
          ),
        }}
        br={{ node: <NavLink href="/notes">Notes</NavLink> }}
      />
    </>
  );
}
