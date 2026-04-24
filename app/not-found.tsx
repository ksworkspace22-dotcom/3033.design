import Link from "next/link";

export default function NotFound() {
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
        <p className="eyebrow">404 — off the bench</p>
        <h1
          className="display"
          style={{
            fontSize: "clamp(64px, 12vw, 220px)",
            lineHeight: 0.9,
            marginTop: 16,
          }}
        >
          Not <em className="em-accent">here</em>.
        </h1>
        <p
          style={{
            marginTop: 24,
            color: "var(--ink-2)",
            fontSize: 18,
            fontWeight: 300,
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
            }}
          >
            Take me home →
          </Link>
        </p>
      </div>
    </main>
  );
}
