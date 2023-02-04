
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from './../../../images/no-img.png'



export default function TopRatedTVs() {
    let pageNumber = new Array(5).fill('').map((elm, i) => i + 1)
    const [TopRatedTVs, setTopRatedTVs] = useState([])
    function pagination(page) {
        getTrending('TopRated', setTopRatedTVs, page)
    }

    async function getTrending(tvType, callback, pageNumber) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvType}?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US&page=${pageNumber}`)
        callback(data.results);
    }

    useEffect(() => {
        getTrending('top_rated', setTopRatedTVs, 1)
    }, [])


    return (
        <>
            {TopRatedTVs.length > 0 ? <div className="container py-4">
                <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-center">
                        {pageNumber.map((el) => <li onClick={() => pagination(el)} key={el} className="page-item"><Link className="page-link bg-transparent rounded-circle mx-2" to="">{el}</Link></li>)}
                    </ul>
                </nav>
                <div className="row mt-4">
                    <div className="col-md-4 ">
                        <div className=" mb-4 w-25">_____________________________________________</div>
                        <h2 className="h4">Top Rated <br /> TV Shows <br /> To Watch Right Now</h2>
                        <p className="text-muted py-3">Most Watched TV Shows by Days</p>
                        <div className=" mt-3 w-100">_____________________________________________</div>
                    </div>
                    {TopRatedTVs.map((tv, index) => (
                        <div className={`col-lg-2 col-md-4`} key={index}>
                            <Link className="" to={"/itemdetails/" + tv.id + "/tv"}>
                                <div className={`${`tv`} my-2 position-relative`}>
                                    {tv.poster_path ? (<img className=" w-100 rounded-1" src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} alt="Poster" />) : ("")}
                                    {!tv.poster_path ? (<img className="w-100" height="250" src={notFoundImg} alt="" />) : ("")}
                                    {tv.vote_average ? (
                                        <div className={`vote`}><span className="">{tv.vote_average?.toFixed(1)}</span></div>)
                                        : ("")}
                                    <h3 className=" my-2 h6">{tv.name}</h3>
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
