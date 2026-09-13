<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Front\AccountController;
use App\Http\Controllers\Front\CourseController;
use App\Http\Controllers\Front\OutcomeController;
use App\Http\Controllers\Front\RequirementController;
use App\Http\Controllers\Front\ChapterController;


Route::post('/register', [AccountController::class, 'register']);
Route::post('/login', [AccountController::class, 'authenticate']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=> ['auth:sanctum']], function(){
   Route::get('/courses', [CourseController::class, 'index']);	
   Route::post('/courses', [CourseController::class, 'store']);
   
   Route::get('/courses/meta-data', [CourseController::class, 'meta_data']);
   Route::get('/courses/{id}', [CourseController::class, 'show']);
   Route::put('/courses/{id}', [CourseController::class, 'update']);
   Route::post('/save-course-image/{id}', [CourseController::class, 'saveCourseImage']);
   
   //outcome
   Route::get('/outcomes', [OutcomeController::class, 'index']);
   Route::post('/outcomes', [OutcomeController::class, 'store']);
   Route::put('/outcomes/{id}', [OutcomeController::class, 'update']);
   Route::delete('/outcomes/{id}', [OutcomeController::class, 'destroy']);
   Route::post('/sort-outcomes', [OutcomeController::class, 'sort_order']);
   
   //requirement
   Route::get('/requirements', [RequirementController::class, 'index']);
   Route::post('/requirements', [RequirementController::class, 'store']);
   Route::put('/requirements/{id}', [RequirementController::class, 'update']);
   Route::delete('/requirements/{id}', [RequirementController::class, 'destroy']);
    Route::post('/sort-requirements', [RequirementController::class, 'sort_order']);

    //chapter
   Route::get('/chapters', [ChapterController::class, 'index']);
   Route::post('/chapters', [ChapterController::class, 'store']);
   Route::put('/chapters/{id}', [ChapterController::class, 'update']);
   Route::delete('/chapters/{id}', [ChapterController::class, 'destroy']);
   Route::post('/sort-chapters', [ChapterController::class, 'sort_order']);
});
