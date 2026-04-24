#!/usr/bin/env node
/**
 * Visual verification loop for the 3033 site.
 * Loads every page in a real Chromium, waits for animations to settle,
 * then asserts the key hero text is visible (not opacity:0 / not clipped).
 * Screenshots go to .verify/ for manual review.
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3000";
const OUT = new URL("../.verify/", import.meta.url).pathname;
if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

const checks = [
  {
    path: "/",
    name: "home",
    mustSee: ["3033", "Enter Lab", "collaborate", "Hardware × Robotics"],
    heroSelector: '[class*="hero"]',
  },
  {
    path: "/about",
    name: "about",
    mustSee: ["Small on", "purpose", "bench", "Kathan"],
    heroSelector: '[class*="headline"]',
  },
  {
    path: "/outputs",
    name: "outputs",
    // "Project 01" is rendered by every tile even when not hovered,
    // so it should be present in the DOM string.
    mustSee: ["Enter Lab", "bench", "Project 01", "Project 16"],
    heroSelector: '[class*="headline"]',
  },
  {
    path: "/connect",
    name: "connect",
    mustSee: ["Let's design the", "future", "bring it to the bench"],
    heroSelector: '[class*="head"]',
  },
  {
    path: "/notes",
    name: "notes",
    mustSee: ["Field log", "essays", "principles"],
    heroSelector: '[class*="headline"]',
  },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

let failures = 0;
for (const c of checks) {
  const url = BASE + c.path;
  let pageFailures = [];
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
  } catch (e) {
    console.log(`✗ ${c.name}: goto failed — ${e.message}`);
    failures++;
    continue;
  }

  // Wait for fade-in / animation to land (our keyframes are ~1s)
  await page.waitForTimeout(1800);

  // Check expected text via rendered textContent (collapses React text-node
  // boundaries that would otherwise split "Project 01" across <!-- --> markers).
  const bodyText = (
    await page.evaluate(() => document.body.innerText.replace(/\s+/g, " "))
  ).toLowerCase();
  for (const s of c.mustSee) {
    if (!bodyText.includes(s.toLowerCase()))
      pageFailures.push(`missing text: "${s}"`);
  }

  // Check hero element computed style
  const heroState = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      found: true,
      opacity: parseFloat(cs.opacity),
      visibility: cs.visibility,
      display: cs.display,
      width: rect.width,
      height: rect.height,
      text: el.textContent?.slice(0, 80) ?? "",
    };
  }, c.heroSelector);

  if (!heroState.found) {
    pageFailures.push(`hero selector "${c.heroSelector}" not found`);
  } else {
    if (heroState.opacity < 0.9)
      pageFailures.push(
        `hero opacity=${heroState.opacity} (expected >= 0.9) — text: "${heroState.text}"`,
      );
    if (heroState.visibility === "hidden")
      pageFailures.push("hero visibility: hidden");
    if (heroState.display === "none")
      pageFailures.push("hero display: none");
    if (heroState.width < 40 || heroState.height < 10)
      pageFailures.push(
        `hero too small: ${heroState.width}×${heroState.height}`,
      );
  }

  await page.screenshot({
    path: `${OUT}${c.name}.png`,
    fullPage: false,
  });

  if (pageFailures.length) {
    failures++;
    console.log(`✗ ${c.name} (${url})`);
    for (const f of pageFailures) console.log(`   · ${f}`);
  } else {
    console.log(
      `✓ ${c.name} — opacity ${heroState.opacity}, size ${Math.round(heroState.width)}×${Math.round(heroState.height)}`,
    );
  }
}

await browser.close();
if (failures) {
  console.log(`\n${failures} page(s) failed verification.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} pages verified.`);
