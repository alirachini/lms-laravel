<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SectionController extends Controller
{
//    public function getSections()
//    {
//        $sections = Section::all();
//        return view('sections.sections', ['sections' => $sections]);
//    }

//get all sections
    /***
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSections()
    {
        $sections = Section::with("classes")->get();
        return response()->json($sections);
    }

    //fetching section by class
    public function getSectionByClass($id): JsonResponse
    {
        $sections = Section::where('class_id', $id)->get();
        return response()->json($sections);
    }

    public function getSectionsbyclassid($id)
    {
        $sections = Section::where('Class_id', $id)->get();
        return response()->json($sections);
    }

    //delete section by id

    /***
     * @param $id
     * @return JsonResponse
     */
    public function deleteSectionById($id): JsonResponse
    {
        $section = Section::findorFail($id);
        $section->delete();
        return response()->json('Section deleted successfully');
    }


      //Store section with validation
     /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $this->validate($request, [
            'SectionName' => 'required|unique:sections',
        ]);
        $sections = new Section();
        $sections->SectionName = $request->SectionName;
        $sections->class_id = $request->class_id;
        $sections->save();
        return response()->json('Section Added successfully');
    }


    public function update(Request $request, $id)
    {
        $sections = Section::findOrFail($id);
        $newInput = $request->except(['_method', 'token']);
        $sections->SectionName = $request->input("SectionName");
        // $sections->single_class()->associate($request->input("class_id"));
        $sections->save();

        return response()->json([
            "message" => 'Section Updated Successfully'
        ]);
    }


    // get section by id

    /***
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSectionById($id)
    {
        $sections = Section::where('Class_id', $id)->get();
        return response()->json($sections);
    }

    public function countSection(){
        $section = Section::all()->count();
        return response()->json([
          'sections' => $section
        ]);
      }

}