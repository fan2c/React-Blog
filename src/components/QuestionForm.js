import React , { PropTypes, Component } from 'react';
import * as actionCreators from '../actions/data';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

class QuestionForm extends React.Component {
  	constructor(props){
  		super(props)
    	this.state = {
    		title : '',
    		body : '',
    		formDisplay:true,
    	}
    }

    changeValue(e, type) {
		const value = e.target.value;
		const next_state = {};
		next_state[type] = value;
		this.setState(next_state, () => {
            
        })
    }

    onToggleForm(){
  		this.setState({
  			formDisplay: !this.state.formDisplay,
  		});
  	}

  	addQuestion(e) {
      	e.preventDefault();
      	console.log(this.state.title);
      	console.log(this.state.body);
      	console.log(this.props.author_id);

      	var newQuestion = {
      		title: this.state.title,
      		body: this.state.body,
      		vote_count: 0
      	}
      	this.props.addPost(this.state.title, this.state.body, this.props.author_id);
		this.refs.getDOMNode().value();
		this.props.onNewQuestion(newQuestion);
    }

  	render() {
  		var styleObj={
  			display: this.state.formDisplay? 'block':'none',
  		}

	return (
		<div>
		<button id="add-question-btn" onClick={()=> this.onToggleForm()} className="btn btn-success">添加问题</button>

		<form ref="addQuestion" name="addQuestion" style={styleObj} className="clearfix" >
			  <div className="form-group">
			    <label htmlFor="qtitle"> </label>
			    <input
			    	type="text"
			    	className="form-control"
			    	id="qtitle"
			    	onChange={(e)=>this.changeValue(e, 'title')}
			    	placeholder="您的问题的标题" />
			  	</div>
			  	<textarea
			  		className="form-control"
			  		rows="3"
			  		onChange={(e)=>this.changeValue(e, 'body')}
			  		placeholder="问题的描述">

			  	</textarea>
			  <button className="btn btn-success pull-right" onClick={(e) => this.addQuestion(e)} >确认</button>
			  <a className="btn btn-default pull-right" onClick={()=> this.onToggleForm()} >取消</a>
			</form>
		</div>	
    );
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionForm)