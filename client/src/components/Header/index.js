import React from 'react';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav>
        <div className='title'>
          <Link to="/">
            <a className="navbar-brand link"><span className="style">Style</span>
              <span className="buddy">Buddy</span>
            </a>
          </Link>
        </div>

        <div className='signup-links'>
          {Auth.loggedIn() ? (
            <>
              <Link to="/favorites" className='link'>My Favorites</Link>
              <a href="/" className='link' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">
                <a className='signup-link'>Login</a>
              </Link>
              <Link to="/signup">
                <a className='signup-link'>Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;