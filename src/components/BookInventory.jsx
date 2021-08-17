import {React} from 'react';
import "./styles/Containers.css"

export function BookInventory({booksList}) {
    
    const userRequest = () => {
        var axios = require('axios');
        var data = JSON.stringify({
        "username": "juan",
        "password": "pablo"
        });

        var config = {
        method: 'post',
        url: 'https://bookcrossing-server.herokuapp.com/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const verifyContent = (book)=>{
        userRequest();
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
