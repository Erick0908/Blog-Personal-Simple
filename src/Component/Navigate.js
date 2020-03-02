import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigate extends Component {
    static proptypes ={
        body: PropTypes.object.isRequired
     } ;
render(){
   // console.log(this.props);
    const { body,items } = this.props;
 return(
  
        <div className="container">
          { body }
        </div>
);
}
}
export default Navigate;