import React, {useState, useEffect} from 'react'
import { BookInventory } from '../components/BookInventory'
import LoadingOverlay from 'react-loading-overlay'

export function EmptyHome() {
    const [blist, setBlist] = useState([{}])
    const [loading, setLoading] = useState(true)
    const userRequest = () => {
        var axios = require('axios');
        var baseUrl = `https://${process.env.REACT_APP_BACKEND_URL}/getallbooks` ;
        var config = {
        method: 'get',
        url: baseUrl,
        headers: { 
            'Bypass-Tunnel-Reminder':true,
            'Content-Type': 'application/json'
        }
        };

        axios(config)
        .then(function (response) {
            if(response.data){
                setBlist(response.data.reverse());
            }else{
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    useEffect(() => {
        userRequest();
        setTimeout(()=>{
            setLoading(false);
        }, 1500)
    }, [])

    return (
        <LoadingOverlay
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
        <div className="BookInventoryShow">

            <BookInventory booksList={blist} booksTrader={[]} booksOwner={[]} mode={'home'}/>
        </div>
        </LoadingOverlay>
    )
}
