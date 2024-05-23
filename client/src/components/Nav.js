import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Nav = () => {
  return (
    <Navbar>
      <NavLink to="/">Home</NavLink>
      {Auth.loggedIn() ? (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink as="a" href="/" onClick={() => Auth.logout()}>Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </Navbar>
  );
};

export default Nav;
