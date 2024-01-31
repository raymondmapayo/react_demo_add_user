import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarPage = () => {
  const path = window.location.pathname;
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
         <h1 style={{ color: 'white' }}>DASHBOARD</h1>
          <Nav>
            <NavDropdown title={username || "User"} id="basic-nav-dropdown" className={path === "/" ? "active" : ""}>
              <NavDropdown.Item href="/" className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavbarPage;