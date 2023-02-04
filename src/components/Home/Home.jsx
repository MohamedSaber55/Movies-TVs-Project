
import React, { useContext } from 'react'
import { TrendingMediaContext } from '../../Context/TrendingMediaContext'

import TrendingMovies from '../TrendingMovies/TrendingMovies'
import TrendingPeople from '../TrendingPeople/TrendingPeople'
import TrendingTvShows from '../TrendingTvShows/TrendingTvShows'




export default function Home() {
    const { trendingMovies, trendingTvShows, trendingPeople } = useContext(TrendingMediaContext)

    return (
        <>
            {trendingMovies.length > 0 && trendingTvShows.length > 0 && trendingPeople.length > 0 ?
                <div className="container mt-5 outLet-container">
                    <TrendingMovies />
                    <TrendingTvShows />
                    <TrendingPeople />
                </div> : <div className="spinner">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>}



        </>
    )
}
