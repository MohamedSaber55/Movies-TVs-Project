import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TrendingMediaContext } from '../../Context/TrendingMediaContext'
import notFoundImg from './../../images/no-img.png'
import trendingMovieStyle from './TrendingMovies.module.scss'



export default function TrendingMovies() {

  const { trendingMovies } = useContext(TrendingMediaContext)



  return (
    <div className="row mt-4">
      <div className="col-md-4 d-flex align-items-center">
        <div>
          <div className="brdr mb-4 w-25"></div>
          <h2 className="h4">Trending <br /> Movies <br /> To Watch Right Now</h2>
          <p className="text-muted py-3">Most Watched Movies by Days</p>
          <div className="brdr mt-3 w-100"></div>
        </div>
      </div>
      {trendingMovies.slice(0, 10).map((movie, index) => (
        <div className={`col-lg-2 col-md-4`} key={index}>
          <Link className="" to={"/itemdetails/" + movie.id + "/" + movie.media_type}>
            <div className={`${trendingMovieStyle.movie} my-2 position-relative`}>
              {movie.poster_path ? (<img className=" w-100 rounded-1" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="Poster" />) : ("")}
              {!movie.poster_path ? (<img className="w-100" height="250" src={notFoundImg} alt="" />) : ("")}
              {movie.vote_average ? (
                <div className={`vote`}><span className="">{movie.vote_average?.toFixed(1)}</span></div>)
                : ("")}
              <h3 className=" my-2 h6">{movie.title}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
