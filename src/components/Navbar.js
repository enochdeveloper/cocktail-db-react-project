import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="cocktail db logo" className='logo' />
        </Link>
        <ul className='nav-links'>
          <Link to="/">home</Link>
          <Link to="/About">about</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
