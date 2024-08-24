import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Crud/Components/Home';
import Products from './Crud/Components/Products';
import AddProduct from './Crud/Components/AddProduct';
import AuthGuard from './Crud/AuthGuard';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Link } from 'react-router-dom';
function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="flex-column p-0 sticky-sidebar"
    >
      <Navbar.Brand className="mx-auto my-3">
        <i className="bi bi-kanban-fill"></i> Dashboard
      </Navbar.Brand>
      <Nav className="flex-column w-100 flex-grow-1">
        <Nav.Item className="w-100">
          <Nav.Link as={Link} to="/home" className="text-light px-4 py-3">
            <i className="bi bi-house-door-fill me-2"></i> Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-100">
          <Nav.Link as={Link} to="/products" className="text-light px-4 py-3">
            <i className="bi bi-box me-2"></i> Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-100">
          <Nav.Link as={Link} to="/add-products" className="text-light px-4 py-3">
            <i className="bi bi-plus-circle me-2"></i> Add Products
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav.Item className="w-100 mt-auto">
        <Nav.Link onClick={handleLogout} className="text-light px-4 py-3">
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Routes>
                    <Route path="/home" element={<AuthGuard><Home /></AuthGuard>}  />
                    <Route path="/products" element={<AuthGuard><Products /></AuthGuard>} />
                    <Route path="/add-products" element={<AuthGuard><AddProduct /></AuthGuard>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
