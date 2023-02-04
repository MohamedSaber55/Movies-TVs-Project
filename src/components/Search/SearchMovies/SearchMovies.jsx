import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image from "./../../../images/no-img.png";

export default function SearchMovies() {
    const [peopleSearchResult, setPeopleSearchResult] = useState([]);

    async function getSearch(query, pageNumber) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`)
        setPeopleSearchResult(data.results)
    }
    useEffect(() => {
        getSearch('a', 1);
    }, [])

    function getQuery(e) {
        getSearch(e.target.value);
    }

    return (
        <>
            <input onChange={getQuery} className="form-control my-4 w-50 m-auto" type="text" placeholder="Search People" />
            {peopleSearchResult.length > 5 ? <div className="container">
                <div className="row mt-4">
                    {peopleSearchResult.map((movie, key) => (
                        <div key={key} className="col-lg-2 col-md-3 col-sm-6">
                            <a href={"/itemdetails/" + movie.id + "/movie"}>
                                <div className="movie position-relative my-2">
                                    {movie.poster_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />) : ("")}
                                    {movie.profile_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + movie.profile_path} alt="profile" />) : ("")}
                                    {!movie.poster_path && !movie.profile_path ? (<img className="w-100" height="250" src={image} alt="" />) : ("")}
                                    <h3 className=" my-2 h6">{movie.title}{movie.name}</h3>
                                    {movie.vote_average ? (
                                        <div className={`vote`}><span className="">{movie.vote_average?.toFixed(1)}</span></div>)
                                        : ("")}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div> : <div className="spinner">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>}
        </>
    )
}
