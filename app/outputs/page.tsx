"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

type Status = "bench" | "shipped" | "cad" | "rd" | "concept" | "beta" | "archive";
const projects: { id: string; n: string; year: string; status: Status; label: string }[] = [
  { id: "quadruped-v2", n: "01", year: "2025—26", status: "bench",   label: "On the bench" },
  { id: "delta-arm",    n: "02", year: "2025",    status: "shipped", label: "Shipped" },
  { id: "gripper-alpha",n: "03", year: "2026",    status: "cad",     label: "CAD · rev 03" },
  { id: "rover-nk1",    n: "04", year: "2024",    status: "shipped", label: "Shipped" },
  { id: "dock-01",      n: "05", year: "2024",    status: "shipped", label: "Shipped" },
  { id: "scout-mk1",    n: "06", year: "2024",    status: "beta",    label: "Consumer beta" },
  { id: "wheel-05",     n: "07", year: "2023",    status: "rd",      label: "R&D" },
  { id: "perch-01",     n: "08", year: "2023",    status: "concept", label: "Concept" },
  { id: "cargo-02",     n: "09", year: "2023",    status: "shipped", label: "Shipped" },
  { id: "pivot-arm",    n: "10", year: "2023",    status: "rd",      label: "R&D" },
  { id: "kite-01",      n: "11", year: "2023",    status: "concept", label: "Prototype" },
  { id: "nest-mk2",     n: "12", year: "2022",    status: "shipped", label: "Shipped" },
  { id: "loom-01",      n: "13", year: "2022",    status: "shipped", label: "Shipped" },
  { id: "spool-a",      n: "14", year: "2022",    status: "cad",     label: "CAD · rev 02" },
  { id: "cradle-01",    n: "15", year: "2022",    status: "shipped", label: "Shipped" },
  { id: "orbit-03",     n: "16", year: "2021",    status: "rd",      label: "R&D" },
];

export default function Outputs() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const liveCount = projects.filter((p) => p.status === "bench").length;
  const shippedCount = projects.filter((p) => p.status === "shipped").length;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      grid.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    grid.addEventListener("wheel", onWheel, { passive: false });
    return () => grid.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <main className={styles.stage}>
        <header className={styles.hero}>
          <p className="eyebrow">Enter Lab — scroll right</p>
          <h1 className={`display ${styles.headline}`}>
            The <em className="em-accent">bench</em>, the field, the archive.
          </h1>
        </header>

        <section className={styles.grid} ref={gridRef}>
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className={styles.tile}
              data-status={p.status}
            >
              <div className={styles.art} />
              <span className={styles.tileTl}>Project {p.n}</span>
              <span className={styles.tileBl}>
                <span
                  className={`${styles.statusDot} ${p.status === "bench" ? styles.live : ""}`}
                />
                {p.label}
              </span>
              <span className={styles.tileBr}>{p.year}</span>
            </Link>
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
        tr={{ node: <NavLink href="/about">About</NavLink> }}
        bl={{
          node: (
            <span className={styles.status}>
              <span className={`${styles.statusDot} ${styles.live}`} />
              {liveCount} live · shipped {shippedCount}
            </span>
          ),
        }}
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
