<?php

namespace App\Http\Controllers;
use App\Models\Status;

use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function getallStatuses(){
        $statuses = Status::all();
        return response()->json($statuses);
    }
}