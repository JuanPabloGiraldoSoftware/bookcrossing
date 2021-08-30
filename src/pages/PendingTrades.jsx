import React, { Fragment, useEffect, useState } from 'react'
import { BookInventory } from '../components/BookInventory'
import { getCurrentUsr } from '../App'
import LoadingOverlay from 'react-loading-overlay'

export function PendingTrades() {

    const [[mUsers,mapUsers, uId], setMatch] = useState([[],[],null]);
    const [loading, setLoading] = useState(true)

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
               setMatch([matchedUsers,mappedUsers,userID])
               
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
        setTimeout(()=>{
            setLoading(false);
        }, 5000)
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <LoadingOverlay
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
        <div className="MainDiv">
            {mUsers.map((user)=>(
                <Fragment>
                <div className="title_match_container"><h3>{`Intercambio pendiente con ${mapUsers[`${uId}-->${user}`][0].userName.toUpperCase()}`}</h3></div>
                <BookInventory booksList = {[]} booksTrader = {mapUsers[`${uId}-->${user}`]} booksOwner = {mapUsers[`${user}-->${uId}`]}/>
                </Fragment>
            ))}
        </div>
        </LoadingOverlay>
    )
}
