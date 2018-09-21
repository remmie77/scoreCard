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
          <Link to="/score">
          SCORE CARD
          </Link>
        </li>
        <li>
          <Link to="/rules">
            RULES
          </Link>
        </li>
        <li>
          <Link to="/tips">
            TIPS
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
