import React from 'react'
import { FaChartBar, FaDesktop, FaUserLock   } from "react-icons/fa";
import { BsMortarboardFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
const UserSidebar = () => {
  return (
    <div className='card border-0 shadow-lg'>
        <div className='card-body  p-4'>
            <ul>
                <li className='d-flex align-items-center'>
                    <Link to="/account/dashboard"><FaChartBar  size={16} className='me-2 ' /> Dashboard</Link>
                </li>
               
                <li  className='d-flex align-items-center'>
                    <Link to="/account/my-learning"><BsMortarboardFill  size={16} className='me-2' /> My Learning</Link>
                </li>
                <li  className='d-flex align-items-center'>
                    <Link to="/account/my-courses"><FaDesktop  size={16} className='me-2'/> My Courses</Link>
                </li>
                <li  className='d-flex align-items-center '>
                    <Link href="#"><FaUserLock  size={16}  className='me-2'/> Change Password</Link>
                </li>
                <li>
                    <Link to="/login" className='text-danger'><MdLogout  size={16} className='me-2'/> Logout</Link>
                </li>
            </ul>
        </div>                             
    </div>
  )
}

export default UserSidebar
