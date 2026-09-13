import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';

const UpdateChapter = ({showChapter, handleClose, chapterData, setChapters}) => {
   const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
    setLoading(true);
   await fetch(`${apiUrl}/chapters/${chapterData.id}`,  {
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
                 setChapters({type: "UPDATE_CHAPTER", payload: result.data})
               
                toast.success(result.message);
               handleClose(true);
            
         }else{
                //  console.log(result)
                const errors = result.errors;
                Object.keys(errors).forEach((field) => {
                    setError(field, {message: errors[field][0]});
                })
            }
})
}


   
useEffect(() =>{
    if(chapterData){
        reset({
            chapter : chapterData.title
        })
    }
 },[chapterData])

  return (
    <div>
      <Modal show={showChapter} onHide={handleClose}>
 <Modal.Header closeButton>
  <Modal.Title>Update Chapter</Modal.Title>
 </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit)}>
 <Modal.Body>
    <div size="lg" className="mb-3">
        <label htmlFor="title">Chapter</label>
    <input 
    {
        ...register('chapter',{
         required : "The Chapter is required."
        })
    }
    type='text' className={`form-control ${errors.chapter && 'is-invalid'}`} placeholder='chapter' />
       {
         errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
        }
    </div>
 </Modal.Body>
 <Modal.Footer>
    {/* <Button variant='secondary' onClick={handleClose}>Close</Button> */}
    <Button variant='primary' type='submit'  disabled={loading}>
            {loading == false ? 'Update Chapter' : 'Please wait...'}</Button>

 </Modal.Footer>
</form>
</Modal>

    </div>
  )
}

export default UpdateChapter
