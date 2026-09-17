import React, { useEffect, useState } from 'react'
import { apiUrl, token } from './Config';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
const [categories, setCategories]  = useState([]);

const fetchCategories = async () => {
await fetch(`${apiUrl}/fetch-categories`,  {
        method : "GET",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
 })
  .then(res =>  res.json())
  .then(result =>  {
    // console.log(result);
      if(result.status == 200){
          setCategories(result.data);;
      }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
    }
})
}

 useEffect(()=> {
     fetchCategories();
 },[]);

  return (
    <section className='section-2'>
        <div className="container">
            <div className='section-title py-3  mt-4'>
                <h2 className='h3'>Explore Categories</h2>
                <p>Discover categories designed to help you excel in your professional and personal growth.</p>
            </div>
            <div className='row gy-3'>
                {
                    categories && categories.map(category => {
                        return (
                            <div key={category.id} className='col-6 col-md-6 col-lg-3' >
                    <div className='card shadow border-0'>
                        <div className='card-body'>
                            <Link to="">{category.name}</Link>
                            </div>
                    </div>
                </div>
                        )
                    })
                }
               
                
                
            </div>      
        </div>
    </section>
  )
}

export default FeaturedCategories
