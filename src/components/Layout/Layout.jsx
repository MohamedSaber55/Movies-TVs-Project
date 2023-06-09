import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import ScrollToTop from '../ScrollToTop/ScrollToTop.jsx'

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <div className="" style={{ minHeight: '90vh' }}>
                <Outlet className="main-outlet"></Outlet>
            </div>
            <Footer />
        </>
    )
}
