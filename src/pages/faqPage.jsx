import React from 'react'
import "../components/styles/Containers.css"

export  function faqPage() {
    return (
        <div className="accDiv" id="accDivQ">
        <br>
        </br>
        <center><h1>Preguntas Frecuentes</h1></center>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ¿Cómo creo un usuario?
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    Puedes crear un usuario dando click en la parte superior, al botón <strong>“registrarse”</strong>. Llenas tus datos y finalmente se crea tu cuenta.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        ¿Cómo inicio sesión?
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Puedes iniciar sesión dando click en la parte superior, al botón <strong>“iniciar sesión”</strong>. Pones tus datos e inicias sesión.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        ¿Cómo añado un libro?
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Para añadir un libro debes haberte creado una cuenta. Después de esto, encontrarás una sección llamada <strong>“mis libros”</strong>. Aquí podrás agregar los libros que quieras intercambiar.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        ¿Para qué sirve el botón de "Me gusta"?
                    </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        El botón de <strong>"me gusta"</strong> te permite indicarle a otro usuario que te gusta alguno de sus libros.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        ¿Qué es la sección "Mis libros"?
                    </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        En la sección <strong>"mis libros"</strong> podrás agregar libros que quieras intercambiar. Adicionalmente, encontrarás los que actualmente tengas subidos a la página para ser intercambiados.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        ¿Qué es la sección "Inicio"?
                    </button>
                </h2>
                <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        En la sección <strong>"inicio"</strong> encontrarás los libros recientemente subidos, sin contar los tuyos.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingSeven">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        ¿Qué es la sección intercambios pendientes?
                    </button>
                </h2>
                <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    En la sección <strong>"intercambios pendientes"</strong> encontrás los usuarios con los cuales hiciste match.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingEight">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        ¿Puedo intercambiar más de dos libros?
                    </button>
                </h2>
                <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    Puedes intercambiar más de dos libros con el mismo usuario siempre y cuando ese usuario también esté interesado en la misma cantidad de libros que tú.
                    </div>
                </div>
            </div>
            
            
        </div>
        </div>

 
    )
}
