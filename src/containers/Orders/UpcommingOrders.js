import React, {Component} from 'react';
import { Col, Container, Row, Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import {auth} from '../LogIn/Firebase/auth'
import { db }  from '../LogIn/Firebase/firestore'
import DataTable from './DataTable';

class UpcommingOrders extends Component{
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      buisness: [{name: '', id: ''}],
      buisnessTable: {name: '', id: ''},
    };
  }
  componentDidMount(){
    if(auth.currentUser){
      let data = [], id, name;
      db.collection('businesses').where('ownerID', '==' , auth.currentUser.uid).get()
      .then((res) => {
        res.forEach(buisness => {
          console.log( "Response from Server: ", buisness.data().name );
          id = buisness.id;
          name = buisness.data().name;
          data.push({id, name});
        })
        // if(document.getElementById('data-table-wrapper')){
        //   document.getElementById('data-table-wrapper').parentNode.removeChild();
        //   console.log('deleting the old and making new table'); 
        // }
        this.setState({buisness: data, buisnessTable: data[0]});

      })
      .catch(err => console.log(err))
    } 
  }
  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };
  handleState = (table) => {
    console.log('Changing State To: ', table);
    this.setState({buisnessTable: table})
  }
  render(){
    // console.log(this.state.buisness);
    return(
    <Container>
      <Row>
        <Col md={8} lg={9}>
          <h3 className="page-title">Upcomming Orders</h3>
        </Col>
        <Col md={4} lg={3} >


        <div className="buisness">
          <button type="button" className='buisness__avatar' onClick={this.toggle}>
            <p className='buisness__avatar-name' >My Buisness</p>
            <DownIcon className="topbar__icon" />
          </button>
          <Collapse isOpen={this.state.collapse} className="buisness__menu-wrap" >
            <div className="buisness__menu active">
            {this.state.buisness.map((item, key) => 
              <div key={key} className='buisness__link' onClick={() => this.handleState(item)} >
                <span className={`topbar__link-icon lnr lnr-user`} /> {item.name}
              </div>
            )}
            </div>
          </Collapse>
        </div>


        </Col>
      </Row>
      <Row>
        {this.state.buisnessTable.name === '' ? null:
          <DataTable data={this.state.buisnessTable } />
        }
      </Row>
    </Container>
    )
  }
};

export default UpcommingOrders;


        {/* <div id='data-table-wrapper' > */}
        {/* </div> */}