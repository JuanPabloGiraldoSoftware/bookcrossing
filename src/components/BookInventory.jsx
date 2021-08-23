import {React} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';

export function BookInventory({booksList}) {
    
    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()=== owner){
                return;
            }
           return(
               <div className="col-2 singlebook_container">
                <h4 style={{color:"yellow"}}>{book.title}</h4>
                <ul>
                    <li><b>Autor:</b> {book.author}</li>
                    <li><b>Idioma:</b> {book.language}</li>
                    <li><b>Género:</b> {book.gender}</li>
                    <li><b>Año:</b> {book.year}</li>
                    <li><b>Usuario:</b> {owner}</li>
                    
                </ul>
                {getCurrentUsr()!== owner?<div className="select_button"><button>Me gusta</button></div>:null}
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
