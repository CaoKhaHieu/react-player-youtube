import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div className='footer'>
      <button className='btn btn-github'>
        <a
          href='https://github.com/CaoKhaHieu/react-player-youtube'
          target='_blank'
          className='btn'
        >
          <i className='fab fa-github'></i>
        </a>
      </button>

      <button className='btn btn-npm'>
        <a
          href='https://www.npmjs.com/package/react-player-youtube'
          target='_blank'
          className='btn'
        >
          <i className='fab fa-npm'></i>
        </a>
      </button>

      <button className='btn btn-facebook'>
        <a
          href='https://www.facebook.com/caokhahieu.12.08.00/'
          target='_blank'
          className='btn'
        >
          <i className='fab fa-facebook'></i>
        </a>
      </button>
    </div>
  );
};

export default Footer;
