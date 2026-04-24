import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Chrome.module.css";

type Corner = { node: ReactNode };

export function Chrome({
  tl,
  tr,
  bl,
  br,
}: {
  tl?: Corner;
  tr?: Corner;
  bl?: Corner;
  br?: Corner;
}) {
  return (
    <div className={styles.chrome}>
      {tl && <div className={styles.tl}>{tl.node}</div>}
      {tr && <div className={styles.tr}>{tr.node}</div>}
      {bl && <div className={styles.bl}>{bl.node}</div>}
      {br && <div className={styles.br}>{br.node}</div>}
    </div>
  );
}

export function NavLink({
  href,
  children,
  variant = "underline",
}: {
  href: string;
  children: ReactNode;
  variant?: "underline" | "plain" | "accent";
}) {
  return (
    <Link
      href={href}
      className={`${styles.link} ${variant === "underline" ? styles.underline : ""} ${variant === "accent" ? styles.accent : ""}`}
    >
      {children}
    </Link>
  );
}
