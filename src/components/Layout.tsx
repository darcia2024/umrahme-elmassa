import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';
import TopNavbar from './TopNavbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white lg:flex font-sans">
      {/* Desktop Sidebar (Left) */}
      <DesktopSidebar />

      {/* Main Content Area (Right) */}
      <div className="relative flex min-h-screen w-full flex-col bg-white lg:flex-1">
        {/* Desktop Global Top Navbar Header (Always Present on Every Page) */}
        <div className="hidden lg:block border-b border-stone-200/60 px-8 py-4 bg-white sticky top-0 z-30">
          <TopNavbar />
        </div>

        <main className="flex-1 pb-28 lg:pb-0">
          <Outlet />
        </main>

        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
