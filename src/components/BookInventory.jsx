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
                    <li>{book.Author}</li>
                    <li>{book.Language}</li>
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
