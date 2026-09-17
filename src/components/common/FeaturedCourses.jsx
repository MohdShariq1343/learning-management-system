import { useEffect, useState } from "react";
import Course from "./Course"
import { apiUrl, token } from "./Config";
import toast from "react-hot-toast";


const FeaturedCourses = () => {
    const [courses, setCourses]  = useState([]);
 const fetchFeaturedCourses = async () => {
 await fetch(`${apiUrl}/fetch-featured-courses`,  {
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
           setCourses(result.data);;
       }else{
         toast.error('Something went wrong');
         console.log('Something went wrong')
     }
 })
 }
 
  useEffect(()=> {
      fetchFeaturedCourses();
  },[]);

    return (
        <section className='section-3 my-5'>    
            <div className="container">
                <div className='section-title py-3  mt-4'>
                    <h2 className='h3'>Featured Courses</h2>
                    <p>Discover courses designed to help you excel in your professional and personal growth.</p>
                </div>
                <div className="row gy-4">
                    {
                        courses && courses.map(course => {
                            return (
                               <Course
                               key={course.id}
                                course={course}
                                customClasses="col-lg-3 col-md-6"
                               /> 
                            )
                        })
                    }
                    
                                
                    
                </div>
            </div>
        </section>
    )
}

export default FeaturedCourses
