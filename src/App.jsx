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
        color: "white",
        borderRadius: "100px",
        marginLeft: "1%"

        }
}))

export function App(){
    const styles = useStyles();
    let defaultSessionText='Inicie sesión para usar la aplicación!'
    const [currentModal, setModal] = useState('none');
    const [currentSession, setSession]= useState(defaultSessionText); 

    const openModalSignUp = ()=>{
        setModal('Signup')
    }

    const openModalLogin= ()=>{
        setModal('Login')
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/login` ;
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
                closeAnyModal();
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
        const usrRaw = document.getElementById('userFieldS').value;
        const usr = JSON.stringify(usrRaw);
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/signup` ;
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
                setSession(usrRaw);
                currentUSR=usrRaw;
                document.getElementById("loginButton").style.visibility = "hidden"
                document.getElementById("signupButton").style.visibility = "hidden"
                document.getElementById("logoutButton").style.visibility = "visible"
                document.getElementById("addSection").style.visibility = "visible"
                document.getElementById("homeSection").style.visibility = "visible"
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

    const caseInsensitiveL = ()=>{
        const tfUserL = document.getElementById('userFieldL')
        const tfPassL= document.getElementById('passwordFieldL')
        tfUserL.value = tfUserL.value.toLowerCase();
        tfPassL.value = tfPassL.value.toLowerCase();
    }
    const caseInsensitive = ()=>{
        const tfUser = document.getElementById('userFieldS')
        const tfPass= document.getElementById('passwordFieldS')
        const tfMail = document.getElementById('mailField')
        const tfCel= document.getElementById('celField')

        tfUser.value = tfUser.value.toLowerCase();
        tfPass.value = tfPass.value.toLowerCase();
        tfMail.value = tfMail.value.toLowerCase();
        tfCel.value = tfCel.value.toLowerCase();
    }

    const modalSingup = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Signup</h2>
           </div>
           <TextField id="userFieldS" label="Usuario" className={styles.textField} onChange={caseInsensitive}/>
           <br/>
           <TextField id="passwordFieldS" label="Contraseña" className={styles.textField} type="password" onChange={caseInsensitive}/>
           <br/>
           <TextField id="mailField" label="Correo" className={styles.textField} onChange={caseInsensitive}/>
           <br/>
           <TextField id="celField" label="Cel." className={styles.textField} type="number" onChange={caseInsensitive}/>
           <br/> <br/>
           <div align='right'>
           <Button color="primary" onClick={signupRequest}>Registrarse</Button>
           <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
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
        <TextField id="userFieldL" label="Usuario" className={styles.textField} onChange={caseInsensitiveL}/>
        <br/>
        <TextField id="passwordFieldL" label="Contraseña" className={styles.textField} type="password" onChange={caseInsensitiveL}/>
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
    }, []);
    return (<div className = "bordering">
    <div className="title_container">
            <h1>Bookcrossing</h1>
            <div className="session_container">
                {currentSession!==defaultSessionText?<h4>Bienvenido,</h4>:null}
                <h4>{currentSession!==defaultSessionText?currentSession.toUpperCase():currentSession}</h4>
            </div>
    </div>
    <Modal
        open={currentModal==='Signup'}
        onClose={openModalSignUp}>
        {modalSingup}
        </Modal>
        <Modal
        open={currentModal==='Login'}
        onClose={openModalLogin}>
        {modalLogin}
        </Modal>
        <Modal
        open={currentModal==='FailedL'}
        onClose={openModalLoginFailed}>
        {modalFailedLogin}
        </Modal>
    <div>
    <Router>
        <div className="nav_bar">
            <Button id="logoutButton" onClick={()=>logout()} className={styles.button}>CERRAR SESIÓN</Button>
            <Button id="loginButton" onClick={()=>openModalLogin()} className={styles.button}>INICIAR SESISÓN</Button>
            {currentSession===defaultSessionText? <Redirect to={"/"} />:<Redirect to={"/home"}/>}
            <Button id="signupButton" onClick={()=>openModalSignUp()} className={styles.button}>REGISTRARSE</Button>
            <div className="nav_element" id="homeSection"><Link  to={"/home"} style={{color:"white"}}>INICIO</Link></div>
            <div className="nav_element" id="addSection"><Link  to={"/addbooks"} style={{color:"white"}}>MIS LIBROS</Link></div>
        </div>
            <Switch>
            <Route exact path="/home" component={EmptyHome}/>
            <Route path="/addbooks" component={AddBooks}/>
            </Switch>
        </Router>

    </div>
    </div>
    )
}