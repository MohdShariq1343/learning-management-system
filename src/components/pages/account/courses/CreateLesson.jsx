import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';

const CreateLesson = ({course, handleCloseLessonModal, showLessonModal}) => {

const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
 const [loading, setLoading] = useState(false);
 
 const onSubmit = async (data) => {
     setLoading(true);
    await fetch(`${apiUrl}/lessons`,  {
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
             setLoading(false);
             if(result.status == 200){
                //   setChapters({type: "UPDATE_CHAPTER", payload: result.data})
                 toast.success(result.message);
                 reset({
                    chapter: '',
                    lesson: '',
                    status: 1
                 })
                handleCloseLessonModal(true);
             
          }else{
                 //  console.log(result)
                 const errors = result.errors;
                 Object.keys(errors).forEach((field) => {
                     setError(field, {message: errors[field][0]});
                 })
             }
 })
 }
 
  return (
     <div>
      <Modal show={showLessonModal} onHide={handleCloseLessonModal}>
        <Modal.Header closeButton>
        <Modal.Title>Create Lesson</Modal.Title>
        </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
    <div size="lg" className="mb-3">
        <label htmlFor="lesson">Select Lesson</label>
        <select name="" id='lesson'
           {
             ...register('chapter', {
              require:"Plese select a Chapter."
           })
       }
           className={`form-select mb-3 ${errors.chapter && 'is-invalid'}`}>
            <option value="">Select a Chapter</option>
            {
                course.chapters && course.chapters.map(chapter => {
                    return (
                        <option value={chapter.id}>{chapter.title}</option>
                    )
                })
            }
        </select>
        {
         errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
        }
        <label htmlFor="title">Lesson</label>
    <input 
    {
        ...register('lesson',{
         required : "The Lesson is required."
        })
    }
    type='text' className={`form-control mt-2 ${errors.lesson && 'is-invalid'}`} placeholder='lesson' />
       {
         errors.lesson && <p className='invalid-feedback'>{errors.lesson.message}</p>
        }
        <div className="mt-3">
            <label htmlFor="status">Status</label>
            <select name="" id="status" 
                {
                    ...register('status',{
                    required : "The Status is required."
                    })
                }
                type='text' className={`form-control mt-2 ${errors.lesson && 'is-invalid'}`} placeholder='lesson'>
                    <option value="1" selected>Active</option>
                    <option value="0">Block</option>
            </select>
                
        </div>
    </div>
 </Modal.Body>
 <Modal.Footer>
    <Button variant='primary' type='submit'  disabled={loading}>
            {loading == false ? 'Create Chapter' : 'Please wait...'}</Button>

 </Modal.Footer>
</form>
</Modal>

    </div>
  )
}

export default CreateLesson
