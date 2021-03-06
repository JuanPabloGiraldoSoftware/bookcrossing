import {React, Fragment, useState} from 'react'
import { YourBooks } from './YourBooks'
import {getCurrentUsr} from '../App';
import "./styles/Containers.css"

let id = 0;
export function AddingBar() {
    const [blist, setBlist] = useState([{}])
    const addBook = ()=>{
        blist.push(
            {
                title: document.getElementById("bookTitleField").value,
                author: document.getElementById("bookAuthorField").value,
                language: document.getElementById("bookLanguage").value,
                gender: document.getElementById("bookGender").value,
                year: document.getElementById("bookYear").value,
                owner: getCurrentUsr()
            }
        )
        setBlist((prev)=>{return [...prev,{id, blist, completed: false}]});
        id+=1;
        refreshMyBooks("add");
    }
    const refreshMyBooks = (operation) =>{
        const username = getCurrentUsr();
        var axios = require('axios');
        var data = JSON.stringify({
        "username": username,
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getUserId` ;
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
                operation==="add"?bookAddingRequest(response.data.id):getUserBooks(response.data.id);
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const bookAddingRequest = (uId) => {
        const title = JSON.stringify(document.getElementById("bookTitleField").value);
        const author = JSON.stringify(document.getElementById("bookAuthorField").value);
        const language = JSON.stringify(document.getElementById("bookLanguage").value);
        const gender = JSON.stringify(document.getElementById("bookGender").value);
        const year = JSON.stringify(document.getElementById("bookYear").value);
        const ownerId = JSON.stringify(uId);
        const owner = JSON.stringify(getCurrentUsr());
        var axios = require('axios');
        var data = JSON.stringify({
        "title": title,
        "author": author,
        "language": language,
        "gender": gender,
        "year": year,
        "owner": owner,
        "ownerId": ownerId
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/addingbooks` ;
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
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
        
    }

    const getUserBooks = (uId) => {
        const ownerId = JSON.stringify(uId);
        var axios = require('axios');
        var data = JSON.stringify({
        "userId": ownerId
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getBooksFromUser` ;
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
                setBlist(response.data)
                id+=1;
                
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
        
    }
    if(blist.length>=1){
        refreshMyBooks("refresh")
    }
    return (<Fragment>
        <div className="body_container">
            <input id="bookTitleField" type="text" placeholder="T??tulo"></input>
            <input id="bookAuthorField" type="text" placeholder="Autor"></input>
            <input id="bookLanguage" type="text" placeholder="Idioma"></input>
            <input id="bookGender" type="text" placeholder="G??nero Literario"></input>
            <input id="bookYear" type="text" placeholder="A??o"></input>
            <button onClick={addBook}>Agregar Libro</button>
        </div>
        <YourBooks booksList={blist}/>
        </Fragment>
    )
}
