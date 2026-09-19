import React from 'react'
import Layout from '../../../common/Layout'
import UserSidebar from '../../../common/UserSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../../common/Config'
import toast from 'react-hot-toast'

const CreateCourse = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
     const navigate = useNavigate();

    const onSubmit = async (data) => {
        // console.log(data);
        await fetch(`${apiUrl}/courses`,  {
             method : "POST",
             headers : {
                "Content-type" :  "application/json",
                "Accept" :  "application/json",
                "Authorization" : `Bearer ${token}`,
             },
             body : JSON.stringify(data)
        })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status == 200){
                toast.success(result.message);
                navigate(`/account/courses/edit/${result.data.id}`);
            }else{

            }
        })
    }
  return (
    <Layout>
        <section className='section-4'>
                     <div className='container pb-5 pt-3'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/account">Account</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Course</li>
                            </ol>
                        </nav>
                        <div className='row'>
                            <div className='col-md-12 mt-5 mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <h2 className='h4 mb-0 pb-0'>
                                         <Link to="/account/courses/create">Create Course</Link></h2>
                                </div>
                            </div>
                            <div className='col-lg-3 account-sidebar'>
                                <UserSidebar/>
                            </div>
                            <div className='col-lg-9'>
                                <div className='row'>
                                      <div className="col-md-12">
                                     <form onSubmit={handleSubmit(onSubmit)}>
                                         <div className="card">
                                             <div className="card-body">
                                              <div className="mb-3">
                                                <label htmlFor="title fw-semibold">Course Title</label>
                                                <input type="text"
                                                {
                                                    ...register('title',{
                                                        required:  'Title Filed Required.'
                                                    })
                                                }
                                                placeholder='Enter Title'
                                                className={`form-control mt-3 ${errors.title && 'is-invalid'}`}/>
                                                {
                                        errors.title && <p className='invalid-feedback'>{errors.title.message}</p>
                                    }
                                              </div>

                                              <button className='btn btn-info btn-sm px-3 py-2' type='submit'>Continue</button>
                                             </div>
                                         </div>
                                    </form>
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    </Layout>
  )
}

export default CreateCourse
