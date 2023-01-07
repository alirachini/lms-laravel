<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attdate;

class AttdateController extends Controller
{
    public function addDate(Request $request){
        $datefromrequest = $request->attendance_date;
        $stringtodate = strtotime($datefromrequest);
        $dateinyears=date('Y-m-d',$stringtodate);
        $founddate = Attdate::where('attendance_date',$dateinyears)->get();
        $data = json_decode($founddate, true);
        if(!empty($data)){
            $result = $founddate;
        }
        else {
        $newdate = new Attdate;
        $newdate->attendance_date=$dateinyears;
        $newdate->save();
        $result = $newdate;
        }
        return response()->json($result);
    }
}
