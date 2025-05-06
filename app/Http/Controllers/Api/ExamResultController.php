<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExamResult;
use Illuminate\Http\Request;

class ExamResultController extends Controller
{
    // Store Exam Result
    public function store(Request $request)
    {
        $request->validate([
            'exam_id' => 'required|integer|exists:exams,id',
            'user_id' => 'required|integer|exists:users,id',
            'room_id' => 'required|integer|exists:exam_rooms,id',
            'student_name' => 'required|string|max:255',
            'score' => 'required|integer',
        ]);

        $result = ExamResult::create($request->all());
        return response()->json($result, 201);
    }

    // List Exam Results
    public function index()
    {
        return response()->json(ExamResult::all(), 200);
    }

    // Get Exam Results by User
    public function getResultsByUser($user_id)
    {
        $results = ExamResult::where('user_id', $user_id)->get();
        return response()->json($results, 200);
    }
}
