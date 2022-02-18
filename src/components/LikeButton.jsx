import React, {useEffect, useState} from 'react'
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
import LoadingOverlay from 'react-loading-overlay'
import { Redirect } from 'react-router-dom';

var sendBooks = "";

export function getMatchBooks(){
    return sendBooks;
}

export function LikeButton(singleBook) {
    const [selected, setSelected] = useState(false)
    const [loading, setLoading] = useState(false)
    const [match, setMatch] = useState(false)
    const [unlike, setUnlike] = useState(false)
    const isSelected = (bookId,traderId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "bookId":bookId,
            "traderId": traderId
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/verifySelected`  ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            if(response.data){
                saveSelection(traderId)
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const getUser = (op) =>{
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
                console.log(singleBook.singleBook)
                if(op==="init"){
                    verifyLikedBook(response.data.id)
                }else if(op==='like'){
                    isSelected(singleBook.singleBook.id,response.data.id)
                }else if(op==='unlike'){
                    unlikeBook(response.data.id)
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

    const saveSelection = (usrId)=>{

        var axios = require('axios');
        var data = JSON.stringify({
            "userId": usrId,
            "ownerId": singleBook.singleBook.userId,
            "bookId": singleBook.singleBook.id
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/saveSelection` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                console.log(response.data)
                setSelected(true)
                verifyMatch(usrId)
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const verifyMatch = (traderId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "traderId": traderId,
            "ownerId": singleBook.singleBook.userId,
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/verifyMatch` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            if(response.data){
                console.log(response.data);
                deployMatchedBooks(response.data[0], response.data[1])
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const deployMatchedBooks = (booksOwner,booksTrader)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "booksOwner": booksOwner,
            "booksTrader": booksTrader
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/getBooksById` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            if(response.data){
                sendBooks=response.data;
                console.log(response.data);
                setMatch(true)
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const verifyLikedBook = (id)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "userId": id,
            "bookId": singleBook.singleBook.id,
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/verifyLikedBook` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            console.log(response)
            if(response.data){
                console.log("responseVerify",response.data);
                setSelected(true)
            }else{
                setSelected(false)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const unlikeBook = (id) =>{
        var axios = require('axios');
        var data = JSON.stringify({
            "userId": id,
            "bookId": singleBook.singleBook.id,
            });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/unlikeBook` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            console.log(response)
            if(response.data){
                console.log("responseVerify",response.data);
                setSelected(false)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const triggerLike = () =>{
        getUser('like');
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        }, 2500)
    }

    const triggerUnlike = () =>{
        setUnlike(true)
        getUser('unlike');
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        }, 2500)
    }

    useEffect(() => {
        getUser('init')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        selected?<div className="select_button">
            {unlike?<Redirect to={`/home`} />:null}
            {match?<Redirect to={`/matchview`} />:null}
            <LoadingOverlay
        style = {{width:"100%", height:"100%"}}
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
             <button id={singleBook.singleBook.id} onClick={triggerUnlike}>Ya no me gusta</button>
             </LoadingOverlay></div>:<div className="select_button">
             <LoadingOverlay
        style = {{width:"100%", height:"100%"}}
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
                 <button id={singleBook.singleBook.id} onClick={triggerLike}>Me gusta</button>
                 </LoadingOverlay></div>
    )
}
