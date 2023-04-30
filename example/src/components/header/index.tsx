import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

const Header = () => {
  return (
    <div className='header'>
      <h1>React Player Youtube</h1>
      <ul className='menu'>
        <li className='menu-item'>
          <NavLink className='menu-link' to='/'>
            Normal Video
          </NavLink>
        </li>
        <li className='menu-item'>
          <NavLink className='menu-link' to='/streaming'>
            Streaming Video
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
