import { Outlet } from 'react-router';
import { useTheme } from './ThemeContext';
import TopNavbar from './TopNavbar';
import LeftSidebar from './LeftSidebar';

const AppLayout = () => {
  const { isDark } = useTheme();
  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-[#13151a]' : 'bg-gray-100'}`}>
      <TopNavbar />
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <main className="flex-1 p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
