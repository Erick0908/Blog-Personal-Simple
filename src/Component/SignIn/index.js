//Dependencies
import React, { Component } from 'react';
//import { ButtonInput } from 'react-bootstrap';
//import { Form, ValidatedInput } from 'react-bootstrap-validation';
//styles
import { ToastContainer, toast, ToastMessage  } from 'react-toastify';
import './signin.css';
import swal from 'sweetalert2';


//firebase
import firebase from 'firebase';




class SignIn extends Component{
	//Constructor 
	constructor (props){
		 super(props);

		 this.state = {
			  username:'',
			  nombre:'',
			  apellido:'',
			  password:'',
			  passwordConfirm:''
		 };

		 this.handleChange = this.handleChange.bind(this);
		 this.handleSubmit = this.handleSubmit.bind(this);
	 }
//Funciones para validar 
			handleChange(e) {
				e.target.classList.add('active');

				this.setState({
					[e.target.name]: e.target.value
				});

				this.showInputError(e.target.name);
			}

			handleSubmit(e){
		
			e.preventDefault();
		 
			const { history } = this.props; //Para poder redirecionar

		  //  console.log('component state', JSON.stringify(this.state));

			if (!this.showFormErrors()){
					console.log('form is invalid: do not submit');
					}else{
						console.log('form is valid: submit');
							
						firebase.auth().createUserWithEmailAndPassword(this.state.username,this.state.password)//Agregamos al usuario al sistema
						   .then(result =>{  
								
								this.correoConfirmacion();
								console.log( result.uid );
										firebase.database().ref('users/' + result.uid).set({//Crear usuarios
											username:this.state.username,
											nombre : this.state.nombre,
											apellido: this.state.apellido
										});

							   swal({
									title: 'Registro agregado!!!',
									text: "Le ha sido enviado un mensaje a su correo electronico, confirme por favor",
									type: 'success',
									confirmButtonColor: '#3085d6',
									confirmButtonText: 'Ok'
								  }).then((result) => {
									if (result.value) {
                                       history.push('/Login');
									}
								  })
								})
						   .catch(error => {
							this.error(this.state.username);
							console.error(`Error ${error.code}: ${error.message}`) 
						   })
						
					}
			}


			correoConfirmacion(){
			
					firebase.auth().currentUser.sendEmailVerification().then( sent =>
							console.log("Correo enviado")
						).catch(error => 
									console.log("Problema para enviar el mensaje")
						)


			}

			showFormErrors(){
				const inputs = document.querySelectorAll('input');
				let isFormValid = true;

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
                const isPassword = refName.indexOf('password') !== -1;
				const isPasswordConfirm = refName === 'passwordConfirm';

				if(isPasswordConfirm) {
						if(this.refs.password.value !== this.refs.passwordConfirm.value){
								this.refs.passwordConfirm.setCustomValidity(' Passwords no coinciden ')
						}else{
							this.refs.passwordConfirm.setCustomValidity('');
						}
				}
				
				if (!validity.valid){
						if (validity.valueMissing){
							error.textContent = `${label} Este campo es obligatorio`;
						}else if ( validity.typeMismatch ){
							error.textContent = `${label} Debe ser un correo valido`;     
						}else if (isPassword && validity.patternMismatch) {
							error.textContent = `${label} debe tener al menos 8 caracteres`;
						} else if (isPasswordConfirm && validity.customError){
							error.textContent = 'Password no coinciden'
						}
						return false;
				}

				error.textContent = '';
				return true;
			}
		   
			
			 //Toast
			 sucess(){
				toast.success(` Registro completo satisfactoriamente!!!! `);
			   };
		
			   error(user){
				toast.error(`El usuario ${user} ya existe!!!!`);
			   };
			   
			   warn(){
				toast.warn("Warning Notification !");
			   }
			   
			   info(){
				toast.info("Info Notification !");
			   }
			 


    render(){
				
			
			  
			return (
				
				<div className="row">
		
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
					 

					<div className="col-md-12">
						 <form role="form" method="" action="" noValidate>
							<fieldset className = "field">							
								<h2 className="text-uppercase pull-center signText"  > Registrate </h2>	
								
								<div className="form-group">
								  <label id="usernameLabel" > <span className="col-md-offset-2 text-center"><i className="fa fa-envelope-square bigicon"></i></span>    </label>
									<input className="form-control"
									       type="email" 
										   name="username"
										   ref="username" 
										   value = { this.state.username }
										   onChange = { this.handleChange }
										   className="form-control input-lg" 
										   placeholder="Username" 
										   required
										  />
									<div className="error" id="usernameError" />	  
								</div>
	
								<div className="form-group">
								    <label id="nombreLabel"><span className="col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>   </label>
									<input className="form-control"
									       type="text" 
										   name="nombre" 
										   id="nombre" 
										   ref="nombre" 
										   className="form-control input-lg" 
										   placeholder="Nombre"
										   value = {this.state.nombre}  
										   onChange = { this.handleChange }
										   required 
										   />
										   <div className="error" id="nombreError" />	
								</div>
							
								<div className="form-group">
								<label id="apellidoLabel"><span className="col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span> </label>
									<input className="form-control"   
											type="text" 
											name="apellido" 
											id="apellido" 
											ref="apellido"
											className="form-control input-lg" 
											placeholder="Apellido"
											value = { this.state.apellido }	
											onChange = { this.handleChange }
											required  
										   />
										   <div className="error" id="apellidoError" />	
								</div>
								 
								<div className="form-group">
								  <label id="passwordLabel"> <span className="col-md-offset-2 text-center"><i className="fa fa-unlock bigicon"></i></span> </label>
									<input className="form-control" 
											type="password" 
											name="password" 
											id="password" 
											ref="password"
											className="form-control input-lg" 
											placeholder="Password"
											value ={ this.state.password }
											onChange = {this.handleChange}
											required
											pattern=".{8,}"
											 />
										<div className="error" id="passwordError" />		 
								</div> 

							<div className="form-group">
								  <label id="passwordConfirmLabel">  <span className="col-md-offset-2 text-center"><i className="fa fa-unlock bigicon"></i></span>  </label>
									<input className="form-control" 
											type="password" 
											name="passwordConfirm" 
											id="passwordConfirm" 
											ref="passwordConfirm"
											className="form-control input-lg" 
											placeholder=" Confirm Password"
											value ={ this.state.passwordConfirm }
											onChange = {this.handleChange}
											required
											 />
										<div className="error" id="passwordConfirmError" />		 
								</div> 
								
								<div className="form-check">
									<label className="form-check-label">
									<p> Tiene Cuenta? <a href="/Login" > Iniciar Seccion </a></p>
									</label>
								  </div>
								 <div>  
								 <button className="btn btn-lg btn-primary"
                                       onClick={ this.handleSubmit }> Entrar </button>
										
								 </div>
							</fieldset>
						</form>
					</div>
				</div>
			
		
	
			
			);
    }
}

export default SignIn;