import {React, Fragment, useState, useEffect} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
import {LikeButton} from './LikeButton'

export function BookInventory({booksList, booksTrader, booksOwner}) {
    
    const [[email,cel], setContactInfo] = useState(['','']);

    const getUserContactInfo = (userId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
        "userId": userId,
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getUserById` ;
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
               console.log(response.data)              
               setContactInfo([response.data[0].email, response.data[0].cel])

            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const verifyContent = (book, mode)=>{
        console.log(book)
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            console.log("in build function")
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()=== owner && mode!=='match'){
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
            </ul>
            {buttonLike}
            </div>)
        }
    }
    console.log("owner",booksOwner)
    console.log("trader",booksTrader)
    useEffect(()=>{
        console.log('ownername',booksOwner);
        booksTrader.length>0?
        getUserContactInfo(booksTrader[0].userId):
        console.log('ok');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ( 
        booksList.length>0?
        <div className="row">
            {booksList.map((book)=>(
                verifyContent(book,'home')
            ))}
        </div>:<Fragment>
        <div className="contact_container"><h3>{`Correo Electrónico: ${email}, Teléfono: ${cel}`}</h3></div>
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
