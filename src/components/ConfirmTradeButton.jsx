import React from 'react'
import { useState} from 'react'
import LoadingOverlay from 'react-loading-overlay'
import { Modal, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Redirect} from 'react-router-dom'

export function ConfirmTradeButton({booksTrader, booksOwner}) {
  const [loading, setLoading] = useState(false)
  const [currentModal, setModal] = useState(false);
  const [confirmResponse, setResponse] = useState('none');
  const [bookT, setBookT] = useState()
  const [bookO, setBookO] = useState()
  const [redirectUpdate, setUpdate] = useState(false)

  const handleChangeT = (event) => {
    event.preventDefault();
    console.log("target val",event.target.value)
    setBookT(event.target.value);
  };

  const handleChangeO = (event) => {
    event.preventDefault();
    console.log("target val",event.target.value)
    setBookO(event.target.value);
  };

  const openModal=(m)=>{
    console.log("available trader", booksTrader);
    console.log("available owner", booksOwner);
    setModal(m)
  } 

  const closeAnyModal=()=>{
    setModal(false)
    setUpdate(true)
    setUpdate(false)
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
    button:{
        color: "white",
        borderRadius: "100px",
        marginLeft: "1%"

        }
}))
const styles = useStyles();

const confirmTrade = (idUsrT, idUsrO, idBookT, idBookO)=>{
  var axios = require('axios');
  var data = JSON.stringify({
    "idUsrT" : idUsrT,
    "idUsrO": idUsrO,
    "idBookT" : idBookT,
    "idBookO" : idBookO
  });
  var baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}/confirmTrade` ;
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
        let msg = '';
        if (response.data==='confirmed'){
          msg = '¡Intercambio realizado!'
        }else if (response.data==='pending'){
          msg = 'Cofirmación enviada, se espera confirmación del otro usuario.';
        }else{
          msg = `Confirmación pendiente del libro ${response.data}`;
        }
        setResponse(msg)
        closeAnyModal()
        openModal('response')
      }else{
          console.log("Error!");
          console.log(response.data)
      }
  })
  .catch(function (error) {
  console.log(error);
  }); 
};

const bookMenu = (blist, type)=> {
  return(
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{type==='T'?"Sus Libros":"Tus Libros"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type==='T'?bookT:bookO}
          label="Libros"
          onChange={type==='T'?handleChangeT:handleChangeO}
        >
         {blist.map((b) => <MenuItem value={b}>{b.title}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  )
}

const modalConfirm = (
  <div className={styles.modal}>
     <div align='center'>
         <h2>Seleccionar libros intercambiados</h2>
     </div>
      {bookMenu(booksTrader,"T")}
      {bookMenu(booksOwner, "O")}
     <div align='right'>
     <Button color="primary" onClick={()=>confirmTrade(bookT.userId, bookO.userId, bookT.idBook, bookO.idBook)}>Confirmar</Button>
     <Button onClick={()=>closeAnyModal()}>Cancelar</Button>
     </div>
  </div>
)

const modalConfirmResponse = (
  <div className={styles.modal}>
     <div align='center'>
         <h2>{confirmResponse}</h2>
     </div>
     <div align='center'>
     <Button onClick={()=>closeAnyModal()}>Cerrar</Button>
     </div>
  </div>
)

  const triggerConfirmation = ()=>{
      setLoading(true)
      setTimeout (()=>{
          setLoading(false)
          openModal('confirm')
      },1500)
  }

  return (
    <LoadingOverlay
        style = {{width:"100%", height:"100%"}}
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
          {redirectUpdate?<Redirect to='/pendingtrades'/>:null}
                <Modal
                open={currentModal==='response'}
                onClose={()=>openModal('response')}>
                {modalConfirmResponse}
                </Modal>
                <Modal
                open={currentModal==='confirm'}
                onClose={()=>openModal('confirm')}>
                {modalConfirm}
                </Modal>
                 <button className="confirm_button" onClick={triggerConfirmation}>Confirmar Intercambio</button>
      </LoadingOverlay>
  )
}
