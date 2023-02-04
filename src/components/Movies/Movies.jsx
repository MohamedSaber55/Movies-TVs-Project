// import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
// import { TrendingMediaContext } from '../../Context/TrendingMediaContext'
// import notFoundImg from './../../images/no-img.png'



export default function Movies() {
  // const { trendingMovies } = useContext(TrendingMediaContext)
  return (
    <>
      <div className="">
        <ul className="list-unstyled d-flex justify-content-around py-1 fw-semibold bg-black">
          <li className=" px-1 py-2 "><Link to="movies/popular">Popular Movies</Link></li>
          <li className=" px-1 py-2 "><Link to="movies/toprated">Top Rated Movies</Link></li>
          <li className=" px-1 py-2 "><Link to="movies/upcoming">Upcoming Movies</Link></li>
        </ul>
      </div>
      <div className="movies container">
        {/* <div className="row mt-4">
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
                <div className={`${movie} my-2 position-relative`}>
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
        </div> */}
        <div className="row justify-content-center" >
          <div className="">
            <Outlet className="movies-outlet"></Outlet>
          </div>
        </div>
      </div>
    </>
  )
}
