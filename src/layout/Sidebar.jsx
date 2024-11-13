import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    { title: 'Dashboard', path: '/dashboard', className: '' },
    { title: 'Services', path: '/services', className: '' },
    { title: 'Vacancy', path: '/vacancy', className: 'vacancy-button' }, 
    { title: 'About', path: '/about', className: '' },
    { title: 'Contact Us', path: '/contactus', className: '' },
    { title: 'Privacy Policy', path: '/policy', className: '' },
    { title: 'Help & Support', path: '/support', className: '' },
  ];

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <nav className='w-[18vw] h-[calc(100vh-80px)] pt-7 flex flex-col border border-r border-gray-300 bg-white'>
      <Stack spacing={2} direction="column">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="text"
            color="black"
            className={`buttons ${item.className} ${pathname === item.path ? 'active' : ''}`} 
            size="large"
            onClick={() => handleNavigation(item.path)}
          >
            {item.title}
          </Button>
        ))}
      </Stack>
    </nav>
  );
};

export default Sidebar;
