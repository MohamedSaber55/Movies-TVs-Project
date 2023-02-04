/* eslint-disable react-hooks/exhaustive-deps */

import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Similar from "../Similar/Similar";
import itemImage from "./../../images/no-img.png";
// import { Link } from "react-router-dom";

export default function MovieDetails() {
    let params = useParams();
    const [itemDetails, setItemDetails] = useState([]);

    async function getItemsDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=34d2e2cb1e0798d6b0c47746202348cb&language=en-US`);
        setItemDetails(data);
    }
    // async function getSeasonsDetails() {
    //     let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/season/1?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US`);
    //     console.log('====================================');
    //     console.log(data);
    //     console.log('====================================');
    // }

    useEffect(() => {
        getItemsDetails();
        // getSeasonsDetails()
    }, [params.id, params.media_type]);

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    }
    if (itemDetails.runtime) {
        var { hours, minutes } = toHoursAndMinutes(itemDetails.runtime);
    }


    return (
        <>
            {itemDetails.title === undefined && itemDetails.name === undefined ? <div className="spinner">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> : <>{<div className="bg-content container mt-5 pt-4 outLet-container">
                <div className="row py-3">
                    <div className="col-md-3">
                        {itemDetails.poster_path ? (<img className=" w-100 rounded-2 " src={"https://image.tmdb.org/t/p/w500" + itemDetails.poster_path} alt="" />) : ("")}
                        {itemDetails.profile_path ? (<img className=" w-100" src={"https://image.tmdb.org/t/p/w500" + itemDetails.profile_path} alt="" />) : ""}
                        {!itemDetails.poster_path && !itemDetails.profile_path ? (<img className="w-100" src={itemImage} alt="" />) : ""}
                    </div>
                    <div className="col-md-9">
                        <h1 className='my-3 my-md-0'>{itemDetails.original_title} {itemDetails.name}</h1>
                        {itemDetails.vote_average ? <Rating className="mt-2" name="half-rating-read" value={(itemDetails.vote_average) / 2} precision={0.25} readOnly /> : ''}
                        <div className="my-2 ">
                            {(itemDetails.release_date) ? <><small className="mx-1"> {(itemDetails.release_date).split('-').splice(0, 1).join('')}</small></> : ""}
                            {hours > 0 ? <span className="text-light ms-1">{hours} Hour : </span> : ""}
                            {minutes > 0 ? <span className="text-light me-1">{minutes} Min</span> : ""}
                            {(itemDetails.original_language) ? <><small className="mx-1"> {`${itemDetails.original_language}`.toUpperCase()} </small>   </> : ""}
                            {itemDetails.vote_average ? (<span className=" mx-1"><i className="fa-solid fa-star small "></i> {itemDetails.vote_average?.toFixed(1)}</span>) : ("")}
                        </div>
                        <div className="list-unstyled d-flex my-2">{itemDetails.genres?.map((genre, i) => <div key={i} className="bg-warning p-1  me-3 rounded-2">
                            {genre.name}
                        </div>)}</div>
                        <div className="mt-4">
                            {(itemDetails.vote_count) ? <div className="my-2 fw-semibold fs-5">Vote Count : <span className="fs-6">{(itemDetails.vote_count)} Person</span></div> : ""}
                            {(itemDetails.popularity) ? <div className="my-2 fw-semibold fs-5">popularity : <span className=" fs-6">{(itemDetails.popularity)}</span></div> : ""}
                            {itemDetails.production_countries ? <div className="my-2 fw-semibold fs-5" >Production Countries : <span className=" fs-6">{itemDetails.production_countries.map((country, i) => <span key={i} className="me-2">{country.name}</span>)}</span></div> : ''}
                            {(itemDetails.place_of_birth) ? <><div className="my-2 fw-semibold fs-5">Place of Birth : <span className="fs-6">{(itemDetails.place_of_birth)}</span></div> </> : ""}
                            {(itemDetails.birthday) ? <><div className="my-2 fw-semibold fs-5">Birth Date : <span className="fs-6">{(itemDetails.birthday)}</span></div> </> : ""}
                            {(itemDetails.deathday) ? <><div className="my-2 fw-semibold fs-5">Death Date : <span className="fs-6">{(itemDetails.deathday)}</span></div> </> : ""}
                            {(itemDetails.known_for_department) ? <><div className="my-2 fw-semibold fs-5">Known for Department : <span className="fs-6">{(itemDetails.known_for_department)}</span></div> </> : ""}
                            {(itemDetails.biography) ? <><div className="my-2 fw-semibold fs-5">Personal Biography : <span className="fs-6">{(itemDetails.biography)}</span></div> </> : ""}
                            {(itemDetails.budget) ? <><div className="my-2 fw-semibold fs-5">Budget : <span className="fs-6">{(itemDetails.budget)} $</span> </div></> : ""}
                        </div>
                        {itemDetails.overview ? <div className="my-2 fw-semibold fs-5 ">Description : <span className="fw-normal fs-6">{(itemDetails.overview)}</span></div> : ""}
                        {itemDetails.homepage ? <a target="_blank" href={itemDetails.homepage} rel="noreferrer">
                            <button className="btn btn-outline-warning p-1 my-2 ">Ticket booking</button>
                        </a> : ''}
                    </div>
                </div>
                {params.media_type === "person" ? "" : <Similar itemDetails={itemDetails} />}
            </div>}</>}
        </>
    );
}
