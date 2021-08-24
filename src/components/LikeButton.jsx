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
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/verifySelected':'https://moody-hound-69.loca.lt/verifySelected' ;
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
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/getUserId':'https://moody-hound-69.loca.lt/getUserId' ;
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
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/saveSelection':'https://moody-hound-69.loca.lt/saveSelection' ;
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
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/verifyMatch':'https://moody-hound-69.loca.lt/verifyMatch' ;
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
