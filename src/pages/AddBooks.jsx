import { React} from 'react';
import { MainTitleContainer } from '../components/MainTitleContainer';
import { AddingBar } from '../components/AddingBar'
import "../components/styles/Containers.css"

export function AddBooks(){
    return (<div className = "bordering">
        <MainTitleContainer/>
        <AddingBar />
    </div>
    )
}