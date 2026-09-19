import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Accordion from 'react-bootstrap/Accordion';
import { MdSlowMotionVideo } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressBar from 'react-bootstrap/ProgressBar';


const WatchCourse = () => {
  return (
    <>
        <Header/>   
            <section className='section-5'>
                <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='video'>
                            <video width="100%" height="500" controls>
                                <source src="movie.mp4" type="video/mp4"/>
                                <source src="movie.ogg" type="video/ogg"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className='meta-content'>
                            <div className='d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 pt-1'>
                                <h3 className='pt-2'>Introduction</h3>
                                <div>
                                    <a href="" className='btn btn-primary px-3'>
                                        Mark as complete <IoMdCheckmarkCircleOutline size={20} /> </a>
                                </div>
                            </div>
                            <div>
                                <p>In this chapter we will learn about html basics</p>                               
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card rounded-0'>
                            <div className='card-body'>
                                <div className='h6'>
                                    <strong>Web Development Crash Course</strong>
                                </div>  
                                <div className='py-2'>
                                    <ProgressBar now={50} />
                                    <div className='pt-2'>
                                        50% complete
                                    </div>
                                </div>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Web Development basics</Accordion.Header>
                                        <Accordion.Body className='pt-2 pb-0 ps-0'>
                                            <ul className='lessons mb-0'>
                                                <li className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> Introduction
                                                    </a>
                                                </li>
                                                <li  className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> What is HTML
                                                    </a>
                                                </li>
                                                <li  className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> HTML Elements
                                                    </a>
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>HTML</Accordion.Header>
                                        <Accordion.Body className='pt-2 pb-0 ps-0'>
                                            <ul className='lessons mb-0'>
                                                <li className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> Introduction
                                                    </a>
                                                </li>
                                                <li  className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> What is HTML
                                                    </a>
                                                </li>
                                                <li  className='pb-2'>
                                                    <a href="">
                                                        <MdSlowMotionVideo size={20} /> HTML Elements
                                                    </a>
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                            
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

export default WatchCourse
