import { Link } from 'react-router';
import { useSidebar } from './SidebarContext';
import { useTheme } from './ThemeContext';

const IconBurger = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42zm13.44 13.44a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42zM3 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0zm13.44-13.44a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0z" />
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TopNavbar = () => {
  const { toggle } = useSidebar();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="relative h-12 flex items-center px-4 shrink-0"
      style={{ backgroundColor: '#1c1e24', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={toggle}
        className="text-gray-400 hover:text-white transition-colors border border-gray-600 rounded p-1.5 hover:border-gray-400"
        aria-label="Toggle sidebar"
      >
        <IconBurger />
      </button>

      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 text-white font-black tracking-widest text-[21px] hover:text-red-400 transition-colors"
      >
        GunnerGraphs
      </Link>

      <div className="absolute right-4 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="text-gray-400 hover:text-white transition-colors border border-gray-600 rounded p-1.5 hover:border-gray-400"
          aria-label="Toggle theme"
        >
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors border border-gray-600 rounded p-1.5 hover:border-gray-400"
          aria-label="GitHub"
        >
          <IconGitHub />
        </a>
      </div>
    </header>
  );
};

export default TopNavbar;
