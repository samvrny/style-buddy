import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
<<<<<<< HEAD
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Style-Buddy!</h1>
        </Link>

        <nav className="text-center">
=======
    <header className="nav-back">
      <nav className="container navbar d-flex justify-content-between mx-0">
        <Link to="/">
          <a className="navbar-brand link"><span className="style">Style</span>
          <span className="buddy">Buddy</span>
          </a>
        </Link>

        <div>
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
          {Auth.loggedIn() ? (
            <>
              <Link to="/favorites">My Favorites</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
=======
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
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
    </header>
  );
};

export default Header;