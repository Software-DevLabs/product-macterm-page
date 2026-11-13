import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Download, Github, Moon, Sun } from 'lucide-react';
import { Button, IconButton } from './components/ui';
import { useTheme } from './lib/theme';
import { REPO, FOOTER_COLUMNS } from './data';
import Landing from './pages/Landing';
import Docs from './pages/Docs';

const linkCls = ({ isActive }) =>
  `flex h-control-sm items-center rounded-lg px-2.5 text-label transition-colors ${
    isActive ? 'bg-fill text-foreground' : 'text-muted-foreground hover:bg-fill-subtle hover:text-foreground'
  }`;

/* ---------- shared topbar — Software DevLabs logo ---------- */

const TopBar = () => {
  const { resolvedTheme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-normal ${
        scrolled ? 'bg-sidebar/85 border-b border-border backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-header-default w-full max-w-[1280px] items-center gap-4 px-4 md:px-6">
        <a href="#/" className="flex min-w-0 items-center gap-3">
          <img
            src="logo.png"
            alt="Software DevLabs"
            className="h-7 w-auto object-contain md:h-8"
          />
          <span className="truncate text-label text-foreground">Software DevLabs</span>
        </a>
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkCls}>Overview</NavLink>
          <NavLink to="/docs" className={linkCls}>Docs</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <IconButton label="Toggle theme" onClick={toggle}>
            {resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </IconButton>
          <Button as="a" href={REPO} target="_blank" rel="noreferrer" variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Github className="size-4" />
          </Button>
          <Button as="a" href={`${REPO}/releases`} target="_blank" rel="noreferrer" variant="primary" size="sm">
            <Download className="size-4" /> Download
          </Button>
        </div>
      </div>
    </header>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ---------- shared footer ---------- */

const Footer = () => (
  <footer className="mt-4 pb-12">
    <div className="flex flex-col gap-10 border-t border-border pt-12 md:flex-row md:justify-between">
      <div className="max-w-sm">
        <a href="#/" className="flex items-center gap-3">
          <img src="logo.png" alt="Software DevLabs" className="h-7 w-auto object-contain" />
          <span className="leading-none">
            <span className="block text-label text-foreground">Software DevLabs</span>
            <span className="mt-1 block text-meta uppercase text-placeholder">macterm</span>
          </span>
        </a>
        <p className="text-caption mt-4 text-muted-foreground">
          A macOS-style terminal for Windows — real ConPTY shells, tmux-style panes, a built-in
          code workspace. Loopback only, per-launch token.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-eyebrow mb-3 uppercase text-placeholder">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
      <p className="text-meta text-placeholder">©2026 · MacTerm — Terminal Mac, Tmux for Windows</p>
      <a
        href={REPO}
        target="_blank"
        rel="noreferrer"
        className="text-meta text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="inline-flex items-center gap-1.5">
          <Github className="size-3.5" /> Software-DevLabs/terminal
        </span>
      </a>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-sidebar min-h-screen">
      <HashRouter>
        <ScrollToTop />
        <TopBar />
        <main className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<Landing />} />
          </Routes>
          <Footer />
        </main>
      </HashRouter>
    </div>
  );
}
