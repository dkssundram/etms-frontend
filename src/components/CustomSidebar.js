import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const CustomSidebar = ({ activeItem }) => {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            '&.active': {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link to="/documentation" />} isActive={activeItem === 'documentation'}>
          Documentation
        </MenuItem>
        <MenuItem component={<Link to="/calendar" />} isActive={activeItem === 'calendar'}>
          Calendar
        </MenuItem>
        <MenuItem component={<Link to="/e-commerce" />} isActive={activeItem === 'e-commerce'}>
          E-commerce
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
