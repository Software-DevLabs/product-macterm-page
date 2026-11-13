import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpLeft, Download, Grid2x2, Plus } from 'lucide-react';
import { Button, DotPill } from '../components/ui';
import SectionHead from '../components/SectionHead';
import VideoOverview from '../components/VideoOverview';
import { FEATURES, HIGHLIGHTS, REPO, STATS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/* product landing — clear hero (kicker / headline / one-liner / scroll cue),
   single overview shot, features, highlights, band, ready CTA.
   Tech specs live on /docs. No content repeated across sections. */

const Hero = () => (
  <section className="relative flex min-h-[88svh] flex-col justify-center pt-10">
    <p className="hero-kicker font-mono text-meta uppercase tracking-[0.4em] text-muted-foreground">
      macterm
    </p>
    <h1 className="hero-title mt-8 text-[clamp(2.6rem,6.5vw,6rem)] font-medium leading-[1.05] tracking-tight text-foreground">
      <span className="block">Terminal Mac, Tmux</span>
      <span className="flex flex-wrap items-center gap-[0.3em]">
        For Windows
        <img
          src="macterm/bluetex.png"
          alt=""
          aria-hidden="true"
          className="inline-block h-[0.58em] w-[1.5em] rounded-full border border-border object-cover"
        />
      </span>
    </h1>
    <p className="hero-desc mt-9 max-w-xl text-body leading-relaxed text-muted-foreground">
      A macOS-style terminal for Windows with real tabs, tmux-style panes, themes, and a
      built-in code workspace.
    </p>
    <div className="absolute bottom-4 right-0 flex h-8 w-48 items-center overflow-hidden" aria-hidden="true">
      <p className="scroll-cue-inner font-mono text-label uppercase tracking-[0.35em] text-muted-foreground">
        scroll down
      </p>
    </div>
  </section>
);

/* single framed overview screenshot */
const HeroShot = () => (
  <section className="rise pb-32">
    <div className="shadow-raised overflow-hidden rounded-2xl bg-card p-px">
      <div className="bg-background overflow-hidden rounded-2xl">
        <img
          src="macterm/main.png"
          alt="macterm windows on a blue backdrop — split panes on the left, the agent session writing game_of_life.py in front"
          className="block w-full"
          decoding="async"
        />
      </div>
    </div>
  </section>
);

/* ---------- section head ---------- */

const Stats = () => (
  <section className="pb-32">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map(([n, label, dot]) => (
        <div key={n} className="rise shadow-raised rounded-xl bg-card p-6">
          <p className="font-mono text-[24px] leading-tight tracking-tight text-foreground">{n}</p>
          <p className="text-caption mt-2.5 text-muted-foreground">{label}</p>
          <span className={`mt-4 block h-0.5 w-10 rounded-full ${dot}`} />
        </div>
      ))}
    </div>
  </section>
);

const FeatureRow = ({ eyebrow, title, body, img, alt, side }) => (
  <div className="grid items-center gap-10 py-16 first:pt-8 last:pb-6 md:grid-cols-2 md:gap-14">
    <div className={`feat-text ${side === 'right' ? 'md:order-1' : 'md:order-2'}`}>
      <DotPill dot="bg-chart-blue" label={eyebrow} />
      <h3 className="mt-5 text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium tracking-tight text-foreground">{title}</h3>
      <p className="text-body mt-4 max-w-md text-muted-foreground">{body}</p>
    </div>
    <div className={`feat-img shadow-raised overflow-hidden rounded-xl bg-card p-px ${side === 'right' ? 'md:order-2' : 'md:order-1'}`}>
      <img src={img} alt={alt} loading="lazy" className="block w-full" />
    </div>
  </div>
);

const Features = () => (
  <section className="pb-24">
    <SectionHead eyebrow="What's inside" title="Split panes, workspace, one keystroke away" meta="FEATURES" />
    {FEATURES.map((f) => (
      <FeatureRow key={f.title} {...f} />
    ))}
  </section>
);

