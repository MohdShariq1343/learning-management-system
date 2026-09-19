import React from 'react'

import CourseEnrolled from '../../common/CourseEnrolled'
import UserSidebar from '../../common/UserSidebar'
import Layout from '../../common/Layout'
import { apiUrl, token } from '../../common/Config'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const MyLearning = () => {
  const [enrollments, setEntrollments] = useState([])
  const fetchEntrollments = async ()  => {
      await fetch(`${apiUrl}/enrollments`,  {
          method : "GET",
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
           setEntrollments(result.data);
       }else{
          toast.success('Something went wrong');
          console.log('Something went wrong')
       }
  })

  }

  useEffect(() => {
    fetchEntrollments()
  },[])

  return (
        <Layout>
            <section className='section-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='d-flex justify-content-between  mt-5 mb-3'>
                            <h2 className='h4 mb-0 pb-0'>My Learning</h2>
                            {/* <a href="#" className='btn btn-primary'>Create</a> */}
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                           <UserSidebar/>
                        </div>
                        <div className='col-lg-9'>
              <div className='row gy-4'>
                {
                  enrollments && enrollments.map(enrollment => {
                    return (
                         <CourseEnrolled
                        key={enrollment.id}
                        enrollment={enrollment}

                      />
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

export default MyLearning
