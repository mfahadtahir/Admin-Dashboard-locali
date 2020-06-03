import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';
import {auth} from '../LogIn/Firebase/auth'

import LogIn from '../LogIn/components/LogInForm';
import ForgetPass from '../LogIn/components/ForgetPass';
import SignUp from '../LogIn/components/SignUpForm';
import Dashboard from '../Dashboard/index';
import Products from '../Products/index';
import UpcommingOrders from '../Orders/UpcommingOrders'
import PastOrders from '../Orders/PastOrders'
import OrderDetails from '../Orders/OrderDetail';


class wrappedRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, userInfo: {}, loaded: false }
  }
  
  componentDidMount(){
    auth.onAuthStateChanged((user) => { 
      if(user){
        console.log("User : " ,user);
        this.setState({ isAuthenticated: true, userInfo: user, loaded: true})
      }
      else {
        console.log("No User Exists");
        this.setState({ isAuthenticated: false , loaded: true})
      }
    })
  }
  render(){

    return(
      <div>
        {auth.currentUser ?
        <> 
        <Layout />
        <div className="container__wrap">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/products" component={Products} />
              <Route path="/orders/upcomming" component={UpcommingOrders} />
              <Route path="/orders/past" component={PastOrders} />
              <Route path='/orders/details/:buid/:id' component={OrderDetails} />
            </Switch>
        </div></>
            :
        <div className={`load loaded'}`}>
          <div className="load__icon-wrap">
            <svg className="load__icon">
              <path fill="#88C24E" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
          </div>
        </div>
          } 
      </div>
    )
  }
}
const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route exact path="/forgetPass" component={ForgetPass} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
