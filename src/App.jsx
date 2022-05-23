import { React, useState, useEffect} from 'react';
import {AddBooks} from './pages/AddBooks';
import {EmptyHome} from './pages/EmptyHome';
import { MatchView } from './pages/MatchView';
import { faqPage } from './pages/faqPage';
import { aboutPage } from './pages/aboutPage';
import { PendingTrades } from './pages/PendingTrades';
import { LikedBooks } from './pages/likedBooks';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import "./components/styles/Containers.css"
import car1 from "./images/car_1.jpg";
import car2 from "./images/car_2.jpg";
import car3 from "./images/car_3.jpg";
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
    let defaultSessionText='¡Inicia sesión para usar la aplicación!'
    const [currentModal, setModal] = useState('none');
    const [currentSession, setSession]= useState(defaultSessionText);
    const [VisibleBooks, setVisibleBooks]= useState(true);

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
    const userRequest = () => {
        const usr = document.getElementById('userFieldL').value;
        const pass = document.getElementById('passwordFieldL').value;
        var axios = require('axios');
        var data = JSON.stringify({
        "username": usr,
        "password": pass
        });
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/login` ;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                closeAnyModal();
                setSession(usr);
                currentUSR=usr;
                document.getElementById("loginButton").style.visibility = "hidden"
                document.getElementById("signupButton").style.visibility = "hidden"
                document.getElementById("logoutButton").style.visibility = "visible"
                document.getElementById("addSection").style.visibility = "visible"
                document.getElementById("homeSection").style.visibility = "visible"
                document.getElementById("pendingSection").style.visibility = "visible"
                document.getElementById("likeSection").style.visibility = "visible"

            }else{
                setModal("FailedL")
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
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/signup`;
        var config = {
        method: 'post',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
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
                document.getElementById("pendingSection").style.visibility = "visible"
                document.getElementById("likeSection").style.visibility = "visible"
            }else{
                console.log(response)
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
        document.getElementById("pendingSection").style.visibility = "hidden"
        document.getElementById("likeSection").style.visibility = "hidden"

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
               <h2>Registrarse</h2>
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
            <h2>Iniciar sesión</h2>
        </div>
        <TextField id="userFieldL" label="Usuario" className={styles.textField} onChange={caseInsensitiveL}/>
        <br/>
        <TextField id="passwordFieldL" label="Contraseña" className={styles.textField} type="password" onChange={caseInsensitiveL}/>
        <br/> <br/>
        <div align='right'>
        <Button id="authLogin" color="primary" onClick={userRequest}>Autenticar</Button>
        <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
        </div>
     </div>)
     const hideBooks = () =>{
       setVisibleBooks(false)

     }
    
      useEffect(()=>{
        document.getElementById("logoutButton").style.visibility = "hidden"
        document.getElementById("addSection").style.visibility = "hidden"
        document.getElementById("homeSection").style.visibility = "hidden"
        document.getElementById("pendingSection").style.visibility = "hidden"
        document.getElementById("likeSection").style.visibility = "hidden"
        
    }, []);
    return (

    <div className = "bordering">
    <div className="title_container">
            <h1>BookCrossing</h1>

            <div className="session_container">
                {currentSession!==defaultSessionText?<h4>Bienvenido,</h4>:null}<h4>{currentSession!==defaultSessionText?currentSession.toUpperCase():currentSession}</h4>
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
            <Button id="logoutButton" onClick={()=>logout()} className={styles.button}>Cerrar Sesión</Button>
            <Button id="loginButton" onClick={()=>openModalLogin()} className={styles.button}>Iniciar Sesión</Button>
            {currentSession===defaultSessionText? <Redirect to={"/"} />:<Redirect to={"/home"}/>}
            <Button id="signupButton" onClick={()=>openModalSignUp()} className={styles.button}>Registrarse</Button>
            <div className="nav_element" id="faqSection"><Link  to={"/faq"} style={{textDecoration: 'none', color:"white"}} onClick={hideBooks}>PREGUNTAS FRECUENTES</Link></div>
            <div className="nav_element" id="aboutSection"><Link  to={"/about"} style={{textDecoration: 'none', color:"white"}} onClick={hideBooks}>¿QUIENES SOMOS?</Link></div>
            <div className="nav_element" id="homeSection"><Link  to={"/home"} style={{textDecoration: 'none', color:"white"}}>INICIO</Link></div>
            <div className="nav_element" id="addSection"><Link  to={"/addbooks"} style={{textDecoration: 'none', color:"white"}}>MIS LIBROS</Link></div>
            <div className="nav_element" id="pendingSection"><Link  to={"/pendingtrades"} style={{textDecoration: 'none', color:"white"}}>INTERCAMBIOS PENDIENTES</Link></div>
            <div className="nav_element" id="likeSection"><Link  to={"/likedBooks"} style={{textDecoration: 'none', color:"white"}}>BANDEJA DE NOTIFICACIONES</Link></div>
        </div>
            <Switch> 
            <Route exact path="/home" component={EmptyHome}/>
            <Route path="/addbooks" component={AddBooks}/>
            <Route path="/matchview" component={MatchView}/>
            <Route path="/pendingtrades" component={PendingTrades}/>
            <Route path ="/faq" component={faqPage}/>
            <Route path ="/about" component={aboutPage}/> 
            <Route path ="/likedBooks" component={LikedBooks}/>   
            </Switch>
        </Router>

    </div>

{currentSession===defaultSessionText && VisibleBooks?
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100" src={car1} alt="First slide"/>
            </div>

            <div className="carousel-item">
                <img className="d-block w-100" src={car2} alt="Second slide"/>
            </div>

            <div className="carousel-item">
                <img className="d-block w-100" src={car3} alt="Third slide"/>
            </div>
        </div>

        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>

        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>


    </div>:null
}


    </div>
    )
}