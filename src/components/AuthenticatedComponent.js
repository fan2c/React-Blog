import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        id: state.auth.id,
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props
                    .browserHistory.push('/')
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }    

    return connect(
        mapStateToProps,
        mapDispatchToProps)(AuthenticatedComponent);

}
