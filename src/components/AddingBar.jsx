import {React, Fragment, useState} from 'react'
import { BookInventory } from './BookInventory';
import "./styles/Containers.css"

let id = 0;
export function AddingBar() {
    const [blist, setBlist] = useState([{}])
    const addBook = ()=>{
        console.log("Clicked");
        blist.push(
            {
                Title: document.getElementById("bookTitleField").value,
                Author: document.getElementById("bookAuthorField").value,
                Language: document.getElementById("Language").value
            }
        )
        setBlist((prev)=>{
            return [... prev, {id, blist, completed: false}]
        });
        id+=1;
    }
    return (
        <Fragment>
        <div className="body_container">
            <input id="bookTitleField" type="text" placeholder="Título"></input>
            <input id="bookAuthorField" type="text" placeholder="Autor"></input>
            <input id="Language" type="text" placeholder="Idioma"></input>
            <button onClick={addBook}>Add</button>
        </div>
        <BookInventory booksList={blist}/>
        </Fragment>
    )
}
