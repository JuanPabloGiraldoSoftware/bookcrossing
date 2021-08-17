import { React} from 'react';
import { MainTitleContainer } from '../components/MainTitleContainer';
import "../components/styles/Containers.css"

const userRequest = () => {
    const usr = document.getElementById('userField').value;
    const pass = document.getElementById('passwordField').value;
    var axios = require('axios');
    var data = JSON.stringify({
    "username": usr,
    "password": pass
    });

    var config = {
    method: 'post',
    url: 'http://localhost:4000/login',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

export function Login(){
    return (<div className = "bordering">
        <MainTitleContainer/>
        <div className="login_container">
            <h2>Login</h2>
            <input id="userField" type="text" placeholder="Usuario"></input>
            <input id="passwordField" type="password" placeholder="Contraseña"></input>
            <button onClick={userRequest}>Login</button>
        </div>

    </div>
    )
}