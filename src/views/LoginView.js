import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './styles/signin.scss';

import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            email: '',
            password: '',
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute
        };
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.state.email === "") {
            this.setState({
                email_error_text: null
            })
        } else {

            if (re.test(this.state.email)) {
                email_is_valid = true
                this.setState({
                    email_error_text: null
                })

            } else {
                this.setState({
                    email_error_text: "Sorry, this is not a valid email"
                })
            }
        }

        if (this.state.password === "" || !this.state.password) {
            this.setState({
                password_error_text: null
            })
        } else {

            if (this.state.password.length >= 2) {
                password_is_valid = true;
                this.setState({
                    password_error_text: null
                })
            } else {
                this.setState({
                    password_error_text: "Your password must be at least 6 characters"
                })

            }
        }
  }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled()
        })
    }
   
    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.email, this.state.password, this.state.redirectTo);
    }

    render() {
        return(
       
        <div className="container">
          <form className="form-signin" role="form" >
                <h3 className="form-signin-heading">Login to Your Account</h3>
                {
                    this.props.statusText &&
                    <div className='alert alert-info'>
                        {this.props.statusText}
                    </div>

                }                  
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        onChange={(e) =>this.changeValue(e, 'email')}
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) =>this.changeValue(e, 'password')}
                    />
                    <div className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        onClick={(e) => this.login(e)}
                    >Sign in</button>

          </form>
                <div className="login-help">
          <a href="#">Register</a> - <a href="#">Forgot Password</a>
          </div>
          </div>
        );

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(LoginView)