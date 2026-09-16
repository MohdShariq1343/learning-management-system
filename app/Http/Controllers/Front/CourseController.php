<?php
namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Category;
use App\Models\Level;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CourseController extends Controller
{
	  public function index(){
	  
	  }
	public function store(Request $request){
	   $validator = Validator::make($request->all(), [
	        'title' =>  'required|min:5',
	   ]);
	   if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
		    
			 $course = new Course();
			 $course->title = $request->title;
			 $course->status = 0;
			 $course->user_id = Auth::user()->id;
			 $course->save();
			 
			 return response()->json([
                'status'=> 200,
                'message'=> 'Success! Course has been created  Successfully.',
				'data' => $course,
             ],200);
			 
	  }

	  public function update($id, Request $request){
         $course = Course::find($id);
	  	 if($course == null){
	  	 	return response()->json([
         'status' =>  404,
         'message' =>  'Course not Found',
	  	 ],404);

	  	 }
	

	    $validator = Validator::make($request->json()->all(), [
	        'title' =>  'required|min:5',
	        'category' =>  'required',
	        'level' =>  'required',
	        'language' =>  'required',
	        'sell_price'  =>  'required',
	   ]);
	   if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors(),
				'data' => $course
             ],400);
           }
		     
			 $course->title = $request->title;
			 $course->category_id = $request->category;
			 $course->level_id = $request->level;
			 $course->language_id = $request->language;
			 $course->price = $request->sell_price;
			 $course->cross_price = $request->cross_price;
			 $course->description = $request->description;
			  $course->status = 0;
			  $course->user_id = Auth::user()->id;
			 $course->save();
			 
			 return response()->json([
                'status'=> 200,
                'message'=> 'Course has been Updated Successfully.',
				'data' => $course,
             ],200);
			 
	  }
	

	  public function show($id){
	  	 $course = Course::with(['chapters','chapters.lessons'])->find($id);
	  	 if($course == null){
	  	 	return response()->json([
         'status' =>  404,
         'message' =>  'Course not Found',
	  	 ],404);

	  	 }

	  	 return response()->json([
         'status' =>  200,
         'data' =>  $course,
	  	 ],200);
	  }
	  
	  // Return Level,  categories, Languages
	  public function meta_data(){
		  $categories = Category::all();
		  $levels = Level::all();
		  $languages = Language::all();
		  
		  return response()->json([
                'status'=> 200,
                 'categories' => $categories,
                 'levels' => $levels,
                 'languages' => $languages,
             ],200);
			 
	  }		 

 	   public function saveCourseImage($id, Request $request){
         $course = Course::find($id);
	  	 if($course == null){
	  	 	return response()->json([
         'status' =>  404,
         'message' =>  'Course not Found',
	  	 ],404);
	  	 }
		
	    $validator = Validator::make($request->all(), [
	        'image' =>  'required|mimes:png,jpg,jpeg',
	   ]);
	   if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors(),
             ],400);
           }
		   
		    if($course->image != ""){
			 if(File::exists(public_path('upload/course/'.$course->image))){
				    File::delete(public_path('upload/course/'.$course->image));
			 }
			  if(File::exists(public_path('upload/course/small/'.$course->image))){
				    File::delete(public_path('upload/course/small/'.$course->image));
			 }
		 }
		     
			 $image = $request->image;
			  $safe_ext = $request->file('image')->extension();
			// $ext = $image->getClientOriginalExtension();
			 $imageName = strtotime('now').'-'.$id.'.'.$safe_ext;
			 $image->move(public_path('upload/course'),$imageName);
			 
			 //create small image thumbnail
			 $manager = new ImageManager (Driver::class);
               $img = $manager->read(public_path('upload/course/'.$imageName));
          // crop the best fitting 5:3 (600x360) ratio and resize to 600x360 pixel
               $img->cover(750, 450);
			   $img->save(public_path('upload/course/small/'.$imageName));
			 
			 $course->image = $imageName;
			 $course->save();
			 
			 return response()->json([
                'status'=> 200,
                'message'=> 'Image Updated Successfully.',
				'data' => $course,
             ],200);
			 
	  }

	  public function change_status($id, Request $request){
          $course = Course::find($id);

	  	     if($course == null){
			  	 	return response()->json([
		         'status' =>  404,
		         'message' =>  'Course not Found',
			  	 ],404);
	  	 }
       
       $course->status = $request->status;
       $course->save();

       $message = ($course->status == 1) ? "Course Published Successfully." : "Course Unpublished Successfully.";

       return response()->json([
             'status'=> 200,
             'message'=> $message,
             'course' => $course,
             ],200);

	  }
   
}


