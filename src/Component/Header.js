import React, { Component } from 'react';

class Header extends Component {
render(){

 return(
  <header className="masthead" id="img">
    <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1> Soul Note </h1>
              <span className="subheading"> Un Blog informativo de instrumentos Musicales </span>
            </div>
          </div>
        </div>
    </div>
</header>
);
}
}
export default Header;
