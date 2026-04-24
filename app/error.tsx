"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--pad)",
        textAlign: "center",
      }}
    >
      <div>
        <p className="eyebrow">Bench · off-rail</p>
        <h1
          className="display"
          style={{
            fontSize: "clamp(56px, 10vw, 180px)",
            lineHeight: 0.9,
            marginTop: 16,
          }}
        >
          Something <em className="em-accent">slipped</em>.
        </h1>
        <p
          style={{
            marginTop: 22,
            color: "var(--ink-2)",
            fontSize: 17,
            fontWeight: 300,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.5,
          }}
        >
          The page couldn&rsquo;t mount cleanly. Try again, or head back to the
          landing.
        </p>
        <div
          style={{
            marginTop: 28,
            display: "inline-flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <button
            onClick={reset}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "14px 26px",
              background: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Home →
          </Link>
        </div>
      </div>
    </main>
  );
}
