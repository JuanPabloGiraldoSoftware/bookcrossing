import { React} from 'react';
import { useHistory } from "react-router-dom";
import { MainTitleContainer } from '../components/MainTitleContainer';
import "../components/styles/Containers.css"

export function Login(){

    let history = useHistory();

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
        url: 'https://bookcrossing-server.herokuapp.com/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
    
        axios(config)
        .then(function (response) {
            if(response.data){
                console.log("Login Succed!");
                history.push("/addbooks");
            }else{
                console.log("Unexistent User!");
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

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