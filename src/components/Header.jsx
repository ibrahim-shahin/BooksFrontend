import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assests/react.svg";
export const Header = () => {
  return (
    <header className='header'>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> ReactJs
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}
