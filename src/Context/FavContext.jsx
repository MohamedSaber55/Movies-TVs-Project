// import axios from 'axios'
import React, { createContext, useState } from 'react'



export const FavContext = createContext(null)

export default function FavContextProvider(props) {
    const [favList, setFavList] = useState([])


    function setToFav(e) {
        console.log('Clicked');
    }

    return (
        <FavContext.Provider value={{ favList,setToFav,setFavList }} >
            {props.children}
        </FavContext.Provider>
    )
}
