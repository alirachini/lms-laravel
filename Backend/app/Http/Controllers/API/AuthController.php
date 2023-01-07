<?php

namespace App\Http\Controllers\API;

use App\Models\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Admin(Request $request){
        $validator= Validator::make($request->all(),[
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8',
            'is_Active' => '',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' =>$validator->messages(),
            ]);
        }
        else 
        {
            $user = Admin::create([
                'name' => $request ->name,
                'email' => $request ->email,
                'password' =>Hash::make($request->password),
                'is_Active' => $request ->is_Active,
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            
            return response() -> json([
                'status' =>200,
                'username' =>$user->name,
                'token' =>$token,
                'message' =>'Added Successfully',
            ]);
        }
    }

    public function getAdmin()
    {
        $getadmin = Admin::all();
        return response()->json($getadmin);
    }

    // public function Login(Request $request){
    //     $validator = Validator::make($request->all(),[
    //         'email' => 'required|max:191',
    //         'password' => 'required',
    //     ]);

    //     if($validator->fails()){
    //         return response()->json([
    //             'validation_errors' =>$validator->messages(),
    //         ]);
    //     }
    //     else{
    //         $user= Admin::where('email',$request->email)->first();

    //         if(! $user || !Hash::check($request->password, $user->password)){
    //             return response()->json([
    //                 'status' => 401,
    //                 'message' => 'Invalid Credentials',
    //             ]);
    //         }
    //         else{
    //             $token = $user ->createToken($user->email.'_Token')->plainTextToken;

    //             return response()->json([
    //                 'status' => 200,
    //                 'username' => $user->name,
    //                 'token' =>$token,
    //                 'message' => 'Logged In Successfully',
    //             ]);
    //         }
    //     }
    // }
}