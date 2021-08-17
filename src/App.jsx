import { React} from 'react';
import {Login} from './pages/Login'
import {AddBooks} from './pages/AddBooks'
import {Home} from './pages/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import "./components/styles/Containers.css"

export function App(){
    return (<div className = "bordering">
    <Router>
    <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/login" component={Login}/>
       <Route path="/addbooks" component={AddBooks}/>
       </Switch>
    </Router>
    </div>
    )
}