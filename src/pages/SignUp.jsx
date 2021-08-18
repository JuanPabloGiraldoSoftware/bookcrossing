import React from 'react'
import { useHistory } from "react-router-dom";

export function SignUp() {
    let history = useHistory();
    const signupRequest = () => {
        const usr = JSON.stringify(document.getElementById('userField').value);
        const pass = JSON.stringify(document.getElementById('passwordField').value);
        const email = JSON.stringify(document.getElementById('mailField').value);
        const cel = JSON.stringify(document.getElementById('celField').value);
        var axios = require('axios');
        var data = JSON.stringify({
        "username": usr,
        "password": pass,
        "email": email,
        "cel": cel
        });
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/signup':'https://bookcrossing-server.herokuapp.com/signup' ;
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
            response? history.push("/login"):console.log("signup error!")
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        <div className = "login_container">
            <h2>Sign Up</h2>
            <input id="userField" type="text" placeholder="Usuario"></input>
            <input id="passwordField" type="text" placeholder="Contraseña"></input>
            <input id="mailField" type="text" placeholder="Correo"></input>
            <input id="celField" type="text" placeholder="Cel."></input>
            <button onClick={signupRequest}>Sign Up</button>
        </div>
    )
}
