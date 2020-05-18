import React, {Component} from 'react';
import { Col, Container, Row, Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';

import DataTable from './DataTable';

class UpcommingOrders extends Component{
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };
  render(){
    return(
    <Container>
      <Row>
        <Col md={10} lg={9}>
          <h3 className="page-title">Upcomming Orders</h3>
        </Col>
        <Col md={2} lg={3} >


        <div className="buisness">
          <button type="button" className='buisness__avatar' onClick={this.toggle}>
            <p className='buisness__avatar-name' >My Buisness</p>
            <DownIcon className="topbar__icon" />
          </button>
          <Collapse isOpen={this.state.collapse} className="buisness__menu-wrap" >
            <div className="buisness__menu active">
              <div className='buisness__link' >
                <span className={`topbar__link-icon lnr lnr-user`} /> My first buisness
              </div>
              <div className='buisness__link'>
                <span className={`topbar__link-icon lnr lnr-user`} /> My second buisness
                </div>
            </div>
          </Collapse>
        </div>


        </Col>
      </Row>
      <Row>
        <DataTable />
      </Row>
    </Container>
    )
  }
};

export default UpcommingOrders;
