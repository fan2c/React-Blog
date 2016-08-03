import React from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../actions/auth';
import { browserHistory } from 'react-router';
import { routeActions } from 'react-router-redux';
import * as actionCreators from '../actions/auth';
import '../styles/core.scss';


function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

class CoreLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    
    dispatchNewRoute(route) {
        browserHistory.push(route);
    }

    logout(e) {
       // e.preventDefult();
        this.props.logoutAndRedirect();
    }

    render () {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">fan2c's Blog</Link>
                        </div>
                        <div id="navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/protected">Protected Content</Link></li>
                                <li><Link to="/login" onClick={() => this.dispatchNewRoute('/login')}>Login</Link></li>
                                {this.props.isAuthenticated
                                 ? <li><a href='#' onClick={(e) => this.logout(e)}>Logout</a></li>
                                 : ''
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(CoreLayout);
