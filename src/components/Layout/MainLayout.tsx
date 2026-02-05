import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from './Sidebar'
import Navbar from '../Shared/Navbar'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';
// ..
AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  mirror: false,
});


export default function DashboardLayout() {
const location = useLocation();

useEffect(() => {
  AOS.refresh();
}, [location.pathname]);

  return (
    <div className=" bg-[#F7F9FB]">
      <Sidebar />
      <div
        className='transition-all duration-300 lg:ml-70 w-[calc(100vw-300px)]!'
      >
        <Navbar />
        <main className="mb-0 w-[calc(100vw-300px)]  min-h-[calc(100vh-4rem)] px-0!">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
