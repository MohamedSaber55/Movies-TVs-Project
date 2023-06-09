
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from './../../../images/no-img.png'



export default function UpcomingMovies() {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [count, setCount] = useState(1)
    function counterPrevPages(pageNum) {
        const prevCount = count - 1
        if (prevCount < 1) {
        } else {
            setCount(prevCount);
        }
    }
    function counterNextPages(pageNum) {
        const nextCount = count + 1
        if (nextCount >= totalPages) {
        } else {
            setCount(nextCount);
        }
    }

    async function getTrending(movieType, callback, pageNumber) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&page=${pageNumber}`)
        callback(data.results);
        setTotalPages(data.total_pages)
    }

    useEffect(() => {
        getTrending('upcoming', setUpcomingMovies, count)
    }, [count])

    return (
        <>
            {upcomingMovies.length > 0 ? <div className="container py-4">
                <div className="pag py-3 d-flex align-items-center justify-content-center">
                    <span className="prev mx-2 fs-1 btn rounded-circle" onClick={() => counterPrevPages(count)} ><i className="fa-solid fa-circle-chevron-left"></i></span>
                    <span className="currant border p-3 rounded-5">Page <span className="text-warning" >{count}</span></span>
                    <span className="next mx-2 fs-1 btn rounded-circle" onClick={() => counterNextPages(count)} ><i className="fa-solid fa-circle-chevron-right"></i></span>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4 ">
                        <div className="h-100 d-flex justify-content-center flex-column">
                            <h2 className="h4">Upcoming <br /> Movies <br /> To Watch Right Now</h2>
                            <p className="text-muted py-3">Most Watched Movies by Days</p>
                        </div>
                    </div>
                    {upcomingMovies.map((movie, index) => (
                        <div className={`col-lg-2 col-md-4 col-sm-4 col-6`} key={index}>
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
