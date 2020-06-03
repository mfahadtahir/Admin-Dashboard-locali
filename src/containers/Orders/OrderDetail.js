import React from 'react';
import { Col, Container, Row, Button, ButtonToolbar, Table,Card, CardBody, } from 'reactstrap';
import {db} from '../LogIn/Firebase/firestore'

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false,buisnessData: {}, orderData: {}, userData: {}}

  }
  
  componentDidMount() {
    console.log(this.props);
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December']
    let orders = db.collection('businesses').doc(this.props.match.params.buid), buisness = orders;
    buisness.get()
    .then(resp => {
      let buisnessData = resp.data();
      db.collection('admin-users')
      buisness.collection('orders').doc(this.props.match.params.id).get()
      .then(res => {
        console.log(res.data());
        let orderData = res.data()
        orderData.date = orderData.date.split(' ')[0].split('-');
        let date = orderData.date;
        orderData.date = date[0];
        orderData.month = month[date[1] - 1];
        orderData.year = date[2];
        db.collection('users').doc(orderData.userId).get().then(res => {
          let userData = res.data();
          this.setState({loaded: true, orderData, buisnessData, userData});
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })
  }
  render(){
    let {buisnessData, orderData, userData} = this.state;
    return(
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Order Details</h3>
            {/* <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
            </h3> */}
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
          <Card>
            {
              this.state.loaded ?
              <CardBody className="invoice">
                <div className="invoice__head">
                  <div className="invoice__head-left">
                    <div className="invoice__logo" />
                    <p> </p>
                    <p>{buisnessData.address ? buisnessData.address : null}</p>
                    <p>{buisnessData.city ? buisnessData.city : null}</p>
                    <p>{buisnessData.postal} </p>
                    <p dir="ltr">{buisnessData.phone ? buisnessData.phone : null}</p>
                  </div>
                  <div className="invoice__head-right">
                    <h4>Order Id #{orderData.orderId.toUpperCase()}</h4>
                    <p className="invoice__date">{orderData.month} {orderData.date}, {orderData.year} </p>
                    <p>{userData.public.first_name} {userData.public.last_name}</p>
                    <p>{userData.private.email}</p>
                    <p>{userData.private.address.address} {userData.private.address.appartment}</p>
                    <p>{userData.private.address.city ? userData.private.address.city + ',' : null} {userData.private.address.country} {userData.private.address.postalCode}</p>
                  </div>
                </div>
                <Table className="table--bordered" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Unit Cost</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      this.state.orderData.items.map((i, index) =>
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{i.name}</td>
                        <td>{i.quantity}</td>
                        <td>${i.price}</td>
                        <td>${parseFloat(i.quantity) * parseFloat(i.price)}</td>
                      </tr>
                    )
                    }
                  </tbody>
                </Table>
                <div className="invoice__total">
                  <p>Delivery: ${orderData.deliveryFee}</p>
                  <p>Sub - Total amount: ${orderData.amount}</p>
                  <p className="invoice__grand-total">Grand Total: ${parseFloat(orderData.amount) + parseFloat(orderData.deliveryFee)}</p>
                  <ButtonToolbar className="invoice__toolbar">
                    <Button color="primary">Proceed to payment</Button>
                    <Button>Print</Button>
                  </ButtonToolbar>
                </div>
              </CardBody>
            : null
            }
          </Card>
        </Col>
        </Row>
      </Container>
    )
  }
};

export default OrderDetails;
