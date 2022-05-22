import React, {useEffect, useState } from 'react'
import { BookInventory } from '../components/BookInventory'
import { getCurrentUsr } from '../App'
import LoadingOverlay from 'react-loading-overlay'

export function LikedBooks() {
    const [loading, setLoading] = useState(true)
    const [blist, setBList] = useState([{}])
    const getLikedBooks = (uId) =>{
        var axios = require('axios');
        var data = JSON.stringify({
        "userId": uId,
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getLikedBooks` ;
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
            //console.log('res',response)
            if(response.data){
                //console.log('enter')
               setBList(response.data);
            }else{
                //console.log("Error!");
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
               getLikedBooks(response.data.id)
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
        setTimeout(()=>{
            setLoading(false);
        }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <LoadingOverlay
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
        <div className="title_match_container"><h3>{"Algunos usuarios están interesados en tus libros."}</h3></div>
        <div className="MainDiv">
            <BookInventory booksList={blist} booksTrader={[]} booksOwner={[]} mode={'likedBooks'}/>
        </div>
        </LoadingOverlay>
    )
}
