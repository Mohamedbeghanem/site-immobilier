import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html", host: "localhost" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the EvoEstate public experience", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /EVO.*ESTATE/s);
  assert.match(html, /Move forward/);
  assert.match(html, /Properties with/);
  assert.match(html, /Book a visit/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|taking shape/i);
});

test("renders every public, authentication, and workspace route", async () => {
  const routes = [
    "/properties", "/buy", "/rent", "/luxury", "/commercial", "/projects",
    "/agents", "/about", "/blog", "/contact", "/book-visit", "/valuation",
    "/client-portal", "/login", "/forgot-password", "/two-factor",
    "/create-agency", "/setup", "/dashboard", "/crm", "/pipeline",
    "/calendar", "/inventory", "/documents", "/marketing", "/finance",
    "/reports", "/team", "/support", "/legal", "/settings",
  ];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /EVO.*ESTATE/s, route);
  }
});

test("includes distinct operating-system modules", async () => {
  const signatures = new Map([
    ["/dashboard", "Today’s agenda"],
    ["/crm", "Every lead, conversation"],
    ["/pipeline", "Deal pipeline"],
    ["/calendar", "Travel intelligence"],
    ["/inventory", "portfolio value"],
    ["/documents", "Versioned, verified"],
    ["/marketing", "AI CONTENT STUDIO"],
    ["/finance", "Commission payouts"],
    ["/reports", "Revenue &amp; forecast"],
  ]);
  for (const [route, signature] of signatures) {
    const response = await render(route);
    const html = await response.text();
    assert.match(html, new RegExp(signature, "i"), route);
  }
});

test("ships production metadata and removes starter dependencies", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /RealEstateAgent/);
  assert.match(html, /og:image/);
  assert.match(html, /\/og\.png/);
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /lucide-react/);
});
