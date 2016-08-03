import React , { PropTypes, Component } from 'react';

export default class Posts extends React.Component {
  render() {
  	console.log(this.props)

    return (
    	<div className="container">
    		{this.props.posts.map((pst,i)=>

				<div className="media" >
	                <div className="media-left">
	                  <button className="btn btn-default">
	                    <span className="glyphicon glyphicon-chevron-up"></span>
	                    <span className="vote-count">{pst.vote_count}</span>
	                  </button>
	                  <button className="btn btn-default">
	                    <span className="glyphicon glyphicon-chevron-down"></span>
	                  </button>
	                </div>
	                <div className="media-body">
	                  <h4 className="media-heading"><font color="blue">{pst.title}</font></h4>
	                  <p>{pst.body}</p>
	                </div>
	            </div>
            )}

       </div>
	)
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
