<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExamController extends Controller
{
    public function store(Request $request)
{
    try {
        // Kiểm tra đầu vào từ client
        $validated = $request->validate([
            'examName' => 'required|string|max:255',
            'duration' => 'required|integer',
            'questionCount' => 'required|integer',
            'totalScore' => 'required|integer',
        ]);

        // Tạo mới một đề thi
        $exam = Exam::create([
            'examName' => $validated['examName'],
            'duration' => $validated['duration'],
            'questionCount' => $validated['questionCount'],
            'totalScore' => $validated['totalScore'],
        ]);

        return response()->json(['exam' => $exam], 201);
    } catch (\Exception $e) {
        // Log lỗi và trả về lỗi 500
        Log::error("Error creating exam: " . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}


}
