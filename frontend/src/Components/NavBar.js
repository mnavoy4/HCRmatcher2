import React from 'react';
import {
  Nav,
  NavLink,
} from 'styled-nav-component';
import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
    <Nav dark>
      <Link to="/">
        <NavLink tabs active>Candidates</NavLink>
      </Link>
      <Link to="/jobs">
        <NavLink tabs>Jobs</NavLink>
      </Link>
      <Link to="#">
        <NavLink tabs>Link</NavLink>
      </Link>
      <Link to="#">
        <NavLink tabs disabled>Disabled</NavLink>
      </Link>
    </Nav>
  )
}
