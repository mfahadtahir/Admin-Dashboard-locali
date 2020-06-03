import React, { PureComponent } from 'react';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import { PassReset } from '../Firebase/auth'
import logoImg from '../../../shared/img/logo/Locali_Logo.png'
import ErrorAlert from './ErrorAlert';

class ForgetPass extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }
  addError = error => {
    console.log("Adding an Error", error);
    this.setState({error});
  }

  render() {
    const { showPassword } = this.state;

    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to 
                <span className="account__logo">
                  <span className="account__logo-accent"> <img alt='' height='50' src={logoImg} /> </span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">Start your business easily</h4>
            </div>
            {this.state.error ?
                <ErrorAlert message={this.state.error.message} status={this.state.error.status} />
              : null
            }
            <form className="form">
              <div className="form__form-group">
                <span className="form__form-group-label">User Email</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Email"
                    id="reset-email"
                  />
                </div>
              </div>
              <a href='!#' className="btn btn-primary account__btn account__btn--small" style={{marginTop: 20}} 
              onClick={(event) => PassReset(event, (err) => this.addError(err))} >Send Code To Email</a>
              <Link className="btn btn-outline-primary account__btn account__btn--small" to="/sign_up">Create Account</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPass;
