import React from 'react'
import Footer from './footer'
import NavBar from './navbar'
import SideBar from './sidebar'

export default function Interface({ children }) {
    return (
        <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <SideBar />
          <NavBar />
          <div className="main-panel">
            <div className="content-wrapper">
              { children }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
}
