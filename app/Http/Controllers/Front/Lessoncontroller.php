<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lesson;
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
             if($chapter == null){
               return response()->json([
                'status' =>  404,
                'message' =>  'Lesson not Found',
               ],404);
         }

         return response()->json([
                'status' =>  200,
                'lesson' =>  $lesson,
               ],200);

      }

      public function update($id, Request $request){
         $lesson = Lesson::find($id);
         if($chapter == null){
            return response()->json([
         'status' =>  404,
         'message' =>  'Lesson not Found',
         ],404);

         }
         $validator = Validator::make($request->json()->all(), [
            'chapter' =>  'required',
            'lesson' =>  'required',
            ]);
            if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
            
             $lesson->title = $request->lesson;
             $lesson->chapter_id = $request->chapter;
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

       $lesson->delete();
         return response()->json([
         'status' =>  200,
         'message' =>  'Lesson Deleted Successfully',
         ],200);
        }
         
    public function sort_order(Request $request){
      if(!empty($request->chapters)){
           foreach($request->chapters as $key => $chapter){
            Chapter::where('id',$chapter['id'])->update(['sort_order' => $key]);
           }
      }
           
       return response()->json([
         'status' =>  200,
         'message' =>  'Chapter Updated Successfully',
         ],200);
         }
           
}
