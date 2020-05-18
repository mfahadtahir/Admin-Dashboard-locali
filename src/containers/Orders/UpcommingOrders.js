import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';

const UpcommingOrders = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Upcomming Orders</h3>
      </Col>
    </Row>
    <Row>
      <DataTable />
    </Row>
  </Container>
);

export default UpcommingOrders;
