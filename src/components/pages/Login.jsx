import React from 'react'

import { Link } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

const Login = () => {
  return (
   <>
        <Header/>
        <div className='container py-5 mt-5'>
            <div className='d-flex align-items-center justify-content-center'>
                <form>
                    <div className='card border-0 shadow login'>
                        <div className='card-body p-4'>
                            <h3 className='border-bottom pb-3 mb-3'>Login</h3>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="email">Email</label>
                                <input 
                                type="text" className='form-control' placeholder='Email' />                                
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="password">Password</label>
                                <input 
                                type="password" className='form-control' 
                                placeholder='Password' />
                                
                            </div>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <button className='btn btn-primary'>Login</button>
                                <Link to={`/register`} className='text-secondary'>Register Here</Link>
                            </div>                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
   </>
  )
}

export default Login
