import React, { Component } from 'react';


//Datos
import Items from './data';

//firebase
import firebase from 'firebase';

class MainBlog extends Component {
  
   constructor(props){
       super(props);

     this.state = {
       posts : []
     }

   }


  componentWillMount(){
    let res = [];
    var that = this;


         var query = firebase.database().ref('posts1').orderByKey();
                query.once("value")
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                                
                         // key will be "ada" the first time and "alan" the second time
                         var key = [childSnapshot.key];
                           // childData will be the actual contents of the child
                           var childData = childSnapshot.val();
                               res.push(childData);
                           //   console.log (childData.tituloPrincipal);
                              console.log(key);
                               console.log(childData);
                              });         
                             }).then( function() {
                                   that.setState({
                                         posts : res
                                     })
                                })//Fin del then sin functtion
 }



render(){

 const data = this.state.posts.map((item, key ) => { //Constante para renderizar los datos en la vista 
  return(
              <div className="post-preview">
                  <a href={'Details/'+ item.id}>
                      <h2 className="post-title">
                          {item.tituloPrincipal}
                      </h2>
                      <h3 className="post-subtitle">
                            {item.subTitulo}
                      </h3>
                    </a>
                      <p className="post-meta">Publicado por
                      <a href="#"> {item.nombreCompleto} </a>
                        el {item.date}</p> 
                      <hr />
          </div>    
)
})//Fin de la constante
   


 return(

   <div className="container">
        
        <nav className="navbar navbar-expand-lg navbar-inverse  fixed-top" id="mainNav" >
            <div className="container">
              <a className="navbar-brand" href="index.html"> Soul Note </a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fa fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive" >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/"> Inicio </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href='/About'> Quienes Somos </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Login"> Iniciar Seccion </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/SignIn"> Registrate </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>


         <div className="row">
           <div className="col-lg-8 col-md-10 mx-auto">
             
            {data}
                           
          </div>
       </div>
   </div>


);
}
}
export default MainBlog;
