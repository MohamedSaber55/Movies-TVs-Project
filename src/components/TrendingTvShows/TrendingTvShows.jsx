import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TrendingMediaContext } from '../../Context/TrendingMediaContext'
import NotFoundImg from './../../images/no-img.png'


export default function TrendingTvShows() {
    const { trendingTvShows } = useContext(TrendingMediaContext)
    return (
        <div className="row mt-4">
            <div className="col-md-4 d-flex align-items-center">
                <div>
                    <div className="brdr mb-4 w-25"></div>
                    <h2 className="h4">Trending <br /> TV Shows <br /> To Watch Right Now</h2>
                    <p className="text-muted py-3">Most Watched TV Shows by Days</p>
                    <div className="brdr mt-3 w-100"></div>
                </div>
            </div>
            {trendingTvShows.slice(0, 10).map((tvShow, index) => (
                <div className="col-lg-2 col-md-4 col-sm-4 col-6" key={index}>
                    <Link to={"/itemdetails/" + tvShow.id + "/" + tvShow.media_type}>
                        <div className="item position-relative">
                            {tvShow.poster_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + tvShow.poster_path} alt="PosterPath" />) : ("")}
                            {!tvShow.poster_path ? (<img className="w-100" height="250" src={NotFoundImg} alt="" />) : ("")}
                            <h3 className=" my-2 h6">{tvShow.name}</h3>
                            {tvShow.vote_average ? (
                                <div className={`vote`}><span className="">{tvShow.vote_average?.toFixed(1)}</span></div>)
                                : ("")}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
