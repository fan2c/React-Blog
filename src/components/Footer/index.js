import React from 'react';

import { styles } from './styles.scss';

export class Footer extends React.Component {
    render() {

        return (
            <footer className={`${ styles }`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <p>© fan2c 2016</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
