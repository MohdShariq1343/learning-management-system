import React, { useEffect, useMemo, useRef, useState } from 'react'
import UserSidebar from '../../../common/UserSidebar'
import Layout from '../../../common/Layout'
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import { Link, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import toast from 'react-hot-toast';
import LessonVideo from './LessonVideo';

const EditLesson = ({placeholder}) => {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [checked, setChecked] = useState(false);

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
      readyonly :false,
      placeholder : placeholder || 'Start  typing...'
    }),
    [placeholder]
  )
    const onSubmit = async (data) => {
     setLoading(true);
    //  console.log(checked);
     data.description = content;
     data.free_preview = checked == true ? true : false;
    //  console.log(data);
    await fetch(`${apiUrl}/lessons/${params.id}`,  {
                method : "PUT",
                headers : {
                "Content-type" :  "application/json",
                "Accept" :  "application/json",
                "Authorization" : `Bearer ${token}`,
                },
                body:JSON.stringify(data)
        })
        .then(res =>  res.json())
        .then(result =>  {
            setLoading(false);
            if(result.status === 200){
                toast.success(result.message);
            }else{
                console.log('something went wrong');
            }
        });
    
    }

    useEffect(() => {
   fetch(`${apiUrl}/chapters?course_id=${params.courseId}`,  {
                method : "GET",
                headers : {
                "Content-type" :  "application/json",
                "Accept" :  "application/json",
                "Authorization" : `Bearer ${token}`,
                },
        })
        .then(res =>  res.json())
        .then(result =>  {
            setLoading(false);
            if(result.status === 200){
                setChapters(result.data);
            }else{
                console.log('something went wrong');
            }
        });


     fetch(`${apiUrl}/lessons/${params.id}`,  {
                method : "GET",
                headers : {
                "Content-type" :  "application/json",
                "Accept" :  "application/json",
                "Authorization" : `Bearer ${token}`,
                },
        })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status === 200){
                // console.log(result.data);
                setLessons(result.data);
                reset({
                    lesson: result.data.title,
                    chapter_id: result.data.chapter_id,
                    duration: result.data.duration,
                    status: result.data.status,
                });
                 setChecked(result.data.is_free_preview == 'yes' ? true : false);
                 setContent(result.data.description);
             }else{
                console.log('something went wrong');
             }
        });
        
        

    },[])
  return (
<Layout>
<section className='section-4'>
<div className='container pb-5 pt-3'>

<div className='row'>
<div className='col-md-12 mt-5 mb-3'>
    <div className='d-flex justify-content-between'>
        <h2 className='h4 mb-0 pb-0'>Edit Lesson</h2>
        <Link to={`/account/courses/edit/${params.courseId}`} className='btn btn-primary'>Back</Link>
    </div>
</div>
<div className='col-lg-3 account-sidebar'>
    <UserSidebar/>
</div>
      <div className='col-lg-9'>
    <div className='row'>
        
            <div className="col-md-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                    <div className="card-body">
                    <div className="mb-3">
                    <label className='form-label' htmlFor="title">Course Title</label>
                    <input 
                     {
                        ...register('lesson',{
                            required : "Title Is required."
                        })
                     }
                    type="text" className={`form-control ${errors.lesson && 'is-invalid'}`} placeholder='Title'/>
                    {
         errors.lesson && <p className='invalid-feedback'>{errors.lesson.message}</p>
        }
                    </div>
                    <div className="mb-3">
                    <label className='form-label' htmlFor="chapter">Chapter</label>
                    <select
                     {
                        ...register('chapter_id',{
                            required : "Chapter Is required."
                        })
                     }
                     id="chapter" className={`form-select ${errors.chapter_id && 'is-invalid'}`}>
                        <option value="">Select chapter</option>
                        {
                            chapters && chapters.map(chapter => {
                                return (
                                    <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                                )
                            })
                        }
                    </select>
                    {
         errors.chapter_id && <p className='invalid-feedback'>{errors.chapter_id.message}</p>
        }
                    </div>
                    <div className="mb-3">
                    <label className='form-label' htmlFor="duration">Duration</label>
                    <input 
                    {
                        ...register('duration',{
                            required : "Duration Is required."
                        })
                     }
                    type="number" className={`form-control ${errors.duration && 'is-invalid'}`} id="duration" placeholder='Duration'/>
                    {
         errors.duration && <p className='invalid-feedback'>{errors.duration.message}</p>
        }
                    </div>
                     <div className="mb-3">
                    <label className='form-label' htmlFor="description">Description</label>
                    <JoditEditor
                     ref={editor}
                     value={content}
                     config={config}
                     tabIndex={1}
                     onBlur={newContent => setContent(newContent)}
                       onChange={newContent =>  {}}
                    />
                    </div>
                    <div className="mb-3">
                    <label className='form-label' htmlFor="status">Status</label>
                     <select 
                     {
                        ...register('status',{
                            required : "Status Is required."
                        })
                     }
                     id="status" className={`form-select ${errors.status && 'is-invalid'}`}>
                        <option value="1"  >Active</option>
                        <option value="0">Block</option>
                     </select>
                     {
         errors.status && <p className='invalid-feedback'>{errors.status.message}</p>
        }
                    </div>
                    <div className="mb-3">
                    <label className='form-label d-flex' htmlFor="free">
                         
                      <input
                       
                      type="checkbox" name="" id="free" className='form-check me-2' 
                       checked={checked} 
                       onChange={(e) => setChecked(e.target.checked)}
                      />
                      Free Lesson</label>
                    </div>
                   
                
                    <button className='btn btn-primary px-3 py-2' type='submit' 
                        disabled={loading}>
                        {loading == false ? 'Update Lesson' : 'Please wait...'}
                    </button>
                    </div>
                </div>
        </form>
        
            </div>

            <div className="col-md-4">
    <div className="card1">
        <LessonVideo
        lesson={lessons}
        />
    </div>
</div>

                    
            </div>
        </div>


        
    </div>
</div>
</section>
</Layout>
  )
}

export default EditLesson
