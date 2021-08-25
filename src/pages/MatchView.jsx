import React, {useState, useEffect} from 'react';
import { getMatchBooks } from '../components/LikeButton';
import { BookInventory } from '../components/BookInventory'
import LoadingOverlay from 'react-loading-overlay'
import { Redirect } from 'react-router-dom';
export function MatchView() {
    const [value] = useState(getMatchBooks())
    const [loading, setLoading] = useState(true)
    console.log("in matchview", value)
    console.log("in matchview", value[1]);
    console.log("in matchview", value[0]);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        }, 5000)
    }, [])

    return (
        value?<LoadingOverlay
        active={loading}
        spinner
        fadeSpeed="250"
        text="Coincidencia Encontrada...">
        <div className="MainDiv">
            <BookInventory booksList={[]} booksTrader={value[1]} booksOwner={value[0]}/>
        </div>
        </LoadingOverlay>:<Redirect to="/"/>
    )
}
