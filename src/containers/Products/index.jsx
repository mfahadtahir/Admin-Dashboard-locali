import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';

const Products = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">PRODUCTS</h3>
      </Col>
    </Row>
    <Row>
      <ExampleCard />
    </Row>
  </Container>
);

export default Products;
