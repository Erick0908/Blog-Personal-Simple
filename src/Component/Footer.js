import React, { Component } from 'react';

class Footer extends Component {
    constructor (props){
       super(props);
       this.state = { year: new Date().getFullYear() }; //Un objeto con la variable de la feha
    }

render(){
 return(
   <footer>

         <div className="container">
           <div className="row">
             <div className="col-lg-8 col-md-10 mx-auto">
               <ul className="list-inline text-center">
                 <li className="list-inline-item">
                   <a href="https://twitter.com/immzulia?lang=es">
                     <span className="fa-stack fa-lg">
                       <i className="fa fa-circle fa-stack-2x"></i>
                       <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                     </span>
                   </a>
                 </li>
                 <li className="list-inline-item">
                   <a href="https://es-la.facebook.com/AcordesLaCuerda/">
                     <span className="fa-stack fa-lg">
                       <i className="fa fa-circle fa-stack-2x"></i>
                       <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                     </span>
                   </a>
                 </li>
                 <li className="list-inline-item">
                   <a href="https://www.instagram.com/marandsmusic/?hl=es">
                     <span className="fa-stack fa-lg">
                       <i className="fa fa-circle fa-stack-2x"></i>
                       <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                     </span>
                   </a>
                 </li>
               </ul>
               <p className="copyright text-muted">Copyright &copy; Soul Note Blog {this.state.year}</p>
             </div>
           </div>
         </div>
       </footer>
  );
 }
}
export default Footer;
