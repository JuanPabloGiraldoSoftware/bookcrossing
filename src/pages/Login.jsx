import { React} from 'react';
import { useHistory } from "react-router-dom";
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
        console.log(process.env.NODE_ENV);
        var baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:4000/login':'https://bookcrossing-server.herokuapp.com/login' ;
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
    const handleSingUp = () => {
        history.push("/signup")
    }

    return (<div className = "bordering">
        <div className="login_container">
            <h2>Login</h2>
            <input id="userField" type="text" placeholder="Usuario"></input>
            <input id="passwordField" type="password" placeholder="Contraseña"></input>
            <button onClick={userRequest}>Login</button>
            <button onClick={handleSingUp}>Sign up</button>
        </div>

    </div>
    )
}