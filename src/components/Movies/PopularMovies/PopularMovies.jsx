
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from './../../../images/no-img.png'



export default function PopularMovies() {
    let pageNumber = new Array(5).fill('').map((elm, i) => i + 1)
    const [popularMovies, setPopularMovies] = useState([])
    function pagination(page) {
        getTrending('popular', setPopularMovies, page)
    }

    async function getTrending(movieType, callback, pageNumber) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&page=${pageNumber}`)
        callback(data.results);
    }

    useEffect(() => {
        getTrending('popular', setPopularMovies, 1)
    }, [])


    return (
        <>
            {popularMovies.length > 0 ? <div className="container py-4">
                <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-center">
                        {pageNumber.map((el) => <li onClick={() => pagination(el)} key={el} className="page-item"><Link className="page-link bg-transparent rounded-circle mx-2" to="">{el}</Link></li>)}
                    </ul>
                </nav>
                <div className="row mt-4">
                    <div className="col-md-4 ">
                        <h2 className="h4">Popular <br /> Movies <br /> To Watch Right Now</h2>
                        <p className="text-muted py-3">Most Watched Movies by Days</p>
                    </div>
                    {popularMovies.map((movie, index) => (
                        <div className={`col-lg-2 col-md-4`} key={index}>
                            <Link className="" to={"/itemdetails/" + movie.id + "/movie"}>
                                <div className={`${`movie`} my-2 position-relative`}>
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
            </div> : <div className="spinner">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>}
        </>
    )
}
