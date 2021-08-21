import {React} from 'react';
import "./styles/Containers.css"

export function BookInventory({booksList}) {
    
    const verifyContent = (book)=>{
        if(!book.Title || !book.Author || !book.Language){
            return
        }else{
           return(
               <div className="col-3 singlebook_container">
                <h2>{book.Title}</h2>
                <ul>
                    <li><b>Autor:</b> {book.Author}</li>
                    <li><b>Idioma:</b> {book.Language}</li>
                    <li><b>Género:</b> {book.Gender}</li>
                    <li><b>Año:</b> {book.Year}</li>
                    <li><b>Usuario:</b> {book.Owner}</li>
                </ul>
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
