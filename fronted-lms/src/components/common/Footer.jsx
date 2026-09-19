import React from 'react'

const Footer = () => {
    return (
    <footer >
        <div className='pt-5 container mt-5'>
            <div className='row pb-3 gy-4 justify-content-center'>
                
                <div className='col-lg-3 col-12'>
                    <div className='col-lg-12 col-md-6 col-12 pe-lg-5'>
                        <h2>LMS</h2>
                        <p>Join our Learning Management System and explore a wide range of courses to enhance your skills and achieve your goals.</p>
                    </div>
                </div>

                <div className='col-lg-3 col-md-6 col-12'>
                    <h2>Popular Categories</h2>
                    <ul>
                        <li><a href="#">Digital Marketing</a></li>
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Machine Learning</a></li>
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">Logo Design</a></li>
                        <li><a href="#">Graphic Design</a></li>
                    </ul>
                </div>

                <div className='col-lg-3 col-md-6 col-12'>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Register</a></li>
                        <li><a href="#">My Account</a></li>
                        <li><a href="#">Courses</a></li>
                    </ul>
                </div>
                
            </div>
            <div className='row copyright'>
                <div className='col-md-12 text-center py-4'>
                    &copy; 2025 All Rights Reserverd
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
