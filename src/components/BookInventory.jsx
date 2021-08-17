import {React} from 'react';
import "./styles/Containers.css"

export function BookInventory({booksList}) {
    
    const verifyContent = (book)=>{
        const https = require('https')

        const data = new TextEncoder().encode(
        JSON.stringify({
            username: 'juan',
            password: "name"
        })
        )

        const options = {
        hostname: 'bookcrossing-server.herokuapp.com',
        port: 443,
        path: '/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': "GET, PUT, POST",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Length': data.length
        }
        }

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            console.log(d)
            process.stdout.write(d)
        })
        })

        req.on('error', error => {
        console.error(error)
        })

        req.write(data)
        req.end()
        if(!book.Title || !book.Author || !book.Language){
            return
        }else{
           return(
               <div class="col-3" className="singlebook_container">
                <h2>{book.Title}</h2>
                <ul>
                    <li>{book.Author}</li>
                    <li>{book.Language}</li>
                </ul>
                </div>)
        }
    }
    return (  
        <div class="row">
            {booksList.map((book)=>(
                verifyContent(book)
            ))}
        </div>
    )
}
