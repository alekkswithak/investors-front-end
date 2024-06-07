import React from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import InvestorTable from "./components/InvestorTable";
import InvestorDetail from "./components/InvestorDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Investor Table
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Investor Table
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Routes>
          <Route path="/" exact element={<InvestorTable />} />
          <Route path="/detail/:id" element={<InvestorDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
