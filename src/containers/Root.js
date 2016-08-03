import React from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';
import {ReduxRouter} from 'redux-router';

//import { Header } from 'components/Header';
//import { Footer } from './components/Footer';

export class Root extends React.Component {
    static propTypes = {
        children: React.PropTypes.any
    };
    render () {
        return (
            <section>
                <div className="container">
                    {this.props.children}
                </div> 
            </section>
        );
    }
}
