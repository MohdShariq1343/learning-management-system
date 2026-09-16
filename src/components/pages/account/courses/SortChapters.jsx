import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { apiUrl, token } from '../../../common/Config';

const SortChapters = ({showChapterSortModal, handleCloseChapterSortModal, course, setChapters}) => {
 const [chatersData, setChatersData]  = useState([]);
    // console.log(lessonData)

    useEffect(()  => {
        if(course){
            setChatersData(course.chapters)
        }
    },[course]);

const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(chatersData);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setChatersData(reorderedItems);
    saveOrder(reorderedItems);
}

    const saveOrder = async (updatedchapters) => {
//    console.log(updatedlessons);
   await fetch(`${apiUrl}/sort-chapters`,  {
        method : "POST",
        headers : {
        "Content-type" :  "application/json",
        "Accept" :  "application/json",
        "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify({chapters:updatedchapters})
       })
        .then(res =>  res.json())
        .then(result =>  {
            if(result.status === 200){
                setChapters({type: "SET_CHAPTERS", payload: result.chapters})
                 toast.success(result.message);
           
         }else{
             console.log(result)
             
            }
});
}

  return (
    <div>
     <Modal show={showChapterSortModal} onHide={handleCloseChapterSortModal}>
     <Modal.Header closeButton>
      <Modal.Title>Sort Chapters</Modal.Title>
     </Modal.Header>
       
     <Modal.Body>
        <DragDropContext onDragEnd={handleDragEnd} >
    <Droppable droppableId="list">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {
                chatersData.map((chapter, index) => (
                        <Draggable key={chapter.id} draggableId={`${chapter.id}`} index={index}>

                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mt-2 border px-3 py-1 bg-white shadow-lg  rounded"
                            >

                               <div className="card-body py-2">
            <div className='d-flex  align-items-center justify-content-between'>
                 <h6 className='mb-0'>{chapter.title}</h6>
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

export default SortChapters
