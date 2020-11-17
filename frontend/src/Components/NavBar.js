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
        <NavLink dark active>Candidates</NavLink>
      </Link>
      <Link to="/jobs">
        <NavLink>Jobs</NavLink>
      </Link>
      <Link to="#">
        <NavLink>Link</NavLink>
      </Link>
      <Link to="#">
        <NavLink>Disabled</NavLink>
      </Link>
    </Nav>
  )
}
