<?php

namespace App\Http\Controllers;
use App\Models\Section;
use App\Models\Classes;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Attendance_student;
use App\Models\Attdate;

class StudentController extends Controller
{
//get the students by class_id and section_id
    public function getStudentsByClass($class_id)
    {
        $class = Classes::findOrFail($class_id);
        $sections = $class->sections;
        foreach ($sections as $section) {
            $students = $section->student;
        }
        // 2nd way $students = Student::wherehas('section', function($query) use ($class_id) { $query->where('Class_id', $class_id); })->get();
        return response()->json($students);
    }
    
    //count number of students
    public function countStudents(){
        $students = Student::all()->count();
        return response()->json([
          'students' => $students
        ]);
      }


      public function index()
    {
        $students = DB::table('students')
            ->orderBy('isActive', 'desc')->get();
            return ['students'=>$students];
      
    }

    public function store(Request $request)
    {
        $Student = new Student();
        if ($request->picture) {
            $getPicture = $request->picture;
            $pictureName = $getPicture->getClientOriginalName();
            $picturePath = public_path() . '/pictures';
            $getPicture->move($picturePath, $pictureName);
            $Student->picture = $pictureName;
        }
        $fname = $request->input('fname');
        $lname = $request->input('lname');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $dob = $request->input('dob');
        $isActive = $request->input('isActive');
        $slug = $request->input('slug');
        $Student->fname = $fname;
        $Student->lname = $lname;
        $Student->email = $email;
        $Student->phone = $phone;
        $Student->dob = $dob;
        $Student->isActive = $isActive;
        $Student->slug = $slug;
        $Student->save();

        return response()->json([
            "Student was created Successfully!"
        ]);
    }

    public function show($id)
    {
        $Student = Student::where('id', $id)->with("student")->get();
        return response()->json([
            $Student

        ]);
    }

    public function update(Request $request, $id)
    {
        $Student = Student::findOrFail($id);

        if ($request->picture) {
            $picturePath = public_path() . '/pictures/';
            //code for remove old file
            if ($Student->picture = null && $Student->picture = "") {
                $file_old = $picturePath . $Student->picture;
                unlink($file_old);
            }
            //upload new file
            $file = $request->picture;
            $filename = $file->getClientOriginalName();
            $file->move($picturePath, $filename);
            //for update in table
            $Student->picture = $filename;
        }

        $inputsStudent = $request->except(['_method', 'token', 'picture']);
        $Student->update($inputsStudent);
        return response()->json([
            "Student updated Successfully!"
        ]);
    }

    public function getstudentsattendance (Request $request){
        $section_id =json_decode($request->section);
        $array_of_students = json_decode(Student::where('section_id',$section_id)->get('id'));
        $array_of_dates=$request->dates;
        $attendance=[];
        foreach($array_of_dates as $date) {
            $present = 0;
            $late=0;
            $absent=0;
            $not_available=0;
            $att=[];
            foreach ($array_of_students as $student) {
                $student_id = $student->id;
                $present += Attendance_student::where('attdate_id', $date)
                    ->where('student_id', $student_id)
                    ->where('status_id', 1)->count();
                $late += Attendance_student::where('attdate_id', $date)
                    ->where('student_id', $student_id)
                    ->where('status_id', 2)->count();
                $absent = Attendance_student::where('attdate_id', $date)
                    ->where('student_id', $student_id)
                    ->where('status_id', 3)->count();
                $not_available += Attendance_student::where('attdate_id', $date)
                    ->where('student_id', $student_id)
                    ->where('status_id', 4)->count();
            }
            $date_id= Attdate::where('id',$date)->get('attendance_date');
            $attendance[] = ['present'=>$present, 'late'=>$late, 'absent'=>$absent, 'not_available'=>$not_available,'date'=>$date_id[0]->attendance_date];
        }
        return response()->json($attendance);
    }

    public function getStudentsBySection($id){
        $student = Student::where('Section_id',$id)->get();
        return response()->json($student);
    }

    public function changeSection(Request $request,$student){
        Student::where('id',$student)->update([
            'section_id'=>$request->input('section_id')
        ]);
        return response()->json('Section Updated Successfully');
    }


}
