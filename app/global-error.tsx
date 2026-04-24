"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#f4f1e8",
          color: "#131211",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 56, lineHeight: 0.95, margin: 0 }}>
            3033 — system fault
          </h1>
          <p style={{ marginTop: 16, color: "rgba(19,18,17,0.7)" }}>
            {error.message || "Something broke deep in the shell."}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              background: "#131211",
              color: "#f4f1e8",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: 13,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
