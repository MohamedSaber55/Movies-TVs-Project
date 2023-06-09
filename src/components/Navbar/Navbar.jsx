import React, { useContext } from 'react'
import { Offline } from 'react-detect-offline'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import DetectOffline from '../DetectOffline/DetectOffline'
import navStyle from './../Navbar/navStyle.module.scss'


export default function Navbar() {
    const { userInfo, logOut } = useContext(AuthContext)
    return (
        <>
            <div className={navStyle.navbar}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-uppercase fs-2 fw-bold" to="/">Fil<span className="fs-4 text-warning">moon</span></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa-solid fa-bars fs-3 text-warning"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {userInfo ? <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="movies" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Movies
                                        </Link>
                                        <ul className="dropdown-menu bg-dark">
                                            <li><Link className="dropdown-item" to="movies/popular">Popular Movies</Link></li>
                                            <li><Link className="dropdown-item" to="movies/toprated">Top Rated Movies</Link></li>
                                            <li><Link className="dropdown-item" to="movies/upcoming">Upcoming Movies</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="tvshows" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            TV Shows
                                        </Link>
                                        <ul className="dropdown-menu bg-dark">
                                            <li><Link className="dropdown-item" to="tvshows/popular">Popular Tv Shows</Link></li>
                                            <li><Link className="dropdown-item" to="tvshows/toprated">Top Rated Tv Shows</Link></li>
                                            <li><Link className="dropdown-item" to="tvshows/onair">On Air Tv Shows</Link></li>
                                            <li><Link className="dropdown-item" to="tvshows/onairtoday">On Air ToDay Tv Shows</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="people">People</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="contact">Contact</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="movies" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-magnifying-glass text-warning small"></i> Search
                                        </Link>
                                        <ul className="dropdown-menu bg-dark">
                                            <li><Link className="dropdown-item" to="search/movies">Movies</Link></li>
                                            <li><Link className="dropdown-item" to="search/tvshows">TV Shows</Link></li>
                                            <li><Link className="dropdown-item" to="search/people">People</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </> : ''}
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <ul className="navbar-nav flex-row mb-2 mb-lg-0 ">
                                    <li className="nav-item me-2 mb-lg-0">
                                        <Link className="nav-link" to="https://www.facebook.com/profile.php?id=100014025102184&mibextid=ZbWKwL" target="_blank"><i className="fa-brands fa-facebook"></i></Link>
                                    </li>
                                    <li className="nav-item me-2 mb-lg-0">
                                        <Link className="nav-link" to="https://www.linkedin.com/in/mohamed-saber-562149218" target="_blank"><i className="fa-brands fa-linkedin"></i></Link>
                                    </li>
                                    <li className="nav-item me-2 mb-lg-0">
                                        <Link className="nav-link" to="https://www.instagram.com/mo_saber5/" target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                                    </li>
                                    <li className="nav-item me-2 mb-lg-0">
                                        <Link className="nav-link" to="https://github.com/MohamedSaber55" target="_blank"><i className="fa-brands fa-github"></i></Link>
                                    </li>
                                </ul>
                                {userInfo ? <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ms-0 mx-lg-2`} to="profile">{userInfo.first_name}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={logOut} className={`btn-outline-warning nav-link btn small ms-0 mx-lg-2 px-2 text-light`}>Logout</button>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link className={`btn-outline-warning nav-link btn small mx-2 my-2 my-lg-0`} to="login">Log In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`btn-outline-warning nav-link btn small mx-2`} to="register">Register</Link>
                                    </li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <Offline><DetectOffline /></Offline>
                </div>
            </div>
        </>
    )
}
