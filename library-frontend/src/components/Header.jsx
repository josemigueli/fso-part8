import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/esm/Button'
import { useLoginValue, useLogout } from '../LoginContext'

const Header = () => {
    const token = useLoginValue()
    const logout = useLogout()

    const handleLogout = () => {
        logout()
    }

    const loggedInContent = () => (
        <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='w-100 justify-content-between'>
                <Nav>
                    <Link to='/' className='nav-link' >Authors</Link>
                    <Link to='/books' className='nav-link' >Books</Link>
                    <Link to='/recommendations' className='nav-link'>Recommendations</Link>
                    <Link to='/new-book' className='nav-link' >Add a Book</Link>
                </Nav>
                <div className='d-flex'>
                    <Button onClick={handleLogout} variant='dark'>
                    Logout
                    </Button>
                </div>
                </Nav>
            </Navbar.Collapse>
        </>
    )

    return (
        <>
            <Navbar expand='lg'>
                <Container>
                    <Link to='/' className='navbar-brand'>Library</Link>
                    {token ? loggedInContent() : null}
                </Container>
            </Navbar>
        </>
    )
}

export default Header