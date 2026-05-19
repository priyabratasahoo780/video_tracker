import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaListUl, FaChartPie, FaUserCog, FaCog } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Sidebar = () => {
  return (
    <div className="w-20 md:w-64 h-full glassmorphism flex flex-col border-r-0 rounded-none border-gray-800 transition-all duration-300 z-10">
      <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-4 border-b border-gray-800">
        <SiLeetcode className="text-neonBlue text-3xl" style={{ filter: 'drop-shadow(0 0 10px #00f0ff)' }} />
        <h1 className="hidden md:block font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonGreen">
          CodeTrack
        </h1>
      </div>
      <nav className="flex-1 px-2 md:px-4 py-8 flex flex-col gap-2">
        <NavItem to="/" icon={<FaHome />} label="Dashboard" />
        <NavItem to="/tracker" icon={<FaListUl />} label="Tracker" />
        <NavItem to="/analytics" icon={<FaChartPie />} label="Analytics" />
      </nav>
      <div className="p-4 flex flex-col gap-2 border-t border-gray-800">
        <NavItem to="/profile" icon={<FaUserCog />} label="Profile" />
        <NavItem to="/settings" icon={<FaCog />} label="Settings" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-[rgba(0,240,255,0.1)] to-transparent text-neonBlue border-l-4 border-neonBlue shadow-neon-hover'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden md:block font-medium">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
