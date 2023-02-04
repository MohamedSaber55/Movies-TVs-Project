import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'



export const MoviesContext = createContext(null)

export default function MoviesContextProvider(props) {

    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])

    async function getTrending(movieType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&page=1`)
        callback(data.results);
    }

    useEffect(() => {
        getTrending('top_rated', setTopRatedMovies)
        getTrending('upcoming', setUpcomingMovies)
        getTrending('popular', setPopularMovies)
    }, [])




    return (
        <MoviesContext.Provider value={{ topRatedMovies, popularMovies, upcomingMovies }} >
            {props.children}
        </MoviesContext.Provider>
    )
}
