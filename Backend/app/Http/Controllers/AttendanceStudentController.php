<?php

namespace App\Http\Controllers;

use App\Models\Attdate;
use App\Models\Attendance_student;
use Illuminate\Http\Request;

class AttendanceStudentController extends Controller
{ //to add the attendance for today (ali rachini)
    public function addattendance(Request $request)
    {
        $datefromrequest = $request->input('date');
        $stringtodate = strtotime($datefromrequest);
        $dateinyears = date('Y-m-d', $stringtodate);
        $founddate = Attdate::where('attendance_date', $dateinyears)->get('id');
        $date_id = $founddate[0]->id;
        $students = $request->input('students');
        $all_students = [];
        foreach ($students as $student) {
            $student_id = $student['id'];
            $students_in_this_date = Attendance_student::with('status')
                ->where('student_id', $student_id)
                ->where('attdate_id', $date_id)
                ->with('student')
                ->get();
            //
            if (!empty($students_in_this_date[0])) {
                $all_students[] = $students_in_this_date[0];
            } else {
                $attendance = new Attendance_student;
                $attendance->student_id = $student_id;
                $attendance->status_id = 4;
                $attendance->attdate_id = $date_id;
                $attendance->save();
                $att =  Attendance_student::with('status')
                    ->with('student')
                    ->where('student_id', $student_id)
                    ->where('attdate_id', $date_id)
                    ->get();
                $all_students[] = $att[0];
            }
        }
        return response()->json($all_students);
    }
    //this is for update the attendance and the input is attendance = [{"student_id": 3,"status_id": 3,"attdate_id":12}]
    //(ali rachini)
    public function updateattendance(Request $request)
    {
        $attendance = json_decode($request->input('attendance'));
        foreach ($attendance as $att) {
            $atten = $att->student_id;
            $date = $att->attdate_id;
            $status = $att->status_id;
            $update = Attendance_student::where('student_id', $atten)->where('attdate_id', $date)->update(['status_id' => $status]);
            //            $update->status_id = $status;
            //            $update[0]->save();
        }
        return response()->json('updated successfully');
    }
}
