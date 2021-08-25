import React, {useEffect, useState} from 'react'
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
export function LikeButton(singleBook) {
    const [selected, setSelected] = useState(false)
    const isSelected = (bookId,traderId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "bookId":bookId,
            "traderId": traderId
            });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/verifySelected`  ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getUserId` ;
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/saveSelection` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/verifyMatch` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
        };
        axios(config)
        .then(function (response) {
            if(response.data){
                console.log(response.data);
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/verifyLikedBook` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/unlikeBook` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
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
    }

    const triggerUnlike = () =>{
        getUser('unlike');
    }

    useEffect(() => {
        getUser('init')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        selected?<div className="select_button"><button id={singleBook.singleBook.id} onClick={triggerUnlike}>Ya no me gusta</button></div>:<div className="select_button"><button id={singleBook.singleBook.id} onClick={triggerLike}>Me gusta</button></div>
    )
}
