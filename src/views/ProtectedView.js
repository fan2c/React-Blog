import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';
import QuestionForm from '../components/QuestionForm';
import Posts from '../components/Posts';


function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        isFetching: state.data.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}


class ProtectedView extends React.Component {
    
    constructor(props) {
        super(props)

    }
    
    componentWillMount() {
        this.fetchData();
    }

    fetchData () {
        let token = this.props.token;
        this.props.fetchProtectedData(token);
    }

    render () {
        var posts = this.props.data.data
        
        //var dataArray = new Array;
        //for(var o in posts){
        //    dataArray.push(posts[o]);
        //}
        //console.log(this.props.data.data)
        //this.props.data.data.map((pst)=>console.log(pst.author))
        
        return (
            <div>
                {this.props.isFetching === true
                    ? <h1>Loading data...</h1>
                    : <div>
                        <h1>Welcome back,
                            {this.props.userName}!</h1>
                        
                        <QuestionForm author_id={this.props.id} />

                        <Posts posts={posts} />
                    </div>
                }
            </div>
        );
    }
}
export default connect(
    mapStateToProps, 
    mapDispatchToProps)(ProtectedView);