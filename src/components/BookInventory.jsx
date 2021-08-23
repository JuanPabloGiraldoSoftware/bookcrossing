import {React} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
import {LikeButton} from './LikeButton'

export function BookInventory({booksList}) {

    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()=== owner){
                return;
            }
            const buttonLike = getCurrentUsr()!== owner?<LikeButton singleBook={book}/>:null
           return (
           <div className="col-2 singlebook_container">
            <h4 style={{color:"yellow"}}>{book.title}</h4>
            <ul>
                <li><b>Autor:</b> {book.author}</li>
                <li><b>Idioma:</b> {book.language}</li>
                <li><b>Género:</b> {book.gender}</li>
                <li><b>Año:</b> {book.year}</li>
                <li><b>Usuario:</b> {owner}</li>
            </ul>
            {buttonLike}
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
