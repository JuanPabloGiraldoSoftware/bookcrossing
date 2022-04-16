import {React, useState} from 'react';
import "./styles/Containers.css"
import "./styles/Buttons.css"
import {getCurrentUsr} from '../App';
import LoadingOverlay from 'react-loading-overlay'
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

export function YourBooks({booksList}) {

    const [currentModal, setModal] = useState(false);
    const [currentBookId, setCurrentBookId] = useState(null);
    const openModalModify = (bookId)=>{
        setCurrentBookId(bookId)
        setModal(true)
    }

    const closeAnyModal=()=>{
        setModal(false)
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
    const styles = useStyles();
    const modalModify = (
        <div className={styles.modal}>
           <div align='center'>
               <h2>Modificar Libro</h2>
           </div>
           <TextField id="titleField" label="Título" className={styles.textField}/>
           <br/>
           <TextField id="authorField" label="Autor" className={styles.textField}/>
           <br/>
           <TextField id="languageField" label="Idioma" className={styles.textField}/>
           <br/>
           <TextField id="genderField" label="Género Literario" className={styles.textField}/>
           <br/> 
           <TextField id="yearField" label="Año" className={styles.textField}/>
           <br/><br/>
           <div align='right'>
           <Button color="primary" onClick={()=>modifyBook(currentBookId)}>Actualizar</Button>
           <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
           </div>
        </div>
    )
    

    const [loading, setLoading] = useState(false)
    
    const modifyBook = (bookId) => {
        const title = document.getElementById('titleField').value.length>0?
        document.getElementById('titleField').value: null;
        const author = document.getElementById('authorField').value.length>0?
        document.getElementById('authorField').value:null;
        const language = document.getElementById('languageField').value.length>0?
        document.getElementById('languageField').value:null;
        const gender = document.getElementById('genderField').value.length>0?
        document.getElementById('genderField').value:null;
        const year = document.getElementById('yearField').value.length>0?
        document.getElementById('yearField').value:null;
        var axios = require('axios');
        var data = JSON.stringify({
            "title":title,
            "author":author,
            "language":language,
            "gender":gender,
            "year":year,
            "bookId": bookId
        });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/modifyBook`;
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
                
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const deleteBook = (bookId)=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        }, 1500)
        var axios = require('axios');
        var data = JSON.stringify({
        "bookId": bookId,
        });
        var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/deleteBook` ;
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
                console.log('book deleted!')
            }else{
                console.log("Error!");
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const verifyContent = (book)=>{
        if(!book.title || !book.author || !book.language || !book.gender || !book.year){
            return
        }else{
            const owner = book.owner?book.owner:book.userName;
            if(getCurrentUsr()!== owner){
                return;
            }
           return(
               <div className="col-2 singlebook_container">
                <h4 style={{color:"#E85654"}}>{book.title}</h4>
                <ul>
                    <li><b>Autor:</b> {book.author}</li>
                    <li><b>Idioma:</b> {book.language}</li>
                    <li><b>Género:</b> {book.gender}</li>
                    <li><b>Año:</b> {book.year}</li>
                    
                </ul>
                <div className="select_button"><LoadingOverlay
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando..."><button onClick={()=>deleteBook(book.id)}>Eliminar</button><button onClick={()=>openModalModify(book.id)}>Editar</button></LoadingOverlay></div>
                </div>)
        }
    }
    return (  
        <div className="row">
            <Modal
            open={currentModal}
            onClose={openModalModify}>
            {modalModify}
            </Modal>
            {booksList.map((book)=>(
                verifyContent(book)
            ))}
        </div>
    )
}
