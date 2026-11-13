import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, Download } from 'lucide-react';
import { Button, DotPill, DataTable, IconButton, Kbd } from '../components/ui';
import SectionHead from '../components/SectionHead';
import {
  API_ROWS, DOCS_CMD, EMAIL, FACTS, LIMITS, REPO, SECURITY, SHORTCUT_GROUPS,
} from '../data';

gsap.registerPlugin(ScrollTrigger);

/* docs — the tech ledger: api surface, limits, shortcuts, security, from source */

const METHOD_DOT = { GET: 'bg-chart-green', WS: 'bg-chart-purple', POST: 'bg-chart-amber' };

const KbdRow = ({ keys }) => (
  <span className="flex shrink-0 flex-wrap items-center gap-1">
    {keys.split(' + ').map((k, i, arr) => (
      <React.Fragment key={k + i}>
        <Kbd className="text-caption">{k}</Kbd>
        {i < arr.length - 1 ? <span className="text-[10px] text-placeholder">+</span> : null}
      </React.Fragment>
    ))}
  </span>
);

const ApiSection = () => (
  <section className="pt-16">
    <SectionHead eyebrow="Under the hood" title="Local API surface" meta="SAME TOKEN, EVERY ROUTE" />
    <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
      <DataTable
        columns={[
          { key: 'path', label: 'Route' },
          { key: 'method', label: 'Method' },
          { key: 'what', label: 'What it does' },
        ]}
        rows={API_ROWS.map(([path, method, what]) => ({ path, method, what }))}
        rowKey={(r) => r.path}
        renderCell={(row, key) => {
          if (key === 'path') return <span className="font-mono text-caption text-foreground">{row.path}</span>;
          if (key === 'method') return <DotPill dot={METHOD_DOT[row.method]} label={row.method} />;
          return (
            <span className="block max-w-[26rem] truncate text-caption text-muted-foreground" title={row.what}>
              {row.what}
            </span>
          );
        }}
      />
      <div className="grid grid-cols-2 content-start gap-3 self-start">
        {LIMITS.map(([n, l]) => (
          <div key={n} className="shadow-raised rounded-xl bg-card p-4">
            <p className="font-mono text-label text-foreground">{n}</p>
            <p className="text-caption mt-1.5 text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Shortcuts = () => (
  <section className="pt-28">
    <SectionHead eyebrow="Keyboard shortcuts" title="Defaults — rebind in Ctrl + ," meta="4 GROUPS" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {SHORTCUT_GROUPS.map((g) => (
        <div key={g.title} className="shadow-raised rounded-xl bg-card p-5">
          <DotPill dot={g.hue} label={g.title} className="mb-4" />
          <ul>
            {g.items.map(([key, label]) => (
              <li key={key + label} className="flex items-center justify-between gap-3 py-2">
                <KbdRow keys={key} />
                <span className="text-caption text-right text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const Security = () => (
  <section className="pt-28">
    <SectionHead eyebrow="Security model" title="Locked to your machine" meta="SECURITY MODEL" />
    <div className="shadow-raised rounded-xl bg-card p-1">
      {SECURITY.map(([k, v], i) => (
        <div key={k} className={`rounded-lg px-3 ${i > 0 ? 'border-t border-border' : ''}`}>
          <div className="flex min-h-table-row w-full flex-col justify-center gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="flex w-full shrink-0 items-center gap-2 sm:w-44">
              <span className="size-1.5 shrink-0 rounded-full bg-success-edge" />
              <span className="text-label truncate text-foreground">{k}</span>
            </span>
            <span className="text-caption text-muted-foreground">{v}</span>
          </div>
        </div>
      ))}
      <div className="flex rounded-lg border-t border-border px-3">
        <div className="flex min-h-table-row w-full flex-col justify-center gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex w-full shrink-0 items-center gap-2 sm:w-44">
            <span className="size-1.5 shrink-0 rounded-full bg-chart-blue" />
            <span className="text-label text-foreground">Requires</span>
          </span>
          <span className="text-caption text-muted-foreground">
            Windows 10 · 11 — Node 24 — Bun 1.x — WebView2 runtime
          </span>
        </div>
      </div>
    </div>
  </section>
);

const GetStarted = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DOCS_CMD.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <section id="download" className="pt-28">
      <SectionHead eyebrow="Get started" title="From source — Bun 1.x" meta="OR GRAB THE NSIS INSTALLER" />
      <div className="shadow-raised rounded-xl bg-background-1 p-px">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
          <span className="font-mono text-meta text-muted-foreground">PowerShell — ConPTY</span>
          <IconButton label={copied ? 'Copied' : 'Copy commands'} onClick={copy}>
            {copied ? <Check className="size-4 text-success-edge" /> : <Copy className="size-4" />}
          </IconButton>
        </div>
        <div className="p-4 md:p-6">
          {DOCS_CMD.map((c, i) => (
            <p key={c} className={`font-mono text-label whitespace-pre-wrap ${i ? 'mt-2.5' : ''}`}>
              <span className="mr-2 text-success-edge">$</span>
              <span className={i === 0 ? 'text-foreground' : 'text-muted-foreground'}>{c}</span>
            </p>
          ))}
        </div>
      </div>
      <p className="text-body mt-5 max-w-2xl text-muted-foreground">
        The NSIS installer bundles the Node runtime, so the installed app needs no Node on the
        target machine. It is unsigned — SmartScreen may ask on first launch.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button as="a" href={`${REPO}/releases`} target="_blank" rel="noreferrer" variant="primary" size="base">
          <Download className="size-4" /> Grab the installer
        </Button>
        <Button as="a" href={`mailto:${EMAIL}`} variant="default" size="base">
          Contact us
        </Button>
      </div>
    </section>
  );
};

const Facts = () => (
  <section className="pt-28">
    <SectionHead eyebrow="The stack" title="Facts, not promises" meta="FROM THE README" />
    <div className="shadow-raised rounded-xl bg-card p-1">
      {FACTS.map(([k, v], i) => (
        <div key={k} className={`rounded-lg px-3 ${i > 0 ? 'border-t border-border' : ''}`}>
          <div className="flex min-h-table-row flex-col justify-center gap-1 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-meta shrink-0 uppercase text-placeholder sm:w-44">{String(i + 1).padStart(2, '0')} · {k}</span>
            <span className="text-body-sm text-foreground">{v}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function Docs() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.rise', { autoAlpha: 0 });
      ScrollTrigger.batch('.rise', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true },
          ),
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="pt-2">
      <section className="pt-4">
        <p className="text-eyebrow mb-2 uppercase text-muted-foreground">Documentation</p>
        <h1 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-tight text-foreground">macterm — the tech ledger</h1>
        <p className="text-body mt-4 max-w-2xl text-muted-foreground">
          Architecture, shortcuts, security model and setup for macterm — a macOS-style
          terminal for Windows built on Tauri 2, xterm.js 6 and a loopback Node host.
        </p>
      </section>
      <div className="rise">
        <ApiSection />
      </div>
      <div className="rise">
        <Shortcuts />
      </div>
      <div className="rise">
        <Security />
      </div>
      <div className="rise">
        <Facts />
      </div>
      <div className="rise">
        <GetStarted />
      </div>
      <div className="h-28" />
    </div>
  );
}
