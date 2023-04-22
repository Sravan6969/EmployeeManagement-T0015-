import * as React from 'react'
import '../styles/Nav.css';
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <div>
      <div className='nav-bar stcky'>
        <Link className='nav-text' to="/" relative="path">
          <span className='Icon text'>HR PORTAL</span>
        </Link>
      </div>
    </div>
  )
}

export default Nav;
