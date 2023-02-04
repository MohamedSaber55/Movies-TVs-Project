import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'



export const TrendingMediaContext = createContext(null)

export default function TrendingMediaContextProvider(props) {

    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingTvShows, setTrendingTvShows] = useState([])
    const [trendingPeople, setTrendingPeople] = useState([])
    async function getTrending(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=34d2e2cb1e0798d6b0c47746202348cb`)
        callback(data.results);
    }

    useEffect(() => {
        getTrending('movie', setTrendingMovies)
        getTrending('tv', setTrendingTvShows)
        getTrending('person', setTrendingPeople)
    }, [])




    return (
        <TrendingMediaContext.Provider value={{ trendingMovies, trendingPeople, trendingTvShows }} >
            {props.children}
        </TrendingMediaContext.Provider>
    )
}
