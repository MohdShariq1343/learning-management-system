import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import UserSidebar from './UserSidebar'

const Dashboard = () => {
	
  return (
    <>
        <Header/>
      	<section className='section-4'>
             <div className='container pb-5 pt-3'>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><Link to="/account">Account</Link></li>
						<li className="breadcrumb-item active" aria-current="page">Dashboard</li>
					</ol>
				</nav>
                <div className='row'>
                    <div className='col-md-12 mt-5 mb-3'>
                        <div className='d-flex justify-content-between'>
                            <h2 className='h4 mb-0 pb-0'>Dashboard</h2>
                        </div>
                    </div>
                    <div className='col-lg-3 account-sidebar'>
                        <UserSidebar/>
                    </div>
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='card shadow '>
                                    <div className='card-body p-3'>
                                        <h2>0</h2>
                                        <span>Sales</span>
                                    </div>
                                    <div className='card-footer'>
                                        &nbsp;
                                        {/* <Link to="">View Users</Link> */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card shadow '>
                                    <div className='card-body p-3'>
                                        <h2>0</h2>
                                        <span>Enrolled Users</span>
                                    </div>
                                    <div className='card-footer'>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card shadow '>
                                    <div className='card-body p-3'>
                                        <h2>0</h2>
                                        <span>Active Courses</span>
                                    </div>
                                    <div className='card-footer'>
                                        <Link to="/admin/orders">View Courses</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  )
}

export default Dashboard
