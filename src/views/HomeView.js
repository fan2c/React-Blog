import React from 'react';
import {Link} from 'react-router';

export default class HomeView extends React.Component {

    render () {
        return (
            <div>
                <h1>the content of blog</h1>
                <p>Attempt to access some <Link to='/protected'>protected content.</Link></p>
            </div>
        );
    }

}
