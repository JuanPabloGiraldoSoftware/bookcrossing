import React from 'react'

export function SignUp() {
    return (
        <div className = "login_container">
            <h2>Sign Up</h2>
            <input id="userField" type="text" placeholder="Usuario"></input>
            <input id="passwordField" type="text" placeholder="Contraseña"></input>
            <input id="mailField" type="text" placeholder="Correo"></input>
            <input id="celField" type="text" placeholder="Cel."></input>
            <button >Sign Up</button>
        </div>
    )
}
