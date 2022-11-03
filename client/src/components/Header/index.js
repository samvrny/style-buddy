import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="nav-back">
      <nav className="container navbar d-flex justify-content-between mx-0">
        <Link to="/">
          <a className="navbar-brand link"><span className="style">Style</span>
          <span className="buddy">Buddy</span>
          </a>
        </Link>

        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/favorites" className="link">My Favorites</Link>
              <a href="/" className="link pl-2" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">
                <a className="link">Login</a>
                </Link>
              <Link to="/signup">
                <a className="pl-2 link">Sign Up</a>
                </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;