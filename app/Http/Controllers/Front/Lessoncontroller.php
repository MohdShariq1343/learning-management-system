<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\Chapter;
use Illuminate\Support\Facades\Validator;

class Lessoncontroller extends Controller
{
   public function store(Request $request){
       $validator = Validator::make($request->all(), [
            'chapter' =>  'required',
            'lesson' =>  'required',
       ]);
       if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
            
             $lesson = new Lesson();
             $lesson->chapter_id = $request->chapter;
             $lesson->title = $request->lesson;
             $lesson->status = $request->status;
             $lesson->sort_order = 1000;
             $lesson->save();
             
             return response()->json([
                'status'=> 200,
                'message'=> 'Lesson created Successfully.',
                    'data' => $lesson,
             ],200);
             
    }
    public function show($id){
        $lesson = Lesson::find($id);
          if($lesson == null){
               return response()->json([
                'status' =>  404,
                'message' =>  'Lesson not Found',
               ],404);
         }

         return response()->json([ 
                'status' =>  200,
                'data' =>  $lesson,
               ],200);

      }

      public function update($id, Request $request){
         $lesson = Lesson::find($id);
         if($lesson == null){
            return response()->json([
         'status' =>  404,
         'message' =>  'Lesson not Found',
         ],404);

         }
         $validator = Validator::make($request->json()->all(), [
            'chapter_id' =>  'required',
            'lesson' =>  'required',
            ]);
            if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
            
             $lesson->title = $request->lesson;
             $lesson->chapter_id = $request->chapter_id;
             $lesson->is_free_preview = ($request->free_preview == false) ? 'no' : 'yes';
             $lesson->duration = $request->duration;
             $lesson->description = $request->description;
             $lesson->status = $request->status;
             $lesson->save();
             
             return response()->json([
                'status'=> 200,
                'message'=> 'Lesson Updated Successfully.',
                'data' => $lesson,
             ],200);
             
      }

    
    public function destroy($id){
        $lesson = Lesson::find($id);
         if($lesson == null){
            return response()->json([
         'status' =>  404,
         'message' =>  'Lesson not Found',
         ],404);
         }

         $chapterId = $lesson->chapter_id;

         $lesson->delete();

        $chapter = Chapter::where('id',$chapterId)->with('lessons')->first();
         return response()->json([
         'status' =>  200,
         'message' =>  'Lesson Deleted Successfully',
         'chapter' => $chapter,
         ],200);
        }
         
    public function sort_lessons(Request $request){
        $chapterId = '';
      if(!empty($request->lessons)){
           foreach($request->lessons as $key => $lesson){
            $chapterId = $lesson['chapter_id'];
            Lesson::where('id',$lesson['id'])->update(['sort_order' => $key]);
           }
      }
           
           $chapter = Chapter::where('id',$chapterId)->with('lessons')->first();
       return response()->json([
         'status' =>  200,
         'chapter' => $chapter,
         'message' =>  'Lesson Updated Successfully',
         ],200);
    }


    public function saveVideo($id, Request $request){
         $lesson = Lesson::find($id);
         if($lesson == null){
            return response()->json([
         'status' =>  404,
         'message' =>  'Lesson not Found',
         ],404);
         }
        
        $validator = Validator::make($request->all(), [
            'video' =>  'required|mimes:mp4',
          ]);
           if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors(),
             ],400);
           }
           
            if($lesson->video != ""){
             if(File::exists(public_path('upload/course/videos/'.$lesson->video))){
                    File::delete(public_path('upload/course/videos/'.$lesson->video));
              }
            }
             
             $video = $request->video;
             $safe_ext = $request->file('video')->extension();
            // $ext = $image->getClientOriginalExtension();
             $videoName = strtotime('now').'-lesson'.$id.'.'.$safe_ext;
             $video->move(public_path('upload/course/videos/'),$videoName);
             
             $lesson->video = $videoName;
             $lesson->save();
             
             return response()->json([
                'status'=> 200,
                'message'=> 'Video Uploaded Successfully.',
                'data' => $lesson,
             ],200);
             
      }
           
}
