import { React, useState, useEffect} from 'react';
import {AddBooks} from './pages/AddBooks';
import {EmptyHome} from './pages/EmptyHome'
import {BrowserRouter as Router, Switch, Route, Link,useHistory, Redirect} from 'react-router-dom'
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import "./components/styles/Containers.css"

var currentUSR="none"

export const getCurrentUsr=()=>{
    return currentUSR;
}

const useStyles = makeStyles((theme)=>({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    textField:{
        width:'100%',
    },
    button:{
        textAlign: 'center'
    }
}))

export function App(){
    const styles = useStyles();
    let defaultSessionText='You must login to use this app!'
    const [currentModal, setModal] = useState('none');
    const [currentSession, setSession]= useState(defaultSessionText); 

    const openModalSignUp = ()=>{
        setModal('Signup')
    }

    const openModalSignupSucced= ()=>{
        setModal('Succed')
    }

    const openModalLogin= ()=>{
        setModal('Login')
    }

    const openModalLoginSucced= ()=>{
        setModal('SuccedL')
    }

    const openModalLoginFailed= ()=>{
        setModal('FailedL')
    }
    const closeAnyModal=()=>{
        setModal('none')
    }
    let history = useHistory();
    console.log(history)
    const userRequest = () => {
        const usr = document.getElementById('userFieldL').value;
        const pass = document.getElementById('passwordFieldL').value;
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
                setModal("SuccedL")
                setSession(usr);
                currentUSR=usr;
                document.getElementById("loginButton").style.visibility = "hidden"
                document.getElementById("signupButton").style.visibility = "hidden"
                document.getElementById("logoutButton").style.visibility = "visible"
                document.getElementById("addSection").style.visibility = "visible"
                document.getElementById("homeSection").style.visibility = "visible"
            }else{
                setModal("FailedL")
                console.log("Unexistent User!");
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const signupRequest = () => {
        const usr = JSON.stringify(document.getElementById('userFieldS').value);
        const pass = JSON.stringify(document.getElementById('passwordFieldS').value);
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
            if(response){
                closeAnyModal();
                setModal("Succed")
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const logout = ()=>{
        setSession(defaultSessionText);
        document.getElementById("loginButton").style.visibility = "visible"
        document.getElementById("signupButton").style.visibility = "visible"
        document.getElementById("logoutButton").style.visibility = "hidden"
        document.getElementById("addSection").style.visibility = "hidden"
        document.getElementById("homeSection").style.visibility = "hidden"
    }

    const modalSingup = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Signup</h2>
           </div>
           <TextField id="userFieldS" label="Usuario" className={styles.textField}/>
           <br/>
           <TextField id="passwordFieldS" label="Contraseña" className={styles.textField} type="password"/>
           <br/>
           <TextField id="mailField" label="Correo" className={styles.textField}/>
           <br/>
           <TextField id="celField" label="Cel." className={styles.textField}/>
           <br/> <br/>
           <div align='right'>
           <Button color="primary" onClick={signupRequest}>Registrarse</Button>
           <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
           </div>
        </div>
    )
    const modalSuccessSignup = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Signup Success!</h2>
           </div>
           <div align='center'>
           <Button onClick={()=>closeAnyModal()}>Cerrar</Button>
           </div>
        </div>
    )
    const modalSuccessLogin = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Login Success!</h2>
           </div>
           <div align='center'>
           <Button onClick={()=>closeAnyModal()}>Cerrar</Button>
           </div>
        </div>
    )

    const modalFailedLogin = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Unexistent User!</h2>
           </div>
           <div align='center'>
           <Button onClick={()=>closeAnyModal()}>Cerrar</Button>
           </div>
        </div>
    )
       const modalLogin = (
           
        <div className={styles.modal}>
        <div align='center'>
            <h2>Login</h2>
        </div>
        <TextField id="userFieldL" label="Usuario" className={styles.textField}/>
        <br/>
        <TextField id="passwordFieldL" label="Contraseña" className={styles.textField} type="password"/>
        <br/> <br/>
        <div align='right'>
        <Button color="primary" onClick={userRequest}>Autenticar</Button>
        <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
        </div>
     </div>)
      useEffect(()=>{
        document.getElementById("logoutButton").style.visibility = "hidden"
        document.getElementById("addSection").style.visibility = "hidden"
        document.getElementById("homeSection").style.visibility = "hidden"
        document.getElementById("blank").style.visibility = "hidden"
    }, []);
    return (<div className = "bordering">
    <div className="title_container">
            <h1>Bookcrossing</h1>
            <div className="session_container">
                {currentSession!==defaultSessionText?<h4>Welcome,</h4>:null}
                <h4>{currentSession!==defaultSessionText?currentSession.toUpperCase():currentSession}</h4>
            </div>
    </div>
    <Modal
        open={currentModal==='Signup'}
        onClose={openModalSignUp}>
        {modalSingup}
        </Modal>
        <Modal
        open={currentModal==='Succed'}
        onClose={openModalSignupSucced}>
        {modalSuccessSignup}
        </Modal>
        <Modal
        open={currentModal==='Login'}
        onClose={openModalLogin}>
        {modalLogin}
        </Modal>
        <Modal
        open={currentModal==='SuccedL'}
        onClose={openModalLoginSucced}>
        {modalSuccessLogin}
        </Modal>
        <Modal
        open={currentModal==='FailedL'}
        onClose={openModalLoginFailed}>
        {modalFailedLogin}
        </Modal>
    <div>
        <Button id="logoutButton" className={styles.button} onClick={()=>logout()}>Logout</Button>
        <Button id="loginButton" className={styles.button} onClick={()=>openModalLogin()}>Login</Button>
        <Router>
            {currentSession===defaultSessionText? <Redirect to={"/"}/>:null}
            <Button id="signupButton" className={styles.button} onClick={()=>openModalSignUp()}>Signup</Button>
            <Link id="homeSection" to={"/home"}>HOME</Link>
            <Button id="blank" className={styles.button}>Logout</Button>
            <Link id="addSection" to={"/addbooks"}>ADD BOOKS</Link>
            <Switch>
            <Route exact path="/home" component={EmptyHome}/>
            <Route path="/addbooks" component={AddBooks}/>
            </Switch>
        </Router>

    </div>
    </div>
    )
}