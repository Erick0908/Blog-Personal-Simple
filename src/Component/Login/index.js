//Dependencies
import React, { Component } from 'react';

//Firebase
import firebase from 'firebase';

//Rutas
import { browserHistory,Redirect } from 'react-router';
import {createHistory,createHashHistory } from 'history/createBrowserHistory';

//style
import './login.css';
import { ToastContainer, toast, ToastMessage  } from 'react-toastify';




class Login extends Component{

    //Constructor 
    constructor (props){
        super(props);

        this.state = {
            user: '',
            password:''
        };
     
       this.handleChange = this.handleChange.bind(this);//Para poder instaciarlo en el componente
       this.handleSubmit = this.handleSubmit.bind(this);
    }
   


    //Funciones para validar
      
    handleChange(e){//Para manejar los cambios
          
        e.target.classList.add('active');//para activar la clase al componente
        
        this.setState({
           [e.target.name]: e.target.value
        });

        this.showInputError(e.target.name);
    }


     handleSubmit(e){
         e.preventDefault();//Para prevenir que se haga automaticamente
         const { history } = this.props; 


        // console.log('component state', JSON.stringify(this.state));//Para ver que llega en los estados

         if (!this.showFormErrors()) { //Saber que hacer si se puede o no
            console.log('form is invalid: do not submit');
          } else {

            console.log('form is valid: submit');////Saber que hacer si se puede o no
            
            firebase.auth().signInWithEmailAndPassword(this.state.user,this.state.password)
               .then(result => {
                             
                            console.log(`${result.user} ha inicado sesion`);
                            

                            if(this.state.user){
                               history.push('/AddBlog');
                            //    this.sucess(this.state.user); 
                            }
                         
               }) //Si funciona
               .catch (error => {
                      console.error(`Error ${error.code}: ${error.message}`);
                      this.error();
                      
            })//Si da error
          }

     }


     showFormErrors() {//Para validar los errores
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;
        
        inputs.forEach(input => {
          input.classList.add('active');
          
          const isInputValid = this.showInputError(input.name);
          
          if (!isInputValid) {
            isFormValid = false;
          }
        });
        
        return isFormValid;
      }

  
      
      showInputError(refName) {//Mostramos lo errores
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        
 
        
        if (!validity.valid) {
          if (validity.valueMissing) {
            error.textContent = `${label} es un campo obligatorio`; 
          } else if (validity.typeMismatch) {
            error.textContent = `El ${label} debe ser un correo valido`; 
          } 
          return false;
        }
        
        error.textContent = '';
        return true;
      }
      
       

       //Toast
      sucess( user ){
        toast.success(`Bienvenido ${user} `);
       };

       error(){
        toast.error("El usuario o password es incorrecto");
       };
       
       warn(){
        toast.warn("Warning Notification !");
       }
       
       info(){
        toast.info("Info Notification !");
       }
     
              
     
    render(){
        

        return ( 
                


          <div className="login">

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

     
           
                 <ToastContainer autoClose={8000} />
                             

                        <div className="col-lg-9 col-lg-offset-3">
                               
                            
                                <div className="inner-form">
                                
                                    <h1 className ="h1">Iniciar Seccion </h1> 
                                
                                    <form role="form" noValidate>
                                        <div className="row">
                                                
                                                <div className="col-lg-12">
                                                  <label htmlFor = "user" id="userLabel" >Usuario</label>
                                                    <div className="form-group">
                                                        <input 
                                                               type="email" 
                                                               name="user" 
                                                               id="user" 
                                                               className="form-control" 
                                                               ref="user"
                                                               value =  {this.state.user}
                                                               onChange = { this.handleChange }
                                                               placeholder="holamundo@gmail.com" 
                                                               required/>
                                                         <div className="error" id="userError" />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-12">
                                                    <label htmlFor = "password" id="passwordLabel"> Contraseña </label>
                                                    <div className="form-group">
                                                        <input 
                                                               type="password" 
                                                               name="password" 
                                                               id="password" 
                                                               ref= "password"
                                                               className="form-control" 
                                                               placeholder="*******"
                                                               value = { this.state.password }
                                                               onChange = { this.handleChange } 
                                                               required />
                                                           <div className="error" id="passwordError" />    
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-12">
                                                    <button type="submit" className="btn btn-default" onClick={ this.handleSubmit }>
                                                        <span>Iniciar Seccion </span>
                                                    </button>
                                                </div>
                                                
                                                <div className="col-lg-12">
                                                    <div className="forgot">
                                                        <p>No tienes cuenta ? <a href="/SignIn" > Registrate </a></p>
                                                    </div>
                                                </div>
                                                    
                                            </div>
                                        </form>
                                
                                    </div> 
                                
                            </div>   
                        </div>                     
        
      );
    }
}

export default Login;