<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $appends = ['course_small_image'];
	 function  getCoursesmallImageAttribute(){
		 if($this->image == ""){
			 return "";
		 }
		 return asset('upload/course/small/'.$this->image);
		 
	}
	public function chapters(){
		return  $this->hasMany(Chapter::class);
	}

	

}