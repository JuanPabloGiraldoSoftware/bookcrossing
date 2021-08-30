import {React} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';

export function YourBooks({booksList}) {
    
    const deleteBook = (bookId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
        "bookId": bookId,
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/deleteBook` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                console.log('book deleted!')
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()!== owner){
                return;
            }
           return(
               <div className="col-2 singlebook_container">
                <h4 style={{color:"#E85654"}}>{book.title}</h4>
                <ul>
                    <li><b>Autor:</b> {book.author}</li>
                    <li><b>Idioma:</b> {book.language}</li>
                    <li><b>Género:</b> {book.gender}</li>
                    <li><b>Año:</b> {book.year}</li>
                    
                </ul>
                <div className="select_button"><button onClick={()=>deleteBook(book.id)}>Eliminar</button><button>Editar</button></div>
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
