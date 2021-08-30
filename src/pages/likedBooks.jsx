import React, { Fragment, useEffect, useState } from 'react'
import { BookInventory } from '../components/BookInventory'
import { getCurrentUsr } from '../App'
import LoadingOverlay from 'react-loading-overlay'

export function likedBooks() {
    const [loading, setLoading] = useState(true)

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
            
        </div>
        </LoadingOverlay>
    )
}
