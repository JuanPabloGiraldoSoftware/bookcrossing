import React from 'react'
import "../components/styles/Containers.css"
import lib2 from "../images/libro_a.png";

export  function aboutPage() {
    return (
        <div className="accDiv" id="accDivQ">
        <br>
        </br>
        <center><h1>¿Quienes somos?</h1></center>
        <p>BookCrossing es un sitio web para intercambiar libros usados entre los integrantes de la comunidad Javeriana (sede Cali), podrás
            dar los libros que ya no necesitas a cambio de aquellos libros que realmente quieres.</p>
        <img className= "imagA" src={lib2} class="rounded mx-auto d-block" alt="BookCrossing" ></img>
        </div>

 
    )
}

