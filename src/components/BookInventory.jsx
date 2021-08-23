import {React} from 'react';
import "./styles/Containers.css"

export function BookInventory({booksList}) {
    
    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language){
            return
        }else{
           return(
               <div className="col-3 singlebook_container">
                <h2>{book.title}</h2>
                <ul>
                    <li><b>Autor:</b> {book.author}</li>
                    <li><b>Idioma:</b> {book.language}</li>
                    <li><b>Género:</b> {book.gender}</li>
                    <li><b>Año:</b> {book.year}</li>
                    <li><b>Usuario:</b> {book.owner?book.owner:book.userName}</li>
                </ul>
                </div>)
        }
    }
    return (  
        <div className="row">
            {booksList.reverse().map((book)=>(
                verifyContent(book)
            ))}
        </div>
    )
}
