import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Home/Home'
import ProtectedRouter from '../ProtectedRouter/ProtectedRouter'
// import TV from '../TV/TV'
// import Movies from '../Movies/Movies'
import People from '../People/People'
// import Search from '../Search/Search'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import Contact from '../Contact/Contact'
import About from '../About/About'
import ItemDetails from '../ItemDetails/ItemDetails'
import Profile from '../Profile/Profile'
import PopularMovies from '../Movies/PopularMovies/PopularMovies'
import TopRatedMovies from '../Movies/TopRatedMovies/TopRatedMovies'
import UpcomingMovies from '../Movies/UpcomingMovies/UpcomingMovies'
import PopularTVs from '../TV/PopularTVs/PopularTVs'
import TopRatedTVs from '../TV/TopRatedTVs/TopRatedTVs'
import OnAirTVs from '../TV/OnAirTVs/OnAirTVs'
import OnAirToDay from '../TV/OnAirToDay/OnAirToDay'
import SearchPeople from '../Search/SearchPeople/SearchPeople'
import SearchMovies from '../Search/SearchMovies/SearchMovies'
import SearchTVs from '../Search/SearchTVs/SearchTVs'











export default function App() {


  const routers = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'itemdetails/:id/:media_type', element: <ItemDetails /> },
        // { path: 'movies', element: <ProtectedRouter><Movies /></ProtectedRouter>, },
        { path: 'movies/popular', element: <ProtectedRouter><PopularMovies /></ProtectedRouter> },
        { path: 'movies/toprated', element: <ProtectedRouter><TopRatedMovies /></ProtectedRouter> },
        { path: 'movies/upcoming', element: <ProtectedRouter><UpcomingMovies /></ProtectedRouter> },
        // { path: 'tvshows', element: <ProtectedRouter><TV /></ProtectedRouter> },
        { path: 'tvshows/popular', element: <ProtectedRouter><PopularTVs /></ProtectedRouter> },
        { path: 'tvshows/toprated', element: <ProtectedRouter><TopRatedTVs /></ProtectedRouter> },
        { path: 'tvshows/onair', element: <ProtectedRouter><OnAirTVs /></ProtectedRouter> },
        { path: 'tvshows/onairtoday', element: <ProtectedRouter><OnAirToDay /></ProtectedRouter> },
        { path: 'people', element: <ProtectedRouter><People /></ProtectedRouter> },
        { path: 'search/people', element: <ProtectedRouter><SearchPeople /></ProtectedRouter> },
        { path: 'search/movies', element: <ProtectedRouter><SearchMovies /></ProtectedRouter> },
        { path: 'search/tvshows', element: <ProtectedRouter><SearchTVs /></ProtectedRouter> },
        { path: 'contact', element: <ProtectedRouter><Contact /></ProtectedRouter> },
        { path: 'about', element: <ProtectedRouter><About /></ProtectedRouter> },
        { path: 'profile', element: <ProtectedRouter><Profile /></ProtectedRouter> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return (<>
    <RouterProvider router={routers} />
  </>
  )
}
