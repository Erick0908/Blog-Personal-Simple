//Dependencias
import React from 'react';
import { Route, Switch } from 'react-router-dom';//Para las rutas

//Componentes
import App from './App'; //Donde se renderiza la aplicacion
import Login from './Component/Login';
import SignIn from './Component/SignIn';
import About from './Component/About';
import MainBlog from './Component/MainBlog';
import Details from './Component/Details';
import  AddBlog  from  './Component/AddBlog';
import  Posted  from './Component/Posted';
import Page404 from './Component/Page404';

const AppRoutes = () =>
     <App>
          <Switch>
                <Route  path="/about" component = {About} />
                <Route  path="/login" component = {Login} />
                <Route  path="/signIn" component = {SignIn} />
                <Route  path="/login" component=  {Login} />
                <Route  path="/details/:postId" component=  {Details} />
                <Route  path = "/addBlog" component= {AddBlog} />
                <Route  path = "/posted" component= {Posted} />
                <Route  path="/" component = {MainBlog} />
                <Route component = {Page404} />
          </Switch>
     </App>

export default AppRoutes;