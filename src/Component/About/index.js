//Dependencies
import React, { Component } from 'react';

class About extends Component{
    render(){
        return ( 
           
            <div id="about">
         <nav class="navbar navbar-expand-lg navbar-inverse  fixed-top" id="mainNav" >
            <div class="container">
              <a class="navbar-brand" href="index.html"> Soul Note Blog </a>
              <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fa fa-bars"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive" >
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="/"> Inicio </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href='/About'> Quienes Somos </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/Login"> Iniciar Seccion </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/SignIn"> Registrate </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

            <div className="row">
                 <div className="col-lg-8 col-md-10 mx-auto">
                       <h1> Quienes Somos </h1>
                       <hr/>
                       <p className ="p"> Somos una comunidad de musicos, los cuales nos propusimos hacer un blog para todas aquellas personas que al igual que nosotros se identifican con algun instrumento musical. Este blog es para sociabilizar de cualquier inquietud que tenga relacionado con el tema. </p>
                       


                        <p className ="p">Cabe destacar que la Música es el arte de combinar los sonidos de forma agradable al oído. La música según la definición tradicional del término, 
                        el arte de organizar sensible y lógicamente una combinación coherente de sonidos y silencios utilizando los principios fundamentales de la melodía, la armonía y el ritmo, mediante la intervención de complejos procesos psico-anímicos. </p>
                        <p className ="p">Tambien se puede decir que la <strong>Música </strong>es el arte de combinar los sonidos de la voz humana o de los instrumentos, o unos y otros a la vez, de suerte que produzca recreo al escucharlos, conmoviendo la sensibilidad, ya sea alegre, ya tristemente.</p>
                        <p className ="p">La palabra Música procede del latín Musica, derivada, a su vez, del griego Mousike, palabra esta última que tenía en su origen dos significados: uno general que abarcaba todo lo relacionado con la educación del espíritu
                         (colocada bajo la advocación de las nueve Musas o diosas de las artes), que se complementaba con la educación física o gymnastike, y otro específico de arte sonoro, que es el que ha llegado hasta nosotros.</p>
                        
                        <p className ="p">Este Blog fue creado para que todo tipo de personas pueda estar interesado en hablar de algun instrumento musical con mas personas.</p>
                 </div>
             </div>
             </div>      
      );
    }
}

export default About;