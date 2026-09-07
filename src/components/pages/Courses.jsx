import React, { useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Course from '../common/Course'

const Courses = () => {
    const [rating, setRating] = useState(4.0)

    return (
    <>
        <Header/>
            <div className='container pb-5 pt-3'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Courses</li>
                    </ol>
                </nav>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='sidebar mb-5 card border-0'>
                            <div className='card-body shadow'>
                                <input type="text" className='form-control' placeholder='Search by keyword'/>
                                <div className='pt-3'>
                                    <h3 className='h5 mb-2'>Category</h3>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Web Development
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                    Mobile Development
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                    Digital Marketing
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault4">
                                                Graphic Design
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault5"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault5">
                                                Software Design
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className='mb-3'>
                                    <h3 className='h5  mb-2'>Level</h3>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault11"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault11">
                                                Beginner
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault12"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault12">
                                                Intermediate
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault13"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault13">
                                                    Advance
                                                </label>
                                            </div>
                                        </li>                                        
                                    </ul>
                                </div>
                                <div className='mb-3'>
                                    <h3 className='h5 mb-2'>Language</h3>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault31"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault31">
                                                English
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault32"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault32">
                                                Hindi
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault33"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault33">
                                                Spanish
                                                </label>
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault33"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault33">
                                                German
                                                </label>
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault34"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault34">
                                                Italian
                                                </label>
                                            </div>
                                        </li>                                        
                                    </ul>
                                </div>
                                <a href="" className='clear-filter'>Clear All Filters</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <section className='section-3'>
                            <div className='d-flex justify-content-between mb-3 align-items-center'>
                                <div  className='h5 mb-0'>
                                    {/* 10 courses found */}
                                </div>    
                                <div>
                                    <select name="" id="" className='form-select'>
                                        <option value="0">Newset First</option>
                                        <option value="1">Oldest First</option>
                                    </select>
                                </div>
                            </div> 
                            <div className="row gy-4">   
                                                            
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                                <Course 
                                    title='The complete 2025 Web Development Bootcamp'
                                    level='Advance'
                                    enrolled='10'
                                    customClasses="col-lg-4 col-md-6"
                                />
                            </div>
                        </section>
                    </div>
                </div>
           </div>
        <Footer/>
    </>
  )
}

export default Courses
