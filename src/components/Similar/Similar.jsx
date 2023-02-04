import axios from 'axios';
import React, { useEffect, useState } from "react";
import image from "./../../images/no-img.png"
import { Link, useParams } from "react-router-dom";


export default function Similar() {
    let params = useParams();
    const [SimilarItems, setSimilarItems] = useState([])


    async function getSimilarM() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?api_key=34d2e2cb1e0798d6b0c47746202348cb&language=en-US&page=1`);
        setSimilarItems(data.results);
    };


    useEffect(() => {
        getSimilarM()
    }, [params.id, params.media_type]);



    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    {SimilarItems[0] ? <h2 className="my-3">
                        {params.media_type === 'movie' ? "Similar Movies" : "Similar TV Shows"}
                    </h2> : ""}
                    {SimilarItems.map((movie, key) => (
                        <div key={key} className="col-lg-2 col-md-3 col-sm-6">
                            <Link to={"/itemdetails/" + movie.id + "/" + params.media_type}>
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
            </div>
        </>
    )
}
