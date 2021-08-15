import {React,Fragment} from 'react';

export function BookInventory({booksList}) {
    const verifyContent = (book)=>{
        if(!book.Title || !book.Author || !book.Language){
            return
        }else{
           return(<Fragment>
                <h2>{book.Title}</h2>
                <ul>
                    <li>{book.Author}</li>
                    <li>{book.Language}</li>
                </ul>
                </Fragment>)
        }
    }
    return (   
        <div>
            {booksList.map((book)=>(
                verifyContent(book)
            ))}
        </div>
        
    )
}
