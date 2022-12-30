import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Authprovider/AuthProvider';

const Header = () => {
  const {user, logOut} = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
    .then(() => {})
    .catch(err => console.log(err))
}
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
             {
              user && <button onClick={handleLogOut} className='btn btn-secondary rounded-1 fw-semibold'>Logout</button>
             }
              
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;