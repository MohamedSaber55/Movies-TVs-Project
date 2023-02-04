import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TrendingMediaContext } from '../../Context/TrendingMediaContext'
import NotFoundImg from './../../images/th.jpg'

export default function TrendingPeople() {
    const { trendingPeople } = useContext(TrendingMediaContext)

    return (
        <div className="row mt-4">
            <div className="col-md-4 d-flex align-items-center">
                <div>
                    <div className="brdr mb-4 w-25"></div>
                    <h2 className="h4">Trending <br /> People <br /> To Watch Right Now</h2>
                    <p className="text-muted py-3">Most Watched People by Days</p>
                    <div className="brdr mt-3 w-100"></div>
                </div>
            </div>
            {trendingPeople.slice(0, 10).map((person, index) => (
                <div className="col-lg-2 col-md-4" key={index}>
                    <Link to={"/itemdetails/" + person.id + "/" + person.media_type}>
                        <div className="item position-relative">
                            {person.profile_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + person.profile_path} alt="ProfileImage" />) : ("")}
                            {!person.profile_path ? (<img className="w-100" height="250" src={NotFoundImg} alt="" />) : ("")}
                            <h3 className=" my-2 h6">{person.name}</h3>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
