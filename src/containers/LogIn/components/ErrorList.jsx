import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Collapse from '../../../shared/components/Collapse';
import Alert from '../../../shared/components/Alert'

const ErrorAlert = (props) => (
  <Col md={12} lg={12}>
    <Card className={'p-0'}>
      <CardBody className={'p-0'} >
        <Collapse title="" >
          <Alert color="danger" className="alert--bordered" icon>
              <p>
                <span className="bold-text">Warning! </span> 
                {props.message}
              </p>
          </Alert>
        </Collapse>
      </CardBody>
    </Card>
  </Col>
);


export default ErrorAlert;
