import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
        <>
            <Navbar expand="md" className="bg-white shadow-lg header py-3">
                <Container >
                    <Navbar.Brand href="/"><strong>Smart Learning</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link href="/courses" className=''>All Courses</Nav.Link>
                        {/* <Form className="d-flex me-3 ms-lg-3 ms-md-3">
                            <div className="custom-search-box">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M10 2a8 8 0 105.29 14.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
                                </svg>
                                <input type="text" placeholder="Search course here" />
                            </div>
                        </Form> */}
                    </Nav>
                    <a href='/account/my-learning' className="btn btn-primary">My Account</a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
  )
}

export default Header
