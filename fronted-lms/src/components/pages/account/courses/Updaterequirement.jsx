import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';
   
    
const Updaterequirement = ({requirements, setRequirements, requirementData, handleClose , showRequirement}) => {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
     setLoading(true);
    
   await fetch(`${apiUrl}/requirements/${requirementData.id}`,  {
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
                const updatedrequirements = requirements.map(requirement => requirement.id == result.data.id ? 
                    {...requirement, text:result.data.text} : requirement
                )
                setRequirements(updatedrequirements)  
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
    if(requirementData){
        reset({
            requirement : requirementData.text
        })
    }
 },[requirementData])


  return (
    <>
       <Modal show={showRequirement} onHide={handleClose}>
 <Modal.Header closeButton>
  <Modal.Title>Update Outcome</Modal.Title>
 </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit)}>
 <Modal.Body>
    <div size="lg" className="mb-3">
        <label htmlFor="title">Requirement</label>
    <input 
    {
        ...register('requirement',{
         required : "The Requirement is required."
        })
    }
    type='text' className={`form-control ${errors.requirement && 'is-invalid'}`} placeholder='requirement' />
       {
         errors.requirement && <p className='invalid-feedback'>{errors.requirement.message}</p>
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
    </>
  )
}

export default Updaterequirement
