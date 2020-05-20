import React, { PureComponent } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import { SignInCall } from '../Firebase/auth'
import logoImg from '../../../shared/img/logo/Locali_Logo.png'
import ErrorAlert from './ErrorAlert';

class LogInForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      error: null,
    };
  }
  addError = error => {
    console.log("Adding an Error", error);
    this.setState({error});
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

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
                <ErrorAlert message={this.state.error.message}/>
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
                    id="login-email"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <KeyVariantIcon />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    id='login-pass'
                  />
                  <button
                    className={`form__form-group-button${showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                    type="button"
                  ><EyeIcon />
                  </button>
                </div>
                <div className="account__forgot-password">
                  <a href="/">Forgot a password?</a>
                </div>
              </div>
              <a href='!#' className="btn btn-primary account__btn account__btn--small" style={{marginTop: 20}} 
              onClick={(event) => SignInCall(event, (err) => this.addError(err))} >Sign In</a>
              <Link className="btn btn-outline-primary account__btn account__btn--small" to="/sign_up">Create Account</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInForm;
