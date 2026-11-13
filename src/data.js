export const REPO = 'https://github.com/Software-DevLabs/terminal';
export const SITE = 'https://macterm-001m.vercel.app';
export const EMAIL = 'software.dev.labs1@gmail.com';

export const STATS = [
  ['2', 'built-in themes — Basic & Homebrew', 'bg-chart-amber'],
  ['30%', 'minimum window opacity, stepped by 5%', 'bg-chart-blue'],
  ['v0.1.0', 'current release — actively developed', 'bg-chart-green'],
  ['127.0.0.1', 'the only address the host answers on', 'bg-chart-purple'],
];

export const FEATURES = [
  {
    eyebrow: 'Split panes · ConPTY',
    title: 'Split-Screen Terminal',
    body:
      'Split the terminal horizontally or vertically to run multiple shell sessions side by side, with resizable panes, nested layouts, and quick keyboard navigation.',
    img: 'macterm/featur1.png',
    alt: 'macterm split into three panes — one on the left, two stacked on the right',
    side: 'right',
  },
  {
    eyebrow: 'Shift + Alt + W',
    title: 'Switch fast to the code workspace',
    body:
      'Press Shift + Alt + W to switch instantly from your terminal to a built-in code workspace, where you can browse project files, edit code, and search across your project without leaving macterm.',
    img: 'macterm/Featur2.png',
    alt: "the macterm code workspace — file explorer beside a CodeMirror editor over the shell's cwd",
    side: 'left',
  },
];

export const HIGHLIGHTS = [
  {
    k: '01',
    title: 'Terminal',
    tag: 'ConPTY',
    hue: 'bg-chart-blue',
    body:
      'Real Windows shells through ConPTY, hosted by a local Node process — every pane is a real PowerShell or cmd.exe. xterm.js 6 with WebGL rendering, Unicode 11 widths, WebLinks and search. Ctrl + Shift + K clears the screen and the replay buffer, so cleared output never comes back. Layout, tabs, panes, per-pane cwd, theme and font size survive restarts.',
  },
  {
    k: '02',
    title: 'Window & tabs',
    tag: 'Frameless',
    hue: 'bg-chart-purple',
    body:
      'A frameless native window with macOS traffic lights and rounded corners. Drag the titlebar to move, double-click to zoom. Tabs carry live shell titles, pane-count badges and middle-click close; unfocused windows dim the traffic lights instead of hiding them, and the chrome switches light or dark with the active theme.',
  },
  {
    k: '03',
    title: 'Panes',
    tag: 'tmux-style',
    hue: 'bg-chart-green',
    body:
      'Split right or down, then split again in any direction to build nested layouts. Drag handles to resize — proportions stay normalized on window resize. Alt + Arrow moves focus to the nearest pane in that direction, with focus cycling, pane zoom, equalize and close-pane commands built in.',
  },
  {
    k: '04',
    title: 'Settings & themes',
    tag: 'Basic · Homebrew',
    hue: 'bg-chart-amber',
    body:
      "Two built-in themes — Basic (light) and Homebrew (dark) — cycled with Ctrl + Shift + L. Window transparency steps from 100% down to 30% with Alt + = and Alt + -, fading the whole window while text stays opaque. The settings panel on Ctrl + , includes a shortcut recorder that rejects bare keys and duplicates and can reset actions to their defaults.",
  },
  {
    k: '05',
    title: 'Administrator mode',
    tag: 'UAC',
    hue: 'bg-chart-red',
    body:
      'The titlebar shield relaunches the installed app through the Windows UAC prompt. After elevation, macterm reopens with the layout and workspace state preserved. The shield only appears when the app can actually elevate itself.',
  },
];

export const API_ROWS = [
  ['/health', 'GET', 'Host version and live session summary'],
  ['/config', 'GET', 'Runtime config and machine identity'],
  ['/pty', 'WS', 'Shell I/O, resize, clear-history, kill'],
  ['/workspace/system', 'POST', 'Elevated state and elevation capability'],
  ['/workspace/list · read · write', 'POST', 'Filesystem work inside the workspace root'],
  ['/workspace/find · search', 'POST', 'Filename filter and content search'],
  ['/workspace/elevate', 'POST', 'Relaunch through the Windows UAC prompt'],
];

