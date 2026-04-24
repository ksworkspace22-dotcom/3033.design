import Link from "next/link";
import { Chrome, NavLink } from "@/components/Chrome";
import styles from "./page.module.css";

export function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `${params.id} — 3033` };
}

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <main className={styles.page}>
        <p className="eyebrow">Project · {id}</p>
        <h1 className={`display ${styles.headline}`}>
          Not yet <em className="em-accent">documented</em>.
        </h1>
        <p className={styles.body}>
          This project detail page is intentionally sparse for now — it will be
          filled in from the studio&rsquo;s lab log. If you want context in the
          meantime, come say hello.
        </p>
        <Link href="/outputs" className={styles.back}>
          ← Back to lab
        </Link>
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
        bl={{ node: <span className={styles.here}>{id}</span> }}
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
