import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import UpdateChapter from './UpdateChapter';
import CreateLesson from './CreateLesson';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import LessonSort from './LessonSort';
import SortChapter from './SortChapters';
import SortChapters from './SortChapters';

const ManageChapter = ({course, params}) => {
    const [loading, setLoading] = useState(false);
  
    //upadte Chapter Modal 
const [chapterData, setChapterData] = useState([]);
const [showChapter, setShowChapter] = useState(false);
const handleClose = () => {
    setShowChapter(false);
}
const handleShow = (chapter) => {
   setChapterData(chapter);
    setShowChapter(true);
}


    //upadte Lesson modal 
const [showLessonModal, setShowLessonModal] = useState(false);
const handleCloseLessonModal = () => {
    setShowLessonModal(false);
}
const handleShowLessonModal = () => {
    setShowLessonModal(true);
}

   //upadte Lesson modal 
   const [lessonsData, setLessonsData] = useState([]);
const [showLessonSortModal, setShowLessonSortModal] = useState(false);
const handleCloseLessonSortModal = () => {
    setShowLessonSortModal(false);
}
const handleShowLessonSortModal = (lessons) => {
    setLessonsData(lessons);
    setShowLessonSortModal(true);
}

  //upadte chapter modal 
const [showChapterSortModal, setShowChapterSortModal] = useState(false);
const handleCloseChapterSortModal = () => {
    setShowChapterSortModal(false);
}
const handleShowChapterSortModal = (chapters) => {
    setShowChapterSortModal(true);
}


const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

//useReducer used
// const [state, dispatch] = useReducer(reducer,initialState);

const chapterReducer = (state, action) => {
    switch(action.type){
        case "SET_CHAPTERS": return action.payload;
        case "ADD_CHAPTER": return [...state, action.payload];
        case "UPDATE_CHAPTER": 
        return state.map(chapter => {
            if(chapter.id === action.payload.id){
                return action.payload;
            }
            return chapter;
        }) 
        case "DELETE_CHAPTER": 
        return state.filter(chapter => chapter.id !=  action.payload)
        
        
        default: return state
    }
}

const [chapters, setChapters] = useReducer(chapterReducer,[]);

const onSubmit = async (data) => {
    setLoading(true);
    const formData =  {...data, course_id : params.id}
     console.log(formData);
   await fetch(`${apiUrl}/chapters`,  {
        method : "POST",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify(formData)
       })
        .then(res =>  res.json())
        .then(result =>  {
            setLoading(false);
            if(result.status == 200){
                //const newcourse = [...course, result.data];
                //setCourse(newcourse);
                setChapters({type: "ADD_CHAPTER", payload: result.data})
            toast.success(result.message);
            reset();
            
         }else{
                //  console.log(result)
                const errors = result.errors;
                Object.keys(errors).forEach((field) => {
                    setError(field, {message: errors[field][0]});
                })
            }
})
}
const deleteChapter = async (id) => {
if(confirm('Are  you sure ?')){
   await fetch(`${apiUrl}/chapters/${id}`,  {
        method : "DELETE",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },

       })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status == 200){
                 setChapters({type: "DELETE_CHAPTER", payload: id})
                toast.success(result.message);
            
            }else{
             console.log(result)
               
            }
})
}
}

const deleteLesson = async (id) => {
if(confirm('Are  you sure ?')){
   await fetch(`${apiUrl}/lessons/${id}`,  {
        method : "DELETE",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },

       })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status == 200){
                 setChapters({type: "UPDATE_CHAPTER", payload: result.chapter})
                toast.success(result.message);
            
            }else{
             console.log(result)
               
            }
})
}
}


 useEffect( () => {
    if(course.chapters){
        setChapters({type: "SET_CHAPTERS", payload: course.chapters})
    }
 },[course])



  return (
    <>
     <div className="card">
    <div className="card-body">
        <div className="d-flex justify-content-between">
        <h5>Chapters</h5>
          <div>
               <Link onClick={() => handleShowLessonModal()}><b className='text-success'><FaPlus size={12}/> Add Course</b></Link>
           <Link onClick={() => handleShowChapterSortModal()}><b className='text-primary ms-2'><FaPlus size={12}/> Reorder Chapters</b></Link>
          </div>
           
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
            <div className="mb-3">
            <input
             {
                ...register("chapter",{
                    required : "Chapter is required."
                })
             }
            type="text" className={`form-control ${errors.chapter && 'is-invalid'}`} placeholder='Chapter'/>
              {
               errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
              }

        </div>
        <button className='btn btn-primary px-3 py-2' type='submit' 
            disabled={loading}>
            {loading == false ? 'Add Chapter' : 'Please wait...'}
        </button>
        
        </form>
        <div className="mt-3">
            <Accordion>
                {
                    chapters.map((chapter,index) => {
                return (
                <AccordionItem key={index} eventKey={index}>
                   <AccordionHeader>
                   {chapter.title}
                   </AccordionHeader>
                   <AccordionBody>
                    <div className="row">
                        <div className="col-md-12">
                 <div className='d-flex justify-content-between mb-2 mt-2'>
                    <h5 className='fw-bold'>Lessons</h5>
             
                    <Link onClick={() => handleShowLessonSortModal(chapter.lessons)} data-discover="true">
                        <strong>Reorder Lessons</strong>
                    </Link>

                       </div>
                      </div>
                      <div className="col-md-12">
                        
                    {
                        chapter.lessons && chapter.lessons.map(lesson => {
                            return (
                                <div key={lesson.id} className='card shadow p-2 mb-1 rounded-0'>
                                    <div className="row">
                                    <div className="col-md-7">
                                    {lesson.title}

                                    </div>
                                    <div className="col-md-5 text-md-end">
                                        {
                                            lesson.duration >  0 && 
                                            <small className='fw-bold text-muted me-2'>{lesson.duration}</small>
                                        }
                                        {
                                            lesson.is_free_preview == "yes" &&
                                        <small className='badge bg-success'>Preview</small>
                                        }
                                        <Link to={`/account/courses/edit-lesson/${lesson.id}/${course.id}`} className='ms-2 text-primary'><BsPencilSquare/></Link>
                                        <Link className='ms-1 text-danger' 
                                         onClick={() => deleteLesson(lesson.id)}><FaTrash/></Link>
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                      </div>
                      <div className="col-md-12 mt-2">
                            <div className="d-flex">
                        <button className='btn btn-sm btn-info'
                         onClick={() => handleShow(chapter)}>Edit chapter</button>
                        <button className='btn btn-sm py-1 btn-danger' 
                        onClick={() => deleteChapter(chapter.id)}
                        >Delete chapter</button>
                    </div>
                      </div>
                    </div>

                   
                   </AccordionBody>
                </AccordionItem>
                )
            })
        }
            </Accordion>
        </div>

        </div>
        <UpdateChapter chapterData={chapterData} 
                       handleClose={handleClose} 
                       showChapter={showChapter} 
                       setChapters={setChapters} 
         />

         <CreateLesson
          course={course}
          handleCloseLessonModal={handleCloseLessonModal}
          showLessonModal={showLessonModal}
          />
         <LessonSort 
         showLessonSortModal={showLessonSortModal}
         handleCloseLessonSortModal={handleCloseLessonSortModal}
         lessonsData={lessonsData}
         setChapters={setChapters} 
         />
         <SortChapters 
          showChapterSortModal={showChapterSortModal}
         handleCloseChapterSortModal={handleCloseChapterSortModal}
         course={course}
         setChapters={setChapters} 
         />


        </div>
        </>
  )
}

export default ManageChapter
