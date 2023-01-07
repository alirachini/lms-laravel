<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminloginController extends Controller
{
    public function index(Request $request)
    {
    $token = Str::random(60);
        $username = $request->input('username');
        $password = $request->input('password');
        $allAdmins = DB::table('admins')
            ->where("admins.password", $password)
            ->where("admins.username", $username)
            ->get();

        return ['status' => $allAdmins, 'token' => $token];
    }


        // $token = Str::random(60);
        // $username = $request->input('username');
        // $password = $request->input('password');

        // $admins = Admin::all();
        // // return response()->json($admins);
        
        // return ['status' => $admins, 'token' => $token];

    
       
 
        // $admins = DB::table('admins')->where('username',$username)->first();
        // if($password, $user->password))
        // {
        //     echo "Not Matched";
        // }
        // else
        // {
        //     //$user = DB::table('users')->where('email',$email)->first();
        //    echo $user->email;
        // }
    
     
    }
