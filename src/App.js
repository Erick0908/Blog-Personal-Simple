//Dependencias
import React, { Component } from 'react';
import PropTypes  from 'prop-types';//Para usar las rutas

import Navigate from './Component/Navigate';
import Header from './Component/Header';
import Footer from './Component/Footer';
//import MainBlog from './Component/MainBlog';




class App extends Component {
   static propTypes ={
      children: PropTypes.object.isRequired
   };

  render() {
   // console.log(Items);
    const { children } = this.props; 
    return (
      <div className = "wrasper">
        <Header />
        <div className = "workspace">
         <Navigate body={children}/> 
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
