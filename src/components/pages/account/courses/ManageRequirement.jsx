import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdDragIndicator } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Updaterequirement from './Updaterequirement';

const ManageRequirement = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [requirementData, setRequirementData] = useState([]);

    const [showrequirements, setShowRequirements] = useState(false);
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

    const [showRequirement, setShowRequirement] = useState(false);
const handleClose = () => {
    setShowRequirement(false);
}
const handleShow = (requirement) => {
   setRequirementData(requirement);
    setShowRequirement(true);
}

const onSubmit = async (data) => {
    setLoading(true);
    const formData =  {...data, course_id : params.id}
    //  console.log(formData);
   await fetch(`${apiUrl}/requirements`,  {
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
                const newrequirements = [...requirements, result.data];
                setRequirements(newrequirements);
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

const fetchRequirement= async () => {
   
    //  console.log(formData);
   await fetch(`${apiUrl}/requirements?course_id=${params.id}`,  {
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
                setRequirements(result.data)
                reset();
            }else{
                toast.success('Something went wrong');
                 console.log('Something went wrong'); 
             }
})
}

const deleteRequirement = async (id) => {
    if(confirm('Are you sure to delete that')){
   await fetch(`${apiUrl}/requirements/${id}`,  {
        method : "DELETE",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
   
       })
        .then(res =>  res.json())
        .then(result =>  {
            setLoading(false);
            if(result.status == 200){
                const newrequirements = requirements.filter(requirement => requirement.id != id);
                setRequirements(newrequirements);
            toast.success(result.message);
           
         }else{
                 console.log(result.errors)
            }
        });
    }
}

 useEffect( () => {
     fetchRequirement()
 },[])

  return (
    <>
      <div className="card mt-4">
    <div className="card-body">
        <h5>Requirement</h5>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
            <div className="mb-3">
            <input
             {
                ...register("requirement",{
                    required : "Requirement is required."
                })
             }
            type="text"  className={`form-control ${errors.requirement && 'is-invalid'}`} placeholder='requirement'/>
              {
               errors.requirement && <p className='invalid-feedback'>{errors.requirement.message}</p>
              }

        </div>
        <button className='btn btn-primary px-3 py-2' type='submit' 
            disabled={loading}>
            {loading == false ? 'Add Requirement' : 'Please wait...'}
        </button>
        
        </form>

        
        {
    requirements && requirements.map(requirement => {
        return(
           <div key={`outcome-${requirement.id}`} className="card mb-1 shadow">
        <div className="card-body p-2">
            <div className='d-flex  align-items-center justify-content-between'>
                <span><MdDragIndicator/></span>
                 <h6 className='mb-0'>{requirement.text}</h6>
                 <div>
                 <Link className='text-primary pe-2'  onClick={()=>handleShow(requirement)}><BsPencilSquare/></Link>
                 <Link className='text-danger' onClick={() => deleteRequirement(requirement.id)}><FaTrashAlt/></Link>
                 </div>
            </div>
        </div>
       </div>
        )
    })
   }
        </div>
        </div>

        <Updaterequirement
           showRequirement={showRequirement}
           requirements={requirements}
           setRequirements={setRequirements}
           requirementData={requirementData}
           handleClose={handleClose}
        />
    </>
  )
}

export default ManageRequirement
