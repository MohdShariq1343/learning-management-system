<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Course;
use App\Models\Level;
use App\Models\Language;

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
              $sortArr = ['ASC','DESC'];
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
}
