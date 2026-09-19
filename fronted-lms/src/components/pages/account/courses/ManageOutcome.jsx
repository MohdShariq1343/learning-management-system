import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, token } from '../../../common/Config';
import { MdDragIndicator } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Updateoutcome from './Updateoutcome';

const ManageOutcome = () => {
const params = useParams();
const [loading, setLoading] = useState(false);
const [outcomes, setOutcomes] = useState([]);

const [outcomeData, setOutcomeData] = useState([]);

const [showOutcome, setShowOutcome] = useState(false);
const handleClose = () => {
    setShowOutcome(false);
}
const handleShow = (outcome) => {
   setOutcomeData(outcome);
    setShowOutcome(true);
}

const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

const onSubmit = async (data) => {
    setLoading(true);
    const formData =  {...data, course_id : params.id}
     console.log(formData);
   await fetch(`${apiUrl}/outcomes`,  {
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
                const newoutcomes = [...outcomes, result.data];
                setOutcomes(newoutcomes);
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

const deleteOutcome = async (id) => {
    if(confirm('Are you sure to delete that')){
   await fetch(`${apiUrl}/outcomes/${id}`,  {
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
                const newoutcomes = outcomes.filter(outcome => outcome.id != id);
                setOutcomes(newoutcomes);
            toast.success(result.message);
           
         }else{
                 console.log(result.errors)
            }
        });
    }
}

const fetchOutcomes = async () => {
   
    //  console.log(formData);
   await fetch(`${apiUrl}/outcomes?course_id=${params.id}`,  {
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
                setOutcomes(result.data)
                reset();
            }else{
                toast.success('Something went wrong');
                 console.log('Something went wrong'); 
             }
})
}

const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(outcomes);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setOutcomes(reorderedItems);
    saveOrder(reorderedItems);
};

const saveOrder = async (updatedoutcomes) =>{
//    console.log(updatedoutcomes);
   await fetch(`${apiUrl}/sort-outcomes`,  {
        method : "POST",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify({outcomes:updatedoutcomes})
       })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status == 200){
                // const newoutcomes = [...outcomes, result.data];
                // setOutcomes(newoutcomes);
            toast.success(result.message);
            reset();
         }else{
             console.log(result)
             
            }
})
}


 useEffect( () => {
     fetchOutcomes()
 },[])



  return (
    <>
     <div className="card">
    <div className="card-body">
        <h5>Outcome</h5>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
            <div className="mb-3">
            <input
             {
                ...register("outcome",{
                    required : "Outcome is required."
                })
             }
            type="text"  className={`form-control ${errors.outcome && 'is-invalid'}`} placeholder='Outcome'/>
              {
               errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>
              }

        </div>
        <button className='btn btn-primary px-3 py-2' type='submit' 
            disabled={loading}>
            {loading == false ? 'Add Outcome' : 'Please wait...'}
        </button>
        
        </form>

        <DragDropContext onDragEnd={handleDragEnd} >
    <Droppable droppableId="list">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {
                outcomes.map((outcome, index) => (
                        <Draggable key={outcome.id} draggableId={`${outcome.id}`} index={index}>

                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mt-2 border px-3 py-1 bg-white shadow-lg  rounded"
                            >

                               <div className="card-body py-2">
            <div className='d-flex  align-items-center justify-content-between'>
                <span><MdDragIndicator/></span>
                 <h6 className='mb-0'>{outcome.text}</h6>
                 <div>
                 <Link className='text-primary pe-2'  onClick={()=>handleShow(outcome)}><BsPencilSquare/></Link>
                 <Link className='text-danger' onClick={() => deleteOutcome(outcome.id)}><FaTrashAlt/></Link>
                 </div>
            </div>
        </div>
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
</DragDropContext> 

   
   
    </div>
</div>

<Updateoutcome showOutcome={showOutcome} handleClose={handleClose} outcomes={outcomes} 
  setOutcomes={setOutcomes}  outcomeData={outcomeData}
 />

</>

  )
}

export default ManageOutcome
