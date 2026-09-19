import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { apiUrl, token } from '../../../common/Config';
import toast from 'react-hot-toast';


const LessonSort = ({showLessonSortModal,handleCloseLessonSortModal,lessonsData,setChapters}) => {
    const [lessons, setLessons]  = useState([]);
    // console.log(lessonData)

    useEffect(()  => {
        if(lessonsData){
            setLessons(lessonsData)
        }
    },[lessonsData]);

const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(lessons);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setLessons(reorderedItems);
    saveOrder(reorderedItems);
}

    const saveOrder = async (updatedlessons) => {
//    console.log(updatedlessons);
   await fetch(`${apiUrl}/sort-lessons`,  {
        method : "POST",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify({lessons:updatedlessons})
       })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status === 200){
                setChapters({type: "UPDATE_CHAPTER", payload: result.chapter})
                 toast.success(result.message);
           
         }else{
             console.log(result)
             
            }
});
}

  return (
    <div>
          <Modal show={showLessonSortModal} onHide={handleCloseLessonSortModal}>
     <Modal.Header closeButton>
      <Modal.Title>Sort Lessons</Modal.Title>
     </Modal.Header>
       
     <Modal.Body>
        <DragDropContext onDragEnd={handleDragEnd} >
    <Droppable droppableId="list">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {
                lessons.map((lesson, index) => (
                        <Draggable key={lesson.id} draggableId={`${lesson.id}`} index={index}>

                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mt-2 border px-3 py-1 bg-white shadow-lg  rounded"
                            >

                               <div className="card-body py-2">
            <div className='d-flex  align-items-center justify-content-between'>
                 <h6 className='mb-0'>{lesson.title}</h6>
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
        
     </Modal.Body>
     <Modal.Footer>
   
    
     </Modal.Footer>
    
    </Modal>
    
        </div>
  )
}

export default LessonSort
