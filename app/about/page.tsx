"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

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
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(0);
  const curRef = useRef(0);
  const maxNegRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    const ribbon = ribbonRef.current;
    if (!stage || !ribbon) return;

    // Skip horizontal behavior on narrow viewports — vertical stack handles it
    if (window.innerWidth <= 900) return;

    const measure = () => {
      const ribbonW = ribbon.scrollWidth;
      const stageW = stage.clientWidth;
      maxNegRef.current = Math.min(0, stageW - ribbonW);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(ribbon);

    const clamp = (v: number) =>
      Math.max(maxNegRef.current, Math.min(0, v));

    let raf = 0;
    const tick = () => {
      curRef.current += (targetRef.current - curRef.current) * 0.12;
      if (Math.abs(targetRef.current - curRef.current) < 0.1)
        curRef.current = targetRef.current;
      ribbon.style.transform = `translate3d(${curRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetRef.current = clamp(targetRef.current - delta);
      e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    let touchX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchX === null) return;
      const x = e.touches[0].clientX;
      const dx = x - touchX;
      touchX = x;
      targetRef.current = clamp(targetRef.current + dx);
    };
    const onTouchEnd = () => {
      touchX = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const onKey = (e: KeyboardEvent) => {
      const step = stage.clientWidth * 0.85;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        targetRef.current = clamp(targetRef.current - step);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        targetRef.current = clamp(targetRef.current + step);
      } else if (e.key === "Home") {
        targetRef.current = 0;
      } else if (e.key === "End") {
        targetRef.current = maxNegRef.current;
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.ribbon} ref={ribbonRef}>
          <section className={`${styles.panel} ${styles.pIntro}`}>
            <p className="eyebrow">01 · About</p>
            <h1 className={`display ${styles.headline}`}>
              Three people, <em className="em-accent">one bench</em> per idea.
            </h1>
            <p className={styles.lede}>
              Every mechanism we build moves from the first sketch through the
              field inside a single head, and then it stays there while the
              field teaches it what the bench could not. We think that is why
              the ones we ship tend to still be running a year later.
            </p>
          </section>

          <section className={`${styles.panel} ${styles.pPeople}`}>
            <p className="eyebrow">02 · The team — three</p>
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

          <section className={`${styles.panel} ${styles.pLoc}`}>
            <p className="eyebrow">03 · Two spaces</p>
            <h2 className={`display ${styles.sectionHead}`}>
              A bench in <em className="em-accent">Bengaluru</em>, another in
              Ahmedabad.
            </h2>
            <p className={styles.lede}>
              Most of the machining happens in Ahmedabad, most of the
              electronics in Bengaluru, and both of us are in the field the
              week something ships. The rest is a flight or a phone call away.
            </p>
          </section>

          <section className={`${styles.panel} ${styles.pMethod}`}>
            <p className="eyebrow">04 · How we work · six phases</p>
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

          <section className={`${styles.panel} ${styles.pCta}`}>
            <p className="eyebrow">05 · Collaborate</p>
            <h2 className={`display ${styles.sectionHead}`}>
              If you have a mechanism that needs{" "}
              <em className="em-accent">building</em>, tell us about it.
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
        </div>
      </div>

      <Chrome
        tl={{
          node: (
            <Link href="/" className={styles.wordmark}>
              3033
            </Link>
          ),
        }}
        tr={{ node: <NavLink href="/outputs">Enter Lab</NavLink> }}
        bl={{ node: <span className={styles.here}>About · scroll right</span> }}
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
