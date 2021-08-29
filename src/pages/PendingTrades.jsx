import React, { useEffect, useState } from 'react'
import { BookInventory } from '../components/BookInventory'
import { getCurrentUsr } from '../App'

export function PendingTrades() {

    const [[bOwner,bTrader], setBooks] = useState([[],[]]);
    const getAllMatchBooks = (userID) =>{
        var axios = require('axios');
        var data = JSON.stringify({
        "userId": userID,
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getallMatches` ;
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
               const mappedUsers = response.data[0];
               const matchedUsers = response.data[1];
               console.log('response on front',response.data);
               console.log('mappedUsers on front', mappedUsers)
               console.log('matchedUsers on front', matchedUsers)
               for (let i = 0; i < matchedUsers.length; i++) {
                    console.log('booksTrad',mappedUsers[`${matchedUsers[i]}-->${userID}`])
                    console.log('booksOwn',mappedUsers[`${userID}-->${matchedUsers[i]}`])
                    setBooks([mappedUsers[`${matchedUsers[i]}-->${userID}`],mappedUsers[`${userID}-->${matchedUsers[i]}`]])
               }

            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const getUser = () =>{
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
               getAllMatchBooks(response.data.id)
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            {(bTrader.length || bOwner.length)?<BookInventory booksList = {[]} booksTrader = {bTrader} booksOwner = {bOwner}/>:null}
        </div>
    )
}
