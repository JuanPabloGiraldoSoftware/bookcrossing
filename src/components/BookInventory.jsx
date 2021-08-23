import {React} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"

export function BookInventory({booksList}) {
    
    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language){
            return
        }else{
           return(
               <div className="col-2 singlebook_container">
                <h3 style={{color:"yellow"}}>{book.title}</h3>
                <ul>
                    <li><b>Autor:</b> {book.author}</li>
                    <li><b>Idioma:</b> {book.language}</li>
                    <li><b>Género:</b> {book.gender}</li>
                    <li><b>Año:</b> {book.year}</li>
                    <li><b>Usuario:</b> {book.owner?book.owner:book.userName}</li>
                    
                </ul>
                <div className="select_button"><button>Me gusta</button></div>
                </div>)
        }
    }
    return (  
        <div className="row">
            {booksList.map((book)=>(
                verifyContent(book)
            ))}
        </div>
    )
}
