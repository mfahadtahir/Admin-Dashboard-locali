import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Collapse from '../../../shared/components/Collapse';
import Alert from '../../../shared/components/Alert'

const ErrorAlert = (props) => {
  console.log(props)
  return(
  <Col md={12} lg={12}>
    <Card className={'p-0'}>
      <CardBody className={'p-0'} >
        <Collapse title="" >
          <Alert color={props.status} className="alert--bordered" icon>
              <p>
                <span className="bold-text">{props.status === 'danger' ? 'Warning! ' : 'Congratulations! '} </span> 
                {props.message}
              </p>
          </Alert>
        </Collapse>
      </CardBody>
    </Card>
  </Col>
  )
}


export default ErrorAlert;
