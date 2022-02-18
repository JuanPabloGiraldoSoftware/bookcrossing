import {React, Fragment} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
import {LikeButton} from './LikeButton'

export function BookInventory({booksList, booksTrader, booksOwner, mode}) {
    mode==="likedBooks"?console.log("on likedBooksSection",booksList):console.log("");
    const verifyContent = (book, mode)=>{
        console.log(book)
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            console.log("in build function")
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()=== owner && mode!=='match' && mode!=='likedBooks'){
                return;
            }
            const buttonLike = getCurrentUsr()!== owner?<LikeButton singleBook={book}/>:null
           return (
           <div className="col-2 singlebook_container">
            <h4 style={{color:"#E85654"}}>{book.title}</h4>
            <ul>
                <li><b>Autor:</b> {book.author}</li>
                <li><b>Idioma:</b> {book.language}</li>
                <li><b>Género:</b> {book.gender}</li>
                <li><b>Año:</b> {book.year}</li>
                <li><b>Usuario:</b> {owner}</li>
                {mode==='likedBooks'?<li><b>Interesado:</b> {book.uNam}</li>:null}
            </ul>
            {buttonLike}
            </div>)
        }
    }
    console.log("owner",booksOwner)
    console.log("trader",booksTrader)
    return ( 
        booksList.length>0?
        <div className="row">
            {booksList.map((book)=>(
                verifyContent(book,mode)
            ))}
        </div>:<Fragment>
        <div className="contact_container"><h3>{`Correo Electrónico: ${booksTrader[0].email}, Teléfono: ${booksTrader[0].cel}`}</h3></div>
        <div className="title_container"><h3>{`El usuario ${booksTrader[0].userName} está interesado en tus siguientes libros:`}</h3></div>
        <div className="row">
        {booksOwner.map((book)=>(
            verifyContent(book,'match')
        ))}
        </div>
        <div className="title_container"><h3>{`Tú estas interesado en los siguientes libros de ${booksTrader[0].userName}:`}</h3></div>
        <div className="row">
        {booksTrader.map((book)=>(
            verifyContent(book,'match')
        ))}
        </div>
        </Fragment>
    )
}
