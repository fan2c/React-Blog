import React from 'react';

export default class Posts extends React.Component {
  render() {
  	
    console.log(this.props)

    return (
       <ul>
        	{this.props.posts.map((pst,i)=>
        		<li key={i}>{pst.body}</li>
        	)}
       </ul>
	)
  }
}