const Highlights = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="pb-32">
      <SectionHead eyebrow="Highlights" title="What a daily terminal needs" meta="5 SYSTEMS" />
      <div className="rise shadow-raised rounded-xl bg-card p-1">
        {HIGHLIGHTS.map((h, i) => (
          <div key={h.title} className={i > 0 ? 'border-t border-border' : ''}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex h-header-default w-full items-center gap-4 rounded-lg px-3 text-left transition-colors hover:bg-fill-subtle"
            >
              <span className="font-mono text-meta text-placeholder">{h.k}</span>
              <span className="flex-1 truncate text-label text-foreground">{h.title}</span>
              <DotPill dot={h.hue} label={h.tag} className="hidden md:inline-flex" />
              <Plus
                className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  open === i ? 'rotate-45' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="text-body px-3 pb-7 pl-12 text-muted-foreground">{h.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Band = () => (
  <section className="pb-32">
    <div className="rise shadow-raised grid overflow-hidden rounded-2xl bg-card md:grid-cols-[57%_43%]">
      <div className="bg-background order-2 overflow-hidden md:order-1">
        <img
          src="macterm/beforefooter.png"
          alt="macterm running three live PowerShell panes split right and down, on a blue backdrop"
          loading="lazy"
          className="block h-full w-full object-cover"
        />
      </div>
      <div className="order-1 flex flex-col p-7 md:order-2 md:p-12">
        <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium tracking-tight text-foreground">Terminal–fluency, fast your working</h3>
        <p className="text-body mt-4 max-w-md text-muted-foreground">
          Split right or down, edit over the shell's cwd, and search project-wide without
          leaving the terminal — Shift + Alt + W does it in one press.
        </p>
        <div className="mt-auto pt-10">
          <Button as="a" href={`${REPO}/releases`} target="_blank" rel="noreferrer" variant="primary" size="lg">
            <Grid2x2 className="size-4" /> Download
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/* overview — hover-play video on the bluetex sheet (from macterm v1) */
const VIDEO_URL = import.meta.env.VITE_MACTERM_VIDEO_URL || 'macterm/overview.mp4';

const Overview = () => (
  <section className="pb-32 pt-4">
    <h2 className="text-center text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium tracking-tight text-foreground">
      Overview
    </h2>
    <div className="mt-12 md:mt-16">
      <VideoOverview src={VIDEO_URL} />
    </div>
  </section>
);

/* full-bleed final CTA — outline wordmark drifts with scroll, GSAP scrub */
const Ready = () => (
  <section className="ready-section pb-40 pt-8">
    <div className="shadow-raised relative overflow-hidden rounded-2xl bg-background-2 p-px">
      <div className="relative w-full overflow-hidden rounded-2xl">
        <span
          className="ready-mark pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] font-medium leading-none tracking-tight md:text-[11rem]"
          aria-hidden="true"
          style={{ color: 'transparent', WebkitTextStroke: '1px var(--border)' }}
        >
          macterm
        </span>
        <div className="relative px-7 py-20 md:px-12 md:py-28">
          <h2 className="max-w-3xl text-[clamp(2.8rem,7vw,6.4rem)] font-medium leading-[1.02] tracking-tight text-foreground">
            Ready to run macterm?
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button as="a" href={`${REPO}/releases`} target="_blank" rel="noreferrer" variant="primary" size="lg">
              <Download className="size-4" /> Download
            </Button>
            <Button as="a" href="#/docs" variant="default" size="lg">
              Read the docs <ArrowUpLeft className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function Landing() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* intro timeline — hero only */
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-kicker', { y: 10, autoAlpha: 0, duration: 0.5 })
        .from('.hero-title', { y: 44, autoAlpha: 0, duration: 0.9 }, '-=0.2')
        .from('.hero-desc', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.6');

      /* scroll cue — rides through its mask on an infinite loop */
      gsap.fromTo(
        '.scroll-cue-inner',
        { yPercent: -120, autoAlpha: 0 },
        { yPercent: 120, autoAlpha: 1, duration: 2, repeat: -1, ease: 'power1.inOut' },
      );
      gsap.set('.rise', { autoAlpha: 0 });
      ScrollTrigger.batch('.rise', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 44, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out', overwrite: true },
          ),
      });

      /* feature rows slide in from the sides */
      gsap.utils.toArray('.feat-text, .feat-img').forEach((el) => {
        const fromX = el.classList.contains('feat-text') ? -48 : 48;
        gsap.fromTo(
          el,
          { x: fromX, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            overwrite: true,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none', once: true },
          },
        );
      });

      /* outline wordmark drifts across the ready card while scrolling */
      gsap.fromTo(
        '.ready-mark',
        { x: 0 },
        {
          x: () => -(window.innerWidth ? window.innerWidth * 0.55 : 640),
          ease: 'none',
          scrollTrigger: { trigger: '.ready-section', start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="pb-6 pt-4 md:pt-6">
      <Hero />
      <HeroShot />
      <Stats />
      <Features />
      <Highlights />
      <Band />
      <Overview />
      <Ready />
    </div>
  );
}
