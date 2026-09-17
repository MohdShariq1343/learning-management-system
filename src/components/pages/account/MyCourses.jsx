import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserSidebar from '../../common/UserSidebar'

import Layout from '../../common/Layout'
import { apiUrl, token } from '../../common/Config'
import EditCourse from '../../common/EditCourse'
import toast from 'react-hot-toast'

const MyCourses = () => {
 const [courses, setCourses]  = useState();
    
const fetchCourse = async () => {
  await fetch(`${apiUrl}/my-courses`,  {
        method : "GET",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
       
})
.then(res =>  res.json())
.then(result =>  {
    console.log(result);
    if(result.status == 200){
        setCourses(result.courses);
    }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
    }
})
}

const deleteCourse = async (id)  => {
 if(confirm('Are You sure ?')){
    await fetch(`${apiUrl}/courses/${id}`,  {
        method : "DELETE",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
       
   })
   .then(res =>  res.json())
   .then(result =>  {
    //  console.log(result);
     if(result.status == 200){
         const newCourses = courses.filter(course => course.id != id);
         setCourses(newCourses);
         toast.success(result.message);
     }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
     }
})
 }
}

  useEffect(() => {
     fetchCourse();
   },[]);



  return (
<Layout>
<section className='section-4'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 mt-5 mb-3'>
                    <div className='d-flex justify-content-between'>
                        <h2 className='h4 mb-0 pb-0'>My Courses</h2>
                        <Link to="/account/courses/create" className='btn btn-primary'>Create</Link>
                    </div>
                </div>
                <div className='col-lg-3 account-sidebar'>
                    <UserSidebar/>
                </div>
                <div className='col-lg-9'>
                    <div className='row gy-4'>

                        {
                            courses && courses.map((course) => {
                                return (
                                    <EditCourse key={course.id} course={course} deleteCourse={deleteCourse}/> 
                                )
                            })
                        }
                                            
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default MyCourses