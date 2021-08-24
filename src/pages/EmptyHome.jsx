import React, {useState, useEffect} from 'react'
import { BookInventory } from '../components/BookInventory'


export function EmptyHome() {
    const [blist, setBlist] = useState([{}])
    const userRequest = () => {
        var axios = require('axios');
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/getallbooks':'https://bookcrossing-server.herokuapp.com/getallbooks' ;
        console.log(baseUrl);
        var config = {
        method: 'get',
        url: baseUrl,
        headers: { 
            'Content-Type': 'application/json'
        }
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                setBlist(response.data.reverse());
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    useEffect(() => {
        userRequest();
    }, [])
    return (
        <div>
            <BookInventory booksList={blist}/>
        </div>
    )
}
