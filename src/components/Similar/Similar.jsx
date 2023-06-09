// /* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from "react";
import image from "./../../images/no-img.png"
import { Link, useParams } from "react-router-dom";


export default function Similar() {
    let params = useParams();
    const [SimilarItems, setSimilarItems] = useState([])
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

    async function getSimilarM(pageNum) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?api_key=34d2e2cb1e0798d6b0c47746202348cb&language=en-US&page=${pageNum}`);
        setSimilarItems(data.results);
        setTotalPages(data.total_pages)
    };


    useEffect(() => {
        getSimilarM(count)
    }, [params.id, count]);


    return (
        <>
            <div className="container">
                <div className="row mt-4">

                    {SimilarItems[0] ? <h2 className="my-3">
                        Similar <span className="text-warning">{params.media_type === 'movie' ? " Movies" : " TV Shows"}</span>
                    </h2> : ""}
                    {SimilarItems[0] ? <div className="pag py-3 d-flex align-items-center justify-content-center">
                        <span className="prev mx-2 fs-1 btn rounded-circle" onClick={() => counterPrevPages(count)} ><i className="fa-solid fa-circle-chevron-left"></i></span>
                        <span className="currant border p-3 rounded-5 text-center">Page <span className="text-warning" >{count}</span></span>
                        <span className="next mx-2 fs-1 btn rounded-circle" onClick={() => counterNextPages(count)} ><i className="fa-solid fa-circle-chevron-right"></i></span>
                    </div> : ""}
                    {SimilarItems.map((movie, key) => (
                        <div key={key} className="col-lg-2 col-md-4 col-sm-4 col-6">
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
