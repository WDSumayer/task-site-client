import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="md" bg="white" variant="white">
        <Container>
          <Link to='/' className='navbar-brand fs-2 fw-bold'>Task-Site</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
                <Link className='nav-link fw-semibold text-dark' to='/'>Add Task</Link>
                <Link className='nav-link fw-semibold text-dark' to='/myTask'>My Task</Link>
                <Link className='nav-link fw-semibold text-dark' to='/completedTask'>Completed Task</Link>
             
              
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;