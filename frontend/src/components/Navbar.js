import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #282c34;
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #21a1f1;
  }
`;

const LogoutButton = styled.button`
  background-color: #61dafb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #21a1f1;
  }
`;

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <Nav>
      <NavList>
        {!isAuthenticated ? (
          <>
            <NavItem><NavLink to="/register">Register</NavLink></NavItem>
            <NavItem><NavLink to="/login">Login</NavLink></NavItem>
          </>
        ) : (
          <>
            <NavItem><NavLink to="/submit">Submit</NavLink></NavItem>
            <NavItem><NavLink to="/leaderboard">Leaderboard</NavLink></NavItem>
            <NavItem><LogoutButton onClick={handleLogout}>Logout</LogoutButton></NavItem>
          </>
        )}
      </NavList>
    </Nav>
  );
}

export default Navbar;
