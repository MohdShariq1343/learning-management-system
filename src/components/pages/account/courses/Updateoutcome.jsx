import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';

const Updateoutcome = ({outcomeData, showOutcome, handleClose, outcomes, setOutcomes}) => {
const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
    setLoading(true);
    
   await fetch(`${apiUrl}/outcomes/${outcomeData.id}`,  {
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
                // const newoutcomes = [...outcomes, result.data];
                // setOutcomes(newoutcomes);
                const updatedoutcomes = outcomes.map(outco => outco.id == result.data.id ? 
                    {...outco, text:result.data.text} : outco
                )
                setOutcomes(updatedoutcomes)  
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
    if(outcomeData){
        reset({
            outcome : outcomeData.text
        })
    }
 },[outcomeData])

  return (
    <div>
      <Modal show={showOutcome} onHide={handleClose}>
 <Modal.Header closeButton>
  <Modal.Title>Update Outcome</Modal.Title>
 </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit)}>
 <Modal.Body>
    <div size="lg" className="mb-3">
        <label htmlFor="title">outcome</label>
    <input 
    {
        ...register('outcome',{
         required : "The Outcome is required."
        })
    }
    type='text' className={`form-control ${errors.outcome && 'is-invalid'}`} placeholder='outcome' />
       {
         errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>
        }
    </div>
 </Modal.Body>
 <Modal.Footer>
    {/* <Button variant='secondary' onClick={handleClose}>Close</Button> */}
    <Button variant='primary' type='submit'  disabled={loading}>
            {loading == false ? 'Update Outcome' : 'Please wait...'}</Button>

 </Modal.Footer>
</form>
</Modal>

    </div>
  )
}

export default Updateoutcome
