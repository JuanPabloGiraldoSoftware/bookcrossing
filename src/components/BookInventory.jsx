import {React} from 'react';
import "./styles/Containers.css"

export function BookInventory({booksList}) {
    const verifyContent = (book)=>{
        if(!book.Title || !book.Author || !book.Language){
            return
        }else{
           return(
               <div class="col-3" className="singlebook_container">
                <h2>{book.Title}</h2>
                <ul>
                    <li>{book.Author}</li>
                    <li>{book.Language}</li>
                </ul>
                </div>)
        }
    }
    return (  
        <div class="row">
            {booksList.map((book)=>(
                verifyContent(book)
            ))}
        </div>
    )
}
