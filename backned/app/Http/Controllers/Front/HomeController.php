<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Course;
use App\Models\Level;
use App\Models\Language;
use App\Models\Enrollment;

class HomeController extends Controller
{
    public function fetchCategories(){
        $categories = Category::orderBy('name', 'ASC')->where('status',1)->get();

        return response()->json([
          'status' =>  200,
           'data'  => $categories,
        ],200);
    }
    public function fetchLevels(){
        $levels = Level::orderBy('created_at', 'ASC')->where('status',1)->get();

        return response()->json([
          'status' =>  200,
           'data'  => $levels,
        ],200);
    }
    public function fetchLanguage(){
        $languages = Language::orderBy('name', 'ASC')->where('status',1)->get();

        return response()->json([
          'status' =>  200,
           'data'  => $languages,
        ],200);
    }


    public function fetchFeaturedCourses(){
        $courses = Course::orderBy('title', 'ASC')
         ->with('level')
        ->where('is_featured','yes')->where('status',1)
        ->get();

        return response()->json([
          'status' =>  200,
           'data'  => $courses,
        ],200);
    }

    
    public function courses(Request $request){
        $courses = Course::where('status',1)->with('level');

         //Filter course by keyword
          if(!empty($request->keyword)){
             $courses = $courses->where('title','like','%'.$request->keyword.'%');
            }

            //Filter course by Category
           if(!empty($request->category)){
             //caregory_id comes 1,2,3..
             $categoryArr = explode(',',$request->category);
             if(!empty($categoryArr)){
                 $courses = $courses->whereIn('category_id',$categoryArr);
               }
            }

             //Filter course by level
           if(!empty($request->level)){
             //level_id comes 1,2,3..
             $levelArr = explode(',',$request->level);
             if(!empty($levelArr)){
                 $courses = $courses->whereIn('level_id',$levelArr);
                }
            }

            //Filter course by language
           if(!empty($request->language)){
             //language_id comes 1,2,3..
             $languageArr = explode(',',$request->language);
              if(!empty($languageArr)){
                 $courses = $courses->whereIn('language_id',$languageArr);
                  }
           }  

            //Filter course by sort
           if(!empty($request->sort)){
             //sort comes asc or desc
              $sortArr = ['asc','desc'];
               if(!in_array($request->sort,$sortArr)){
                 $courses = $courses->orderBy('created_at',$request->sort);
                }else{
                   $courses = $courses->orderBy('created_at','DESC');
                }
           }  
       
        $courses = $courses->get();

        return response()->json([
          'status' =>  200,
           'data'  => $courses,
        ],200);
    }


    public function course($id){
        $course = Course::where('id',$id)
        ->withCount('chapters')
          ->with(['category',
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
                $q->whereNotNull('video');
            },
            'outcomes',
            'requirements'])
          ->first();

        if($course == null){
            return response()->json([
              'status' =>  404,
              'message'  => 'Course Not Found',
           ],404);
        }

        $totalDuration = $course->chapters->sum('lessons_sum_duration');
        $totallessons = $course->chapters->sum('lessons_count');

        $course->total_duration =  $totalDuration;
        $course->total_lessons =  $totallessons;
       
          return response()->json([
              'status' =>  200,
              'data'  => $course,
           ],200);

    }

    public function enroll(Request $request)  {
        $course = Course::find($request->course_id);

        if($course == null){
                return response()->json([
                 'status' =>  404,
                 'message' =>  'Course not Found',
                 ],404);
            }

         $count =   Enrollment::where(['user_id'=>$request->user()->id,
                'course_id' => $request->course_id])->count();

            if($count > 0){
                 return response()->json([
                 'status' =>  409,
                 'message' =>  'You Alredy Enrolled',
                 ],409);
            }

            $enrollment = new Enrollment(); 
             $enrollment->user_id = $request->user()->id;
             $enrollment->course_id = $request->course_id;
             $enrollment->save();
                
                return response()->json([
                 'status' =>  200,
                 'message' =>  'You have Successfully enrollment.',
                 ],200);
               

            }

        

    }


