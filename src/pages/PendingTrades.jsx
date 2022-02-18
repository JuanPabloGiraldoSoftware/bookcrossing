import React from 'react'
import { BookInventory } from '../components/BookInventory'
import { getCurrentUsr } from '../App'

export function PendingTrades() {
    const getAllMatchBooks = (userID) =>{

    }

    const getUser = () =>{
        const username = getCurrentUsr();
        var axios = require('axios');
        var data = JSON.stringify({
        "username": username,
        });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/getUserId` ;
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
               getAllMatchBooks(response.data)
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    return (
        <div>
            <BookInventory booksList = {[]} booksTrader = {[]} booksOwner = {[]}/>
        </div>
    )
}
