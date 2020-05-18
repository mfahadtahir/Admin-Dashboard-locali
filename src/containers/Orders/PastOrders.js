import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import DataTable from './DataTable';

const PastOrders = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Past Orders</h3>
      </Col>
    </Row>
    <Row>
      <DataTable />
    </Row>
  </Container>
);


PastOrders.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(PastOrders);
