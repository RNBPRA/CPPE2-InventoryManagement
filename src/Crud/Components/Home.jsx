import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRupeeSign, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalItems: 0,
    totalRevenue: 0,
    lowStockItems: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/inventory');
        const inventoryData = response.data;

        // Calculate total items and total revenue
        let totalItems = 0;
        let totalRevenue = 0;
        let lowStockItems = 0;

        inventoryData.forEach(item => {
          totalItems += item.quantity;
          totalRevenue += item.quantity + item.price;
          if (item.quantity < item.minQuantity) {
            lowStockItems++;
          }
        });

        setData({
          totalItems,
          totalRevenue,
          lowStockItems,
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  const handleGetStarted = () => {
    navigate('/products');
  };

  return (
    <Container fluid className="p-0">
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="display-3 fw-bold">Inventory Management System</h1>
              <p className="lead fs-4">Empower your business with our cutting-edge inventory solution</p>
              <button
                className="btn btn-light btn-lg mt-3 text-primary fw-bold"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaBoxOpen className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Total Items</Card.Title>
                <Card.Text className="fs-1 fw-bold">{data.totalItems}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaRupeeSign className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Total Stock Value</Card.Title>
                <Card.Text className="fs-1 fw-bold">₹{data.totalRevenue ? data.totalRevenue.toFixed(2) : '0.00'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaExclamationTriangle className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Low Stock Items</Card.Title>
                <Card.Text className="fs-1 fw-bold">{data.lowStockItems}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;