import * as React from 'react'
import '../styles/Nav.css';
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <div>
      <div className='nav-bar'>
        <Link className='nav-text' to="/" relative="path">
          HR PORTAL
        </Link>
      </div>
    </div>
  )
}

export default Nav;
