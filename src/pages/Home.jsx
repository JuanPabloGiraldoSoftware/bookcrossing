import { React} from 'react';
import {Link} from 'react-router-dom'
import "../components/styles/Containers.css"
import "../components/styles/Buttons.css"

export function Home(){
    return (<div className = "bordering">
        <div className="body_container">
        <Link to="/login" className="btn btn-primary loginBtn">Login</Link>
        </div>
    </div>
    )
}