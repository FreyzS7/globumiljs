import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
export default function MainLayout() {
  return (
    <div className="w-full bg-[#FFF6F6] ">
      <Navbar />
        <main className="bg-[#FFF6F6]">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
} 