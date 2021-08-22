import {React, Fragment, useState} from 'react'
import { BookInventory } from './BookInventory';
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
        bookAddingRequest();
    }

    const bookAddingRequest = () => {
        const title = JSON.stringify(document.getElementById("bookTitleField").value);
        const author = JSON.stringify(document.getElementById("bookAuthorField").value);
        const language = JSON.stringify(document.getElementById("bookLanguage").value);
        const gender = JSON.stringify(document.getElementById("bookGender").value);
        const year = JSON.stringify(document.getElementById("bookYear").value);
        const owner = JSON.stringify(getCurrentUsr());
        var axios = require('axios');
        var data = JSON.stringify({
        "title": title,
        "author": author,
        "language": language,
        "gender": gender,
        "year": year,
        "owner": owner
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

    return (<Fragment>
        <div className="body_container">
            <input id="bookTitleField" type="text" placeholder="Título"></input>
            <input id="bookAuthorField" type="text" placeholder="Autor"></input>
            <input id="bookLanguage" type="text" placeholder="Idioma"></input>
            <input id="bookGender" type="text" placeholder="Género Literario"></input>
            <input id="bookYear" type="text" placeholder="Año"></input>
            <button onClick={addBook}>Add</button>
        </div>
        <BookInventory booksList={blist}/>
        </Fragment>
    )
}
