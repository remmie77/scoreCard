import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/course">
            COURSE
          </Link>
        </li>
        <li>
          <Link to="/info">
          SCORE CARD
          </Link>
        </li>
        <li>
          <Link to="/info">
            RULES
          </Link>
        </li>
        <li>
          <Link to="/info">
            TIPS
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
