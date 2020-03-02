//Depnedencias
import React from 'react';
import { render } from 'react-dom';
import {  BrowserRouter as Router } from "react-router-dom";

//Firebase
import firebase from 'firebase';

//Rutas
import AppRoutes from './routes';


import registerServiceWorker from './registerServiceWorker';

//Estilos
import  './Component/Styles/css/clean-blog.css';
import  './Component/Styles/vendor/bootstrap/css/bootstrap.min.css';
import  './Component/Styles/vendor/font-awesome/css/font-awesome.min.css';
import './index.css';


firebase.initializeApp({

    apiKey: "AIzaSyCf5ASW4WZwKEK6kQrPMA7HUN8OV-avi1k",
    authDomain: "fireblog-c8f06.firebaseapp.com",
    databaseURL: "https://fireblog-c8f06.firebaseio.com",
    projectId: "fireblog-c8f06",
    storageBucket: "fireblog-c8f06.appspot.com",
    messagingSenderId: "453206867344"
});


render(
      <Router>  
          <AppRoutes />
      </Router>,
       document.getElementById('root')
);
registerServiceWorker();
