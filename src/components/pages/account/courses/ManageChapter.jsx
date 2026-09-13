import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import UpdateChapter from './UpdateChapter';

const ManageChapter = ({course, params}) => {
const [chapterData, setChapterData] = useState([]);
const [showChapter, setShowChapter] = useState(false);
const [loading, setLoading] = useState(false);
const handleClose = () => {
    setShowChapter(false);
}
const handleShow = (chapter) => {
   setChapterData(chapter);
    setShowChapter(true);
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



 useEffect( () => {
    if(course.chapters){
        setChapters({type: "SET_CHAPTERS", payload: course.chapters})
    }
 },[course])



  return (
    <>
     <div className="card">
    <div className="card-body">
        <h5>Chapters</h5>
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
                <AccordionItem eventKey={index}>
                   <AccordionHeader>
                   {chapter.title}
                   </AccordionHeader>
                   <AccordionBody>
                    <div className="d-flex">
                        <button className='btn btn-sm btn-info'
                         onClick={() => handleShow(chapter)}>Edit chapter</button>
                        <button className='btn btn-sm btn-danger' 
                        onClick={() => deleteChapter(chapter.id)}
                        >Delete chapter</button>
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
        </div>
        </>
  )
}

export default ManageChapter
