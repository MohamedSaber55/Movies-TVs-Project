import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Seasons() {
    let params = useParams();
    const [seasonDetails, setSeasonDetails] = useState({})


    async function getSeasonsDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/2/season/1?api_key=8f238eaf1dbfa0b41a9a488198eb3113&language=en-US`);
        console.log(data);
        setSeasonDetails(data)
    }
    useEffect(() => {
        getSeasonsDetails()
    }, []);


    return (
        <div>Seasons</div>
    )
}
