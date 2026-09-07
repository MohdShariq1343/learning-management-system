import React, { useState } from 'react'

import { Rating } from 'react-simple-star-rating'
import ReactPlayer from 'react-player'
import { Accordion, Badge, ListGroup, Card } from "react-bootstrap";
import Header from '../common/Header';
import Footer from '../common/Footer';

const Detail = () => {
    const [rating, setRating] = useState(4.0)

  return (
    <>
        <Header/>
        <div className='container pb-5 pt-3'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/courses">Courses</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Web Development Bootcamp 2025</li>
                </ol>
            </nav>
            <div className='row my-5'>
                <div className='col-lg-8'>
                    <h2>Web Development Bootcamp 2025</h2>
                    <div className='d-flex'>
                        <div className='mt-1'>
                            <span className="badge bg-green">Programming</span>
                        </div>
                        <div className='d-flex ps-3'>
                            <div className="text pe-2 pt-1">5.0</div>
                            <Rating  initialValue={rating} size={20} />                            
                        </div>
                    </div>
                    <div className="row mt-4">
                        {/* <div className="col">
                            <span className="text-muted d-block">Last Updates</span>
                            <span className="fw-bold">Aug 2021</span>
                        </div> */}
                        <div className="col">
                            <span className="text-muted d-block">Level</span>
                            <span className="fw-bold">Advance</span>
                        </div>
                        <div className="col">
                            <span className="text-muted d-block">Students</span>
                            <span className="fw-bold">150,668</span>
                        </div>
                        <div className="col">
                            <span className="text-muted d-block">Language</span>
                            <span className="fw-bold">English</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 mt-4'>
                            <div className='border bg-white rounded-3 p-4'>
                                <h3 className='mb-3  h4'>Overview</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Vivamus tincidunt, eros et tincidunt tincidunt, libero turpis posuere urna, ut consectetur justo erat a arcu. Fusce eget risus id mauris tincidunt posuere. Curabitur euismod, magna ut tristique venenatis, erat velit venenatis felis, at varius odio elit nec augue. Sed et sapien vitae justo dapibus dictum. </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Vivamus tincidunt, eros et tincidunt tincidunt, libero turpis posuere urna, ut consectetur justo erat a arcu. </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Vivamus tincidunt, eros et tincidunt tincidunt, libero turpis posuere urna, ut consectetur justo erat a arcu. Fusce eget risus id mauris tincidunt posuere. </p>
                            </div>
                        </div>
                        <div className='col-md-12 mt-4'>
                            <div className='border bg-white rounded-3 p-4'>
                                <h3 className='mb-3 h4'>What you will learn</h3>
                                <ul className="list-unstyled mt-3">
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="text-success me-2">&#10003;</span>
                                        <span>Obtain a strong understanding on the fundamentals of programming</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="text-success me-2">&#10003;</span>
                                        <span>Write your own independent programs in Python</span>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <span className="text-success me-2">&#10003;</span>
                                        <span>Understand the basics of Python language</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-12 mt-4'>
                            <div className='border bg-white rounded-3 p-4'>
                                <h3 className='mb-3 h4'>Requirements</h3>
                                <ul className="list-unstyled mt-3">
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="text-success me-2">&#10003;</span>
                                        <span>Access to PC running on windows</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="text-success me-2">&#10003;</span>
                                        <span>Internet connection to setup development network.</span>
                                    </li>                                    
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-12 mt-4'>
                            <div className='border bg-white rounded-3 p-4'>
                                <h3 className="h4 mb-3">Course Structure</h3>
                                <Accordion defaultActiveKey="0" id="courseAccordion">
                                    {/* Module 1 */}
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            Module 1: Introduction to Web Development <span className="ms-3 text-muted">(2 lectures - 3 hours)</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                What is Web Development?
                                                <Badge bg="primary">
                                                    <a href="#" className="text-white text-decoration-none">Preview</a>
                                                </Badge>
                                                <span className="text-muted">1 hour</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Tools and Setup for Web Development
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Module 2 */}
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            Module 2: HTML & CSS Basics <span className="ms-3 text-muted">(4 lectures - 6 hours)</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Introduction to HTML
                                                <span className="text-muted">1.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Building a Basic Webpage
                                                <Badge bg="primary">
                                                    <a href="#" className="text-white text-decoration-none">Preview</a>
                                                </Badge>
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Introduction to CSS
                                                <span className="text-muted">1.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Responsive Design Basics
                                                <span className="text-muted">1 hour</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Module 3 */}
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>
                                            Module 3: JavaScript Basics <span className="ms-3 text-muted">(5 lectures - 8 hours)</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                What is JavaScript?
                                                <span className="text-muted">1 hour</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Variables and Data Types
                                                <span className="text-muted">1.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Functions in JavaScript
                                                <span className="text-muted">1.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                DOM Manipulation Basics
                                                <Badge bg="primary">
                                                    <a href="#" className="text-white text-decoration-none">Preview</a>
                                                </Badge>
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Events in JavaScript
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Module 4 */}
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>
                                            Module 4: Building a Full-Stack Application <span className="ms-3 text-muted">(6 lectures - 15 hours)</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Setting Up a Backend with Node.js
                                                <span className="text-muted">3 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Introduction to Express.js
                                                <span className="text-muted">2.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Creating RESTful APIs
                                                <span className="text-muted">2.5 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Introduction to MongoDB
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Building the Frontend with React
                                                <Badge bg="primary">
                                                    <a href="#" className="text-white text-decoration-none">Preview</a>
                                                </Badge>
                                                <span className="text-muted">3 hours</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                Deploying the Application
                                                <span className="text-muted">2 hours</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    </Accordion>                                
                            </div>
                        </div>

                        <div className='col-md-12 mt-4'>
                            <div className='border bg-white rounded-3 p-4'>
                                <h3 className='mb-3 h4'>Reviews</h3>
                                <p>Our student says about this course</p>

                                <div className='mt-4'>
                                    <div className="d-flex align-items-start mb-4 border-bottom pb-3">
                                        <img src="https://placehold.co/50" alt="User" className="rounded-circle me-3" />
                                        <div>
                                            <h6 className="mb-0">Mohit Singh <span className="text-muted fs-6">Jan 2, 2025</span></h6>
                                            <div className="text-warning mb-2">
                                            <Rating  initialValue={rating} size={20} />  
                                            </div>
                                            <p className="mb-0">Quisque et quam lacus amet. Tincidunt auctor phasellus purus faucibus lectus mattis.</p>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-start mb-4  pb-3">
                                        <img src="https://placehold.co/50" alt="User" className="rounded-circle me-3" />
                                        <div>
                                            <h6 className="mb-0">mark Doe <span className="text-muted fs-6">Jan 10, 2025</span></h6>
                                            <div className="text-warning mb-2">
                                            <Rating  initialValue={rating} size={20} />  
                                            </div>
                                            <p className="mb-0">Quisque et quam lacus amet. Tincidunt auctor phasellus purus faucibus lectus mattis.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='border rounded-3 bg-white p-4 shadow-sm'>
                        <Card.Body>
                            <h3 className="fw-bold">$100</h3>
                            <div className="text-muted text-decoration-line-through">$200</div>
                            {/* Buttons */}
                            <div className="mt-4">
                                <button className="btn btn-primary w-100">
                                <i className="bi bi-ticket"></i> Buy Now
                                </button>
                            </div>
                        </Card.Body>
                        <Card.Footer className='mt-4'>
                            <h6 className="fw-bold">This course includes</h6>
                            <ListGroup variant="flush">
                                
                                <ListGroup.Item className='ps-0'> 
                                    <i className="bi bi-infinity text-primary me-2"></i>
                                    Full lifetime access
                                </ListGroup.Item>
                                <ListGroup.Item className='ps-0'>
                                    <i className="bi bi-tv text-primary me-2"></i>
                                    Access on mobile and TV
                                </ListGroup.Item>
                                <ListGroup.Item className='ps-0'>
                                    <i className="bi bi-award-fill text-primary me-2"></i>
                                    Certificate of completion
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Footer>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Detail
