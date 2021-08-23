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
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/getUserId':'https://bookcrossing-server.herokuapp.com/getUserId' ;
        console.log(baseUrl);
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                operation==="add"?bookAddingRequest(response.data.id):getUserBooks(response.data.id);
                console.log(response.data.id)
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
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/addingbooks':'https://bookcrossing-server.herokuapp.com/addingbooks' ;
        console.log(baseUrl);
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                console.log("Book correctly added!");
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
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/getBooksFromUser':'https://bookcrossing-server.herokuapp.com/getBooksFromUser' ;
        console.log(baseUrl);
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                console.log(response.data)
                console.log(response.data);
                setBlist(response.data)
                id+=1;
                
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
        
    }
    if(blist.length===1){
        refreshMyBooks("refresh")
    }
    return (<Fragment>
        <div className="body_container">
            <input id="bookTitleField" type="text" placeholder="Título"></input>
            <input id="bookAuthorField" type="text" placeholder="Autor"></input>
            <input id="bookLanguage" type="text" placeholder="Idioma"></input>
            <input id="bookGender" type="text" placeholder="Género Literario"></input>
            <input id="bookYear" type="text" placeholder="Año"></input>
            <button onClick={addBook}>Agregar Libro</button>
        </div>
        <YourBooks booksList={blist}/>
        </Fragment>
    )
}
