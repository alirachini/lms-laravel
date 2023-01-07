<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classes;
use Illuminate\Support\Facades\DB;

class ClassController extends Controller
{


    public function getClasses()
    {
        $classes = Classes::all();
        return response()->json($classes);
    }


    public function getClassbyId($id)
    {
        $classes = Classes::find($id);
        return response()->json($classes);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    //  store section with validation

    //store ClassName with validation function
    public function store(Request $request)
    {
        $this->validate($request, [
            'ClassName' => 'required|unique:classes',
        ]);
        $classes = new Classes();
        $classes->ClassName = $request->ClassName;
        $classes->save();
        return response()->json($classes);
    }


    //delete function and reset auto increment
    public function delete($id)
    {
        $classes = Classes::findOrFail($id);
        $classes->delete();
//        DB::statement('ALTER TABLE classes AUTO_INCREMENT = 1');
        return response()->json($classes);
    }

    //update function
    public function update(Request $request, $id)
    {
        $classes = Classes::findOrFail($id);
        $classes->update($request->all());
        return response()->json([
            'Class Updated Successfully'
        ]);
    }

    public function getClassesAndSections(){
        $classes = Classes::with('sections')->get();
        return response()->json($classes);
}

    public function countClass(){
      $classes = Classes::all()->count();
      return response()->json([
        'classes' => $classes
      ]);
    }

 
}