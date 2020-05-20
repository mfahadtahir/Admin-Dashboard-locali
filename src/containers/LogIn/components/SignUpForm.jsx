import React, { PureComponent } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import { SignUpCall } from '../Firebase/auth'
import logoImg from '../../../shared/img/logo/Locali_Logo.png'
import ErrorAlert from './ErrorList';
// import Alert from '../../../shared/components/Alert'
class SignUpForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      error: null,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };
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
                  <span className="account__logo-accent"> <img alt='' height='50' src={logoImg} /></span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">Your Journey Begins here</h4>
            </div>
            {this.state.error ?
                <ErrorAlert message={this.state.error.message}/>
              : null
            }
            {/* <ErrorList /> */}
            <form className="form">
              <div className="form__form-group">
                <span className="form__form-group-label">User Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="User Name"
                    id="reg-username"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">User Email</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    id="reg-email"
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
                    id='reg-pass'
                  />
                  <button
                    className={`form__form-group-button${showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                    type="button"
                  ><EyeIcon />
                  </button>
                </div>
              </div>

              <a href='!#' className="btn btn-primary account__btn account__btn--small" style={{marginTop: 20}} onClick={(event) => SignUpCall(event, (err) => this.addError(err))} >
                Register Now</a>
            </form>
              <div className="account__have-account">
              <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
