import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import image from "./../../../images/th.jpg";

export default function SearchPeople() {
    const [peopleSearchResult, setPeopleSearchResult] = useState([]);
    const [query, setQuery] = useState("a");
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

    async function getSearch(query, pageNumber) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`)
        setPeopleSearchResult(data.results)
        setTotalPages(data.total_pages)
    }
    useEffect(() => {
        getSearch(query, count);
    }, [query, count])

    function getQuery(e) {
        if (!e.target.value) {
            setQuery("a")
        } else {
            setQuery(e.target.value)
            setCount(1)

        }
    }

    return (
        <>
            <input onChange={getQuery} className="form-control my-4 w-50 m-auto" type="text" placeholder="Search People" />
            {peopleSearchResult.length > 5 ? <div className="container">
                <div className="row mt-4">
                    <div className="pag py-3 d-flex align-items-center justify-content-center">
                        <span className="prev mx-2 fs-1 btn rounded-circle" onClick={() => counterPrevPages(count)} ><i className="fa-solid fa-circle-chevron-left"></i></span>
                        <span className="currant border p-3 rounded-5">Page <span className="text-warning" >{count}</span></span>
                        <span className="next mx-2 fs-1 btn rounded-circle" onClick={() => counterNextPages(count)} ><i className="fa-solid fa-circle-chevron-right"></i></span>
                    </div>
                    {peopleSearchResult.map((movie, key) => (
                        <div key={key} className="col-lg-2 col-md-4 col-sm-4 col-6">
                            <Link to={"/itemdetails/" + movie.id + "/person"}>
                                <div className="movie position-relative my-2">
                                    {movie.poster_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />) : ("")}
                                    {movie.profile_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + movie.profile_path} alt="profile" />) : ("")}
                                    {!movie.poster_path && !movie.profile_path ? (<img className="w-100" height="250" src={image} alt="" />) : ("")}
                                    <h3 className=" my-2 h6">{movie.title}{movie.name}</h3>
                                    {movie.vote_average ? (
                                        <div className={`vote`}><span className="">{movie.vote_average?.toFixed(1)}</span></div>)
                                        : ("")}
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
