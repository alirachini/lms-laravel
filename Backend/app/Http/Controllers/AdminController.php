<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class AdminController extends Controller
{
    public function index()
    {
        $admins = DB::table('admins')
            ->orderBy('isActive', 'desc')->get();
            return ['admins'=>$admins];
      
    }

    public function store(Request $request)
    {
        $Admin = new Admin();
        if ($request->picture) {
            $getPicture = $request->picture;
            $pictureName = $getPicture->getClientOriginalName();
            $picturePath = public_path() . '/pictures';
            $getPicture->move($picturePath, $pictureName);
            $Admin->picture = $pictureName;
        }
        $username = $request->input('username');
        $password = $request->input('password');
        $email = $request->input('email');
        $isActive = $request->input('isActive');
        $slug = $request->input('slug');
        $Admin->username = $username;
        $Admin->password = $password;
        $Admin->email = $email;
        $Admin->isActive = $isActive;
        $Admin->slug = $slug;
        $Admin->save();

        return response()->json([
            "Admin was created Successfully!"
        ]);
    }

    public function show($id)
    {
        $Admin = admin::where('id', $id)->with("admin")->get();
        return response()->json([
            $Admin

        ]);
    }

    public function update(Request $request, $id)
    {
        $Admin = admin::findOrFail($id);

        if ($request->picture) {
            $picturePath = public_path() . '/pictures/';
            //code for remove old file
            if ($Admin->picture = null && $Admin->picture = "") {
                $file_old = $picturePath . $Admin->picture;
                unlink($file_old);
            }
            //upload new file
            $file = $request->picture;
            $filename = $file->getClientOriginalName();
            $file->move($picturePath, $filename);
            //for update in table
            $Admin->picture = $filename;
        }

        $inputsAdmin = $request->except(['_method', 'token', 'picture']);
        $Admin->update($inputsAdmin);
        return response()->json([
            "Admin updated Successfully!"
        ]);
    }

    public function countAdmin(){
        $admins = Admin::all()->count();
        return response()->json([
          'admins' => $admins
        ]);
      }

    // public function destroy($id)
    // {
    //     $Admin = admin::where('id', $id);
    //     $Admin->delete();
    //     return response()->json([
    //         "Admin has been deleted Successfully!"
    //     ]);
    // }


  
}
