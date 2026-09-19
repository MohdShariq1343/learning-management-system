import React, { useEffect, useState } from 'react'
import Layout from '../../../common/Layout'
import UserSidebar from '../../../common/UserSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../../common/Config'
import toast from 'react-hot-toast';
import ManageOutcome from './ManageOutcome'
import ManageRequirement from './ManageRequirement'
import EditCover from './EditCover'
import ManageChapter from './ManageChapter'

const EditCourse = () => {
const params = useParams();
const [loading, setLoading] = useState(false);
const [course, setCourse] = useState([]);

const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
defaultValues : async () => {
    await fetch(`${apiUrl}/courses/${params.id}`,  {
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
            reset({
                title : result.data.title,
                category : result.data.category_id,
                level : result.data.level_id,
                language : result.data.language_id,
                description : result.data.description,
                sell_price : result.data.price,
                cross_price : result.data.cross_price,
            })
            setCourse(result.data);
        // toast.success(result.message);
        // navigate(`/account/courses/${result.data.id}`);
    }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
    }
})

}
});
const navigate = useNavigate();
const [categories, setCategories] = useState([]);
const [levels, setLevels] = useState([]);
const [languages, setLanguages] = useState([]);

const onSubmit = async (data) => {
// console.log(data);
setLoading(true);
await fetch(`${apiUrl}/courses/${params.id}`,  {
        method : "PUT",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify(data)
})
.then(res =>  res.json())
.then(result =>  {
    setLoading(false);
    if(result.status == 200){
        toast.success(result.message);
       
    }else{
                //  console.log(result)
                const errors = result.errors;
                Object.keys(errors).forEach((field) => {
                    setError(field, {message: errors[field][0]});
                })
            }
})
}

const courseMetaData = async (data) => {
// console.log(data);
await fetch(`${apiUrl}/courses/meta-data`,  {
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
        setCategories(result.categories);
        setLevels(result.levels);
        setLanguages(result.languages);
        // toast.success(result.message);
        // navigate(`/account/courses/${result.data.id}`);
    }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
    }
})
}

const changeStatus = async (course) => {
    const status = (course.status == 1) ? 0 : 1;
  await fetch(`${apiUrl}/change-course-status/${course.id}`,  {
        method : "POST",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify({status:status})
})
.then(res =>  res.json())
.then(result =>  {
    console.log(result);
    if(result.status == 200){
        toast.success(result.message)
        setCourse({...course, status: result.course.status});
        // navigate(`/account/courses/${result.data.id}`);
    }else{
        toast.success('Something went wrong');
        console.log('Something went wrong')
    }
})
}

useEffect(() => {
courseMetaData();
},[])

return (
<Layout>
    <section className='section-4'>
    <div className='container pb-5 pt-3'>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/account">Account</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Course</li>
        </ol>
    </nav>
    <div className='row'>
        <div className='col-md-12 mt-5 mb-3'>
            <div className='d-flex justify-content-between'>
                <h2 className='h4 mb-0 pb-0'>
                        <Link to="/account/courses/create">Edit Course</Link></h2>
                        <div>
                            {
                                course.status == 0  &&
                                  <Link onClick={() => changeStatus(course)} className='btn btn-secondary'>Publish</Link>
                            }
                            {
                                course.status == 1  &&
                                  <Link onClick={() => changeStatus(course)} className='btn btn-primary'>Unpublish</Link>
                            }

                            <Link className='btn btn-dark ms-2' to="/account/my-courses">Back</Link>

                        </div>
            </div>
        </div>
        <div className='col-lg-3 account-sidebar'>
            <UserSidebar/>
        </div>
        <div className='col-lg-9'>
            <div className='row'>
                
                    <div className="col-md-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-body">
                            <div className="mb-3">
                            <label className='form-label' htmlFor="title">Course Title</label>
                            <input type="text"
                            {
                                ...register('title',{
                                    required:  'Title Filed Required.'
                                })
                            }
                            placeholder='Enter Title'
                            className={`form-control ${errors.title && 'is-invalid'}`}/>
                            {
                    errors.title && <p className='invalid-feedback'>{errors.title.message}</p>
                        }
                            </div>
                            <div className="mb-3">
                            <label className='form-label' htmlFor="category">Category </label>
                                <select className={`form-select ${errors.category && 'is-invalid'}`} id="category"
                                {
                                ...register('category',{
                                    required:  'category Field Required.'
                                })
                            }
                                >
                                <option value="">Select A Category</option>
                                {
                                    categories  && categories.map(category => {
                                        return  (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                                
                                </select>
                                 {
                    errors.category && <p className='invalid-feedback'>{errors.category.message}</p>
                        }

                            </div>
                                <div className="mb-3">
                            <label className='form-label' htmlFor="level">Level</label>
                                <select className={`form-select ${errors.level && 'is-invalid'}`}  id="level" 
                                 {
                                ...register('level',{
                                    required:  'level Field Required.'
                                })
                            }
                                >
                                <option value="">Select A Level</option>
                                {
                                    levels  && levels.map(level => {
                                        return  (
                                            <option key={level.id}  value={level.id}>{level.name}</option>
                                        )
                                    })
                                }
                                </select>
                                 {
                    errors.level && <p className='invalid-feedback'>{errors.level.message}</p>
                        }

                            </div>
                            <div className="mb-3">
                            <label className='form-label' htmlFor="language">Language</label>
                                <select className={`form-select ${errors.language && 'is-invalid'}`} id="language" 
                                  {
                                ...register('language',{
                                    required:  'language Field Required.'
                                })
                            }
                                >
                                <option value="">Select A Language</option>
                                {
                                    languages && languages.map(language => {
                                        return  (
                                            <option key={language.id} value={language.id}>{language.name}</option>
                                        )
                                    })
                                }
                                </select>
                                 {
                    errors.languages && <p className='invalid-feedback'>{errors.language.message}</p>
                        }

                            </div>
                                <div className="mb-3">
                            <label className='form-label' htmlFor="description">Description</label>
                                <textarea
                                  {
                                ...register('description')
                            }
                                className={`form-control ${errors.description && 'is-invalid'}`} rows={5} id="description">
                                </textarea>

                            </div>
                            <h5 className='fw-bold border-bottom py-2 mb-3'>Pricing</h5>
                            <div className="mb-3">
                            <label className='form-label' htmlFor="sell_price">Sell Price</label>
                            <input 
                             {
                                ...register('sell_price',{
                                    required:  'sell price Field Required.'
                                })
                            }
                            className={`form-control ${errors.sell_price && 'is-invalid'}`} 
                            type="text" id='sell_price'/>
                             {
                    errors.sell_price && <p className='invalid-feedback'>{errors.sell_price.message}</p>
                        }
                            </div>
                                <div className="mb-3">
                            <label className='form-label' htmlFor="cross-price">Cross Price</label>
                            <input  className='form-control'
                             {
                                ...register('cross_price')
                            }
                             type="text" id='cross-price'/>
                             
                            </div>

                            <button className='btn btn-primary px-3 py-2' type='submit' 
                             disabled={loading}>
                                {loading == false ? 'Update Course' : 'Please wait...'}
                            </button>
                            </div>
                        </div>
                </form>
                <div className="mt-3">
                    <ManageChapter
                      course={course}
                      params={params}
                    />
                </div>
                    </div>

                    <div className="col-md-5">
                       <ManageOutcome/>
                       <ManageRequirement/>
                       <EditCover 
                         course={course}
                         setCourse={setCourse}
                       />
                    </div>
            </div>
        </div>
    </div>
</div>
</section>
</Layout>
)
}

export default EditCourse
