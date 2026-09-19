<?php
namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class AccountController extends Controller
{
    public function register(Request $request) : JsonResponse {
           $validator = Validator::make($request->all(),[
            'name' => 'required|min:5',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
           ]);

           if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }

           $user = new User();
           $user->name = $request->name;
           $user->email = $request->email;
           $user->password = Hash::make($request->password);
           $user->save();
           
           return response()->json([
                'status'=> 200,
                'message'=> 'Success! User Registered  Successfully.',
             ],200);
    }

    public function authenticate(Request $request)  {
	   $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|min:6',
           ]);

           if($validator->fails()){
             return response()->json([
                'status'=> 400,
                'errors'=> $validator->errors()
             ],400);
           }
                  
    if (Auth::attempt(['email'=>$request->email, 'password'  => $request->password])){
		 $user  = User::find(Auth::user()->id);
		 $token = $user->createToken('token')->plainTextToken;
		 
		  return response()->json([
                'status'=> 200,
                'token'=> $token,
				'name'=>  $user->name,
				'id'=>  Auth::user()->id,
             ],400);

    }else{
             return response()->json([
                'status'=> 401,
				'message' =>  'Either Email or Password Incorrect',
             ],401);
           
	}
}

    public function courses(Request $request){
        $courses = Course::where('user_id',$request->user()->id)->with('level')->get();

        return response()->json([
                'status'=> 200,
                'courses'=> $courses,
             ],200);
    }

    public function enrollments(Request $request){
            $enrollments = Enrollment::where('user_id',$request->user()->id)
            ->with('course','course.level')->get();
             
             return response()->json([
                 'status' =>  200,
                 'data' => $enrollments,
                 ],200);

     }

    public function enroll_course_detail(Request $request, $id){
        $count = Enrollment::where(['user_id'=> auth()->user()->id, 'course_id' =>  $id])->count();
        
        if($count == 0){
             return response()->json([
             'status' =>  404,
             'messgae' => 'you can not access this course',
             ],404);
        }

         $course = Course::where('id',$id)
          ->withCount('chapters')
          ->with([
            'category',
            'level',
            'language',
            'chapters' => function($query){
                 $query->withCount(['lessons' =>  function($q){
                    $q->where('status',1);
                    $q->whereNotNull('video');
                }]);

                 $query->withSum(['lessons' => function($q){
                    $q->where('status',1);
                    $q->whereNotNull('video');
                  }],'duration');
                },

            'chapters.lessons' => function($q){
                $q->where('status',1);
                $q->orWhereNotNull('video');
            }
        ])->first();

       
          return response()->json([
              'status' =>  200,
              'data'  => $course,
           ],200);
         

    }

}
