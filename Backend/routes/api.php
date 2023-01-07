<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\AttdateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminloginController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\AttendanceStudentController;



// Route::group(["middleware" => ["auth:sanctum"]], function() {
//     Route::post('addAdmin', [AuthController::class,'admin']);
    
// });

// Route::post('Admin', [AuthController::class,'getAdmin']);
Route::resource('/admins', AdminController::class);

Route::get('/countAdmin',[AdminController::class,'countAdmin']);
Route::get('/countSection',[SectionController::class,'countSection']);
Route::get('/countStudents',[StudentController::class,'countStudents']);

Route::post('/login', [AdminloginController::class,'index']);

Route::resource('/students', StudentController::class);

// Route::delete('/students/delete/{id}',[StudentController::class,'deleteStudentbyid']);
// Route::put('/students/update/{id}',[StudentController::class,'updateStudent']);
// Route::get('/students/section/{id}',[StudentController::class,'getStudentsBySection']);
// Route::post('/students/add',[StudentController::class,'addStudent']);
// Route::get('/students/class/{id}',[StudentController::class,'getStudentsByClass']);

Route::get('/sections',[SectionController::class,'getSections']);
Route::post('/date/add',[AttdateController::class,'addDate']);
Route::post('/attendance/section',[StudentController::class,'getstudentsattendance']);

// Section Crud Functionality
Route::get('/sections', [SectionController::class, 'getSections']);
Route::get('/sections/{id}', [SectionController::class, 'getSectionById']);
Route::delete('/section/delete/{id}', [SectionController::class, "deleteSectionById"]);
Route::get('/section/class/{id}', [SectionController::class, 'getSectionByClass']);
Route::post('/section/add', [SectionController::class, 'store']);
Route::put('/section/update/{id}', [SectionController::class, 'update']);



Route::put('/classes/update/{id}', [ClassController::class, 'update']);
Route::get('/classes', [ClassController::class, 'getClasses']);
Route::get('/classes/{id}', [ClassController::class, 'getClassbyId']);
Route::delete('/classes/delete/{id}', [ClassController::class, 'delete']);
Route::post('/classes/add', [ClassController::class, 'store']);
Route::get('/countClass', [ClassController::class, 'countClass']);

//for ali rachini
Route::get('/students/section/{id}',[StudentController::class,'getStudentsBySection']);
//for ali rachini
Route::post('/student/update/section/{id}',[StudentController::class,'changeSection']);
//for ali rachini
Route::post('/date/add',[AttdateController::class,'addDate']);
//for ali rachini
Route::post('/add/attendance',[AttendanceStudentController::class,'addattendance']);
//for ali rachini
Route::post('/attendance/update/',[AttendanceStudentController::class,'updateattendance']);
//for ali rachini
Route::get('/statuses',[StatusController::class,'getallStatuses']);
//for ali rachini
Route::get('/sections',[SectionController::class,'getSections']);
//for ali rachini
Route::get('/sections/{id}',[SectionController::class,'getSectionsbyclassid']);
//for ali rachini
Route::get('/classesall',[ClassController::class,'getClassesAndSections']);



