import { useState } from "react";
import { Modal } from "react-bootstrap";
import ReactPlayer from 'react-player'

const FreePreview = ({showFreePreviewModal,handleClose,freeLesson}) => { 

  const [chapterData, setChapterData] = useState([]);
  
  return (
    <Modal size="lg" show={showFreePreviewModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h4 className="fs-5 fw-semibold text-dark">{freeLesson.title}</h4></Modal.Title>
      </Modal.Header>
       
      <Modal.Body className="p-3">
        {
          freeLesson.video_url && 
           <ReactPlayer
           width="100%" height="100%"
           controls
           url={freeLesson.video_url}
           />
          }
      </Modal.Body>
      <Modal.Footer>
      
      </Modal.Footer>
</Modal>
    
  )
}

export default FreePreview