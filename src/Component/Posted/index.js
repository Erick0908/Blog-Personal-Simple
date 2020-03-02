//Dependencies
import React, { Component } from 'react';

//firebase
import firebase from 'firebase';

//style
import swal from 'sweetalert2';


class Posted extends Component{
      
    constructor ( props ){
        super(props);
          
        this.state = {
           contacts: []
        }


       this.signOut = this.signOut.bind(this);
       this.removeData = this.removeData.bind(this);
    }
    

     componentWillMount(){//Recuperar Datos
        let res = [];
        var that = this;

        firebase.auth().onAuthStateChanged(function(user) {
      
            
                    if (user) {
                        let id = user.uid;
                        var query = firebase.database().ref('user-posts'+id).orderByKey();
                        query.once("value")
                                .then(function(snapshot) {
                                    snapshot.forEach(function(childSnapshot) {
                                    
                                    // key will be "ada" the first time and "alan" the second time
                                    var key = [childSnapshot.key];
                                    // childData will be the actual contents of the child
                                    var childData = childSnapshot.val();
                                        res.push(childData);
                                    //   console.log (childData.tituloPrincipal);
                                    //   console.log(key);
                                    //   console.log(childData);
                                    });         
                                    }).then( function() {
                                            that.setState({
                                                contacts : res
                                            })
                                    })//Fin del then sin functtion
                    }//Fin del If
          }); //Fin del firebase AuthChange

     }

   
     removeData(idData){ //Eliminar Data
        var query ;
               
        firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
                let id = user.uid;

                swal({
                    title: 'Esta seguro que desea eliminarlo?',
                    text: "No lo podra recuperar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.value) {
                        
                        firebase.database().ref('posts1').child(idData).remove();
                        firebase.database().ref('user-posts'+id).child(idData).remove();
                        window.location.reload();
                    }
                  })
            }

            
        })
     }


    signOut(){
        firebase.auth().signOut().then( user =>
            console.log("El usuario fue deslogueado")
        ).catch(error =>
            console.error("El usuario no fue deslogueado")
        )   
    }
    
    verificar(){//Para proteger la ruta
      
        this.check();

     }
   
     check(){//Proteger la ruta
       const { history } = this.props;
       firebase.auth().onAuthStateChanged(function(user) {
         
           if (user) {
             // User is signed in.
             console.log ("Estamos conectado");
             
           } else {
             console.log("No estamos conectado");  
             history.push('/Login');  
           }
            
         });
     }
      

    render(){

        this.verificar();

        const data = this.state.contacts.map((name, key ) => { //Constante para renderizar los datos en la vista 
             console.log(name);
            return(
                
                <tbody>
                        <tr>
                        <th scope="row">{key+1}</th>
                        <td> {name.tituloPrincipal} </td>
                        <td> {name.date}  - {name.id}</td>
                        <td>
                            <button onClick = {this.removeData.bind(this, name.id)} className="btn btn-outline-danger btnEliminar">
                                <i className="fa fa-trash"></i> Borrar
                            </button> 
                        </td>
                    </tr>  
            </tbody>
         )

        })//Fin de la constante
        
        

      return(

        <div className="container">
             
             <nav className="navbar navbar-expand-lg navbar-inverse  fixed-top" id="mainNav" >
                            
                            <a className="navbar-brand" href="index.html"> Soul Note </a>
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                Menu
                                <i className="fa fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive" >
                                <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/addBlog"> Crear Publicacion </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/posted'> Publicaciones </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/login' onClick={this.signOut}> Salir </a>
                                </li>
                                </ul>
                                
                            </div>
                           
                     </nav>
     
     
              <div className="row">

              <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Fecha</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>       
                              {data} {/* Cuerpo de la tabla */}
                    </table>   

               </div>
            </div>    
     
     );

    }
}

export default Posted;