import { createContext, useContext, useEffect, useState } from 'react';

/* Mastra ThemeProvider port: dark|light|system, class flip on documentElement.
   :root carries dark tokens; html.light overrides. */

const STORAGE = 'dashboard-theme';
const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

const getSystemTheme = () =>
  typeof window !== 'undefined' && window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light';

const resolveTheme = (theme) => (theme === 'system' ? getSystemTheme() : theme);

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE);
  if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
  return 'system';
};

const applyThemeClass = (resolved) => {
  const root = document.documentElement;
  root.classList.remove(resolved === 'dark' ? 'light' : 'dark');
  root.classList.add(resolved);
};

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    const mq = window.matchMedia(SYSTEM_QUERY);
    const onChange = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    applyThemeClass(resolved);
    try {
      window.localStorage.setItem(STORAGE, theme);
    } catch {}
  }, [resolved, theme]);

  const toggle = () => setTheme(resolved === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: resolved, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
