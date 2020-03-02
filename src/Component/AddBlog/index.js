//Dependencies
import React, { Component } from 'react';

//Eestilos
import { ToastContainer, toast, ToastMessage  } from 'react-toastify';

//style
import swal from 'sweetalert2';

//Rutas
import {createHistory,createHashHistory } from 'history/createBrowserHistory';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";


//Componentes
import Login from '../Login';




//Firebase
import firebase from 'firebase';

class AddBlog extends Component{
    
         constructor ( props ){
                super(props);

                    this.state = {
                        id:'',
                        tituloPrincipal: '',
                        subTitulo: '',
                        nombreCompleto:'',
                        detalle:'',
                        date:''   
                    }
                    
                    this.handleSubmit = this.handleSubmit.bind(this);     
                    this.handleChange = this.handleChange.bind(this);
                    this.check = this.check.bind(this);
                    this.signOut = this.signOut.bind(this);
                    this.WriteNewPost = this.WriteNewPost.bind(this);

            }
   

        handleChange(e){
                e.target.classList.add('active');

                this.setState({
                    [e.target.name]: e.target.value
                });

                this.showInputError(e.target.name);
            }

     
        handleSubmit(e){
                e.preventDefault();

                console.log('component state', JSON.stringify(this.state));
                var user = firebase.auth().currentUser;
               // console.log(user.uid);


                if(!this.showFormErrors()){
                    console.log('form is invalid: do not submit');
                }else{
                    console.log('form is valid: submit');
                             
                    var today = new Date();
                      var  date = today.getDate()+'/'+ (today.getMonth() + 1) +'/'+ today.getFullYear();
 
                        this.WriteNewPost( user.uid , this.state.nombreCompleto ,this.state.detalle, this.state.tituloPrincipal, this.state.subTitulo, date);
                        //this.sucess();
                      //  this.reset();
                      swal({
                        title: 'post agregado!!!',
                        text: "Su Post fue agregado perfectamente",
                        Foncolor:'RED',
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                      }).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                      })
                      
                        
                }
            }
        

            reset(){//Resetear los valores

                
                this.setState({ detalle : '' });
                this.setState({  tituloPrincipal: '' });
                this.setState({  subTitulo: '' });
                this.setState({ nombreCompleto : '' });
                
            }


         showFormErrors(){
                const inputs = document.querySelectorAll('input');
                const textareas = document.querySelectorAll('textarea');
                let isFormValid = true;
                

                textareas.forEach(textarea => {
                    textarea.classList.add('active');

                    const isTextAreaValid = this.showInputError(textarea.name);
                    if (!isTextAreaValid) {
                        isFormValid = false;
                    }
                })

                inputs.forEach( input => {
                    input.classList.add('active');
                    
                    const isInputValid = this.showInputError(input.name);
                    if (!isInputValid) {
                        isFormValid = false;
                    }
                });

                return isFormValid;
            }
            
    
		showInputError(refName){
				const validity = this.refs[refName].validity;
				const label = document.getElementById(`${refName}Label`).textContent;
                const error = document.getElementById(`${refName}Error`);
                const detail = refName.indexOf('detalle') !== -1;

				
				if (!validity.valid){
						if (validity.valueMissing){
							error.textContent = `${label} Este campo es obligatorio`;
						 }else if (detail && validity.patternMismatch) {
							error.textContent = `${label} debe tener al menos 40 caracteres`;
						 } 
						return false;
				}

				error.textContent = '';
				return true;
			}


        WriteNewPost( uid,name,details,title,subtitle,date ){ //Para escribir un nuevo Post
            
           
            var newPostKey = firebase.database().ref().child('posts').push().key;//Para obtener una llave para un post
            var newPostKey2 = firebase.database().ref( 'post' ).child('posts').push().key;//Para obtener una llave para todos los post
           
            var val = newPostKey;

            this.state.id = newPostKey;
            this.state.nombreCompleto = name;
            this.state.tituloPrincipal = title;
            this.state.subTitulo = subtitle;
            this.state.detalle = details;
            this.state.date = date;
           

            var updates = {};
            updates['/posts'+ 1 + '/' + newPostKey ] = this.state;//Lo guardamos todos
            updates ['user-posts' + uid + '/'+ newPostKey] = this.state;//Lo guardamos por personas
            
            return firebase.database().ref().update(updates);

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
                            console.log ("Estamos conectado");
                            } else {
                                console.log("No estamos conectado");  
                                history.push('/Login');  
                            }
                            
                        });
                        
                    }


                    //Toast
                        sucess(){
                            toast.success(` Su informacion fue posteada!!!! `);
                        };
                        


    render(){
     

        this.verificar();
        
        return  (
             
            <div id="AddBlog" >


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
                                    <a className="nav-link" href='/Login' onClick={this.signOut}> Salir </a>
                                </li>
                                </ul>
                                
                            </div>
                           
                     </nav>

    {/* <button onClick = {this.prueba}  > Verificar </button>  */}

        <ToastContainer autoClose={8000} /> 
                    
                <div className="row">
                    <div className="col-md-12">
                        <div className="well well-sm">
                            <form className="form-horizontal" method="post" noValidate  ref="form">
                                <fieldset>
                                    <legend className="text-center header"><h1> Nueva Publicacion </h1> </legend>

                                    <div className="form-group">
                                    <label id="tituloPrincipalLabel"><span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-clipboard bigicon"></i></span>  </label> 
                                        <div className="col-md-12">
                                            <input 
                                                    id="tituloPrincipal" 
                                                    name="tituloPrincipal" 
                                                    ref ="tituloPrincipal"
                                                    value = { this.state.tituloPrincipal }
                                                    onChange = { this.handleChange }
                                                    type="text" 
                                                    placeholder="Titulo Principal" 
                                                    className="form-control" 
                                                    required
                                                    />
                                            <div className="error" id="tituloPrincipalError" />	          
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <label id ="subTituloLabel">  <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-edit bigicon"></i></span>   </label> 
                                        <div className="col-md-12">
                                            <input 
                                                    id="lname" 
                                                    name="subTitulo" 
                                                    ref = "subTitulo"
                                                    type="text"
                                                    value = { this.state.subTitulo }
                                                    onChange = { this.handleChange } 
                                                    placeholder="Sub-titulo" 
                                                    className="form-control"
                                                    required
                                                    />
                                                <div className="error" id="subTituloError" />	           
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label id ="nombreCompletoLabel" > <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>  </label> 
                                        <div className="col-md-12">
                                            <input 
                                                id="phone" 
                                                name="nombreCompleto" 
                                                ref ="nombreCompleto"
                                                value = { this.state.nombreCompleto }
                                                onChange = { this.handleChange }
                                                type="text" 
                                                placeholder="Nombre Completo" 
                                                className="form-control"
                                                required
                                                />
                                                <div className="error" id="nombreCompletoError" />	
                                        </div>
                                    </div>

                                    <div className="form-group">
                                    <label id="detalleLabel"> <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>  </label>  
                                        <div className="col-md-12">
                                            <textarea 
                                                        className="form-control" 
                                                        id="message" 
                                                        name="detalle" 
                                                        ref = "detalle"
                                                        value = { this.state.detalle }
                                                        onChange = { this.handleChange }
                                                        placeholder="ESCRIBIR.........."
                                                        required
                                                        pattern=".{41,}"
                                                        rows="15">
                                            </textarea>
                                            <div className="error" id="detalleError" />	
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12 text-center">
                                            <button 
                                                    type="submit" 
                                                    className="btn btn-primary btn-lg"
                                                    onClick={ this.handleSubmit }>
                                                    Publicar
                                        </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                
            
            </div>
                    
                
        );      
    }

}

export default AddBlog;