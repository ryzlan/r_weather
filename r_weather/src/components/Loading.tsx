import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
    state = {  }
    render() { 
        return (<div className="loading_container">
                    <h1>Loading Weather ...</h1>
                <ReactLoading type='spinningBubbles' color="#fff" />
        </div>);
    }
}
 
export default Loading;