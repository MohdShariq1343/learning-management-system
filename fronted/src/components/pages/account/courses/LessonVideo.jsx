import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { apiUrl, token } from '../../../common/Config'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType)

const LessonVideo = ({lesson}) => {
 const [files, setFiles] = useState([]);
 const [videourl, setVideourl] = useState();

 useEffect(() => {
    if(lesson){
        setVideourl(lesson.video_url)
    }
 },[lesson]);

  return (
   <div className="card">
          <div className="card-body">
           <h5>Lesson Video</h5>
                   <FilePond
                    acceptedFileTypes={['video/mp4']}
                    credits={false} 
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    server={{
                process: {
               url: `${apiUrl}/save-lesson-video/${lesson.id}`,
               method: 'POST',
               headers: {
                   'Authorization': `Bearer ${token}` 
               },
               onload: (response) => {
                   response = JSON.parse(response);
                   toast.success(response.message);
                   setVideourl(response.data.video_url)
                   setFiles([]);
               },
               onerror: (errors) => {
                   console.log(errors)
               },
           },
       }}
       name="video"
       labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
             />
         
          {
            videourl && 
             <ReactPlayer
             width="100%" height="100%"
             controls
             url={videourl}
             />
            }
           
           </div>
      </div>
  )
}

export default LessonVideo
