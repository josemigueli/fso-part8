import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
    return (
        <>
            <Navbar expand='lg'>
                <Container>
                    <Link to='/' className='navbar-brand'>Library</Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav>
                            <Link to='/' className='nav-link' >Authors</Link>
                            <Link to='/books' className='nav-link' >Books</Link>
                            <Link to='/new-book' className='nav-link' >Add a Book</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header