export const LIMITS = [
  ['2,000', 'entries per directory listing'],
  ['2 MB / 8 MB', 'file preview / file save ceiling'],
  ['500 hits · 30k files', 'content search, 8 s budget'],
  ['10,000', 'lines of scrollback kept by xterm'],
];

export const SHORTCUT_GROUPS = [
  {
    title: 'Tabs',
    hue: 'bg-chart-blue',
    items: [
      ['Ctrl + Shift + T', 'New tab'],
      ['Ctrl + Shift + W', 'Close active tab'],
      ['Ctrl + Alt + ←/→', 'Previous / next tab'],
      ['Middle click', 'Close that tab'],
    ],
  },
  {
    title: 'Panes',
    hue: 'bg-chart-purple',
    items: [
      ['Ctrl + Shift + E', 'Split right'],
      ['Ctrl + Shift + O', 'Split down'],
      ['Alt + Arrows', 'Focus the nearest pane'],
      ['Ctrl + Shift + Space', 'Cycle focus'],
      ['Ctrl + Shift + Z', 'Zoom the active pane'],
      ['Ctrl + Shift + X', 'Close the active pane'],
    ],
  },
  {
    title: 'Terminal & look',
    hue: 'bg-chart-amber',
    items: [
      ['Ctrl + Shift + F', 'Find in scrollback'],
      ['Ctrl + Shift + K', 'Clear screen + scrollback'],
      ['Ctrl + Shift + L', 'Cycle themes'],
      ['Ctrl + Shift + = / 0', 'Font size up / reset'],
      ['Alt + = / -', 'Window transparency'],
      ['Ctrl + ,', 'Open settings'],
    ],
  },
  {
    title: 'Workspace',
    hue: 'bg-chart-green',
    items: [
      ['Shift + Alt + W', 'Open / close the workspace'],
      ['Ctrl + S', 'Save the active file'],
      ['Ctrl + Shift + F', 'Search file contents'],
      ['Enter / Shift + Enter', 'Find bar — next / previous'],
      ['Esc', 'Close the find bar'],
    ],
  },
];

export const SECURITY = [
  ['Loopback only', 'The host binds 127.0.0.1 — never reachable from the network'],
  ['Per-launch token', 'Every /pty and /workspace request needs the launch token'],
  ['Origin gate', 'Browser requests must come from 127.0.0.1 or localhost'],
  ['Containment', 'Workspace paths resolve under the root — escaping symlinks are rejected'],
  ['Bounded work', 'Size and time caps on listings, reads, writes and searches'],
];

export const BAND_LINES = [
  'Quick access with Shift + Alt + W',
  'Built-in file explorer',
  'Code editor with syntax highlighting',
  'Fast project-wide search',
];

export const FACTS = [
  ['Runs', 'PowerShell and cmd.exe as real ConPTY sessions'],
  ['Renders', 'xterm.js 6 — WebGL, Unicode 11, search, WebLinks'],
  ['Follows', 'OSC 7 — new panes, tabs and the workspace open in your cwd'],
  ['Stack', 'Tauri 2 · React 19 · CodeMirror 6 · local Node host'],
];

export const DOCS_CMD = [
  'git clone https://github.com/Software-DevLabs/terminal.git',
  'cd terminal',
  'bun install',
  'bun run dev',
];

export const MARQUEE_WORDS = ['real conpty shells', 'tmux-style panes', 'code workspace', 'xterm.js 6', 'loopback only'];

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Download', href: `${REPO}/releases` },
      { label: 'Github / Repo', href: REPO },
      { label: 'Documentation', href: '#/docs' },
      { label: 'Request Access', href: `mailto:${EMAIL}` },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Home', href: SITE },
      { label: 'Projects', href: `${SITE}/projects` },
      { label: 'Blog', href: `${SITE}/blog` },
      { label: 'About', href: `${SITE}/about` },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: 'Start a Project', href: `mailto:${EMAIL}` },
    ],
  },
];
