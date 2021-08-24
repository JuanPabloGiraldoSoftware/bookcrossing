import React from 'react'
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
export function LikeButton(singleBook) {

    const isSelected = (bookId,traderId)=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "bookId":bookId,
            "traderId": traderId
            });
        console.log(process.env.NODE_ENV);
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/verifySelected` ;
        console.log(baseUrl);
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
            console.log(response.data)
            if(response.data){
                saveSelection(traderId)
            }else{
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
        console.log(process.env.NODE_ENV);
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getUserId` ;
        console.log(baseUrl);
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
                isSelected(singleBook.singleBook.id,response.data.id)
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
        console.log(process.env.NODE_ENV);
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/saveSelection` ;
        console.log(baseUrl);
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
        console.log(process.env.NODE_ENV);
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/verifyMatch` ;
        console.log(baseUrl);
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
    return (
        <div className="select_button"><button id={singleBook.singleBook.id} onClick={getUser}>Me gusta</button></div>
    )
}
