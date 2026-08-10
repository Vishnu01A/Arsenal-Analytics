import { NavLink } from 'react-router';
import { useSidebar } from './SidebarContext';

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
  </svg>
);
const IconSquad = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);
const IconMedical = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zm-2 3c0 1.65-1.35 3-3 3H10c-1.65 0-3-1.35-3-3V5h10v3z" />
  </svg>
);
const IconH2H = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
  </svg>
);

const navItems = [
  { label: 'HOME',         Icon: IconHome,    path: '/'             },
  { label: 'STANDINGS',    Icon: IconChart,   path: '/standings'    },
  { label: 'SQUAD',        Icon: IconSquad,   path: '/squad'        },
  { label: 'INJURIES',     Icon: IconMedical, path: '/injuries'     },
  { label: 'COMPETITIONS', Icon: IconTrophy,  path: '/competitions' },
  { label: 'HEAD TO HEAD', Icon: IconH2H,     path: '/h2h'          },
];

const LeftSidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <aside
      className="shrink-0 flex flex-col overflow-hidden transition-all duration-300"
      style={{ backgroundColor: '#1c1e24', width: isOpen ? '14rem' : '3.5rem' }}
    >
      <nav className="flex-1 py-4">
        {navItems.map(({ label, Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 py-3 text-xs font-bold tracking-widest transition-colors border-l-2',
                isOpen ? 'px-5' : 'px-3.5',
                isActive
                  ? 'text-white bg-white/10 border-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent',
              ].join(' ')
            }
            title={!isOpen ? label : undefined}
          >
            <Icon />
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-300"
              style={{ width: isOpen ? 'auto' : '0', opacity: isOpen ? 1 : 0 }}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
