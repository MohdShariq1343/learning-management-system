<?php
namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequirementController extends Controller
{
	  public function index(Request $request){
	      $requirement = Requirement::where('course_id', $request->course_id)->orderBy('sort_order')->get();
		  return response()->json([
		    'status' => 200,
			'data' =>  $requirement
		  ],200);
	  }
	  
	public function store(Request $request){
	   $validator = Validator::make($request->all(), [
	        'requirement' =>  'required',
	        'course_id' =>  'required',
	   ]);
	   if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
		    
			 $requirement = new Requirement();
			 $requirement->course_id = $request->course_id;
			 $requirement->text = $request->requirement;
			 $requirement->sort_order = 1000;
			 $requirement->save();
			 
			 return response()->json([
                'status'=> 200,
                'message'=> 'Requirement has been created  Successfully.',
				'data' => $requirement,
             ],200);
			 
	  }

	  public function update($id, Request $request){
         $requirement = Requirement::find($id);
		 if($requirement == null){
	  	 	return response()->json([
         'status' =>  404,
         'message' =>  'Requirement not Found',
	  	 ],404);

	  	 }
		 $validator = Validator::make($request->all(), [
	        'requirement' =>  'required',
	   ]);
	   if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
		    
			 $requirement->text = $request->requirement;
			 $requirement->save();
			 
			 return response()->json([
                'status'=> 200,
                'message'=> 'Requirement has been Updated  Successfully.',
				'data' => $requirement,
             ],200);
			 
	  }

	
	  public function destroy($id){
		    $requirement = Requirement::find($id);
		 if($requirement == null){
	  	 	return response()->json([
         'status' =>  404,
         'message' =>  'Requirement not Found',
	  	 ],404);
		 }

       $requirement->delete();
	   return response()->json([
         'status' =>  200,
         'message' =>  'Requirement Deleted Successfully',
	  	 ],200);
	  	 }
		 
		 public function sort_order(Request $request){
			  if(!empty($request->requirements)){
				   foreach($request->requirements as $key => $requirement){
					    Requirement::where('id',$requirement['id'])->update(['sort_order' => $key]);
				   }
			  }
		   
	   return response()->json([
         'status' =>  200,
         'message' =>  'Requirement Updated Successfully',
	  	 ],200);
	  	 }
		   
}


