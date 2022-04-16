import { React, useEffect, useState} from 'react';
import { AddingBar } from '../components/AddingBar'
import "../components/styles/Containers.css"
import LoadingOverlay from 'react-loading-overlay'

export function AddBooks(props){

    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    <div className="MainDiv">
    <div className = "bordering">
        <AddingBar />
    </div>
    </div>
    </LoadingOverlay>
    )
}