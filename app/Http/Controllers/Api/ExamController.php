<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExamController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Exam::all(), 200);
        } catch (\Exception $e) {
            Log::error("Error fetching exams: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Kiểm tra đầu vào từ client
            $validated = $request->validate([
                'exam_code' => 'required|string|unique:exams,exam_code', // Mã đề thi, duy nhất
                'exam_name' => 'required|string|max:255', // Tên đề thi
                'duration' => 'required|integer', // Thời gian làm bài
                'question_count' => 'required|integer', // Số lượng câu hỏi
                'total_score' => 'required|integer', // Tổng điểm
                'created_by' => 'required|integer|exists:users,user_id', // ID người tạo, phải tồn tại trong bảng users
            ]);

            // Tạo mới một đề thi   
            $exam = Exam::create([
                'exam_code' => $validated['exam_code'],
                'exam_name' => $validated['exam_name'],
                'duration' => $validated['duration'],
                'question_count' => $validated['question_count'],
                'total_score' => $validated['total_score'],
                'created_by' => $validated['created_by'],
            ]);

            return response()->json(['exam' => $exam], 201);
        } catch (\Exception $e) {
            Log::error("Error creating exam: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function destroy($exam_code) {
        $exam = Exam::where('exam_code', $exam_code)->first();
        if (!$exam) {
          return response()->json(['message' => 'Đề thi không tồn tại'], 404);
        }
        $exam->delete();
        return response()->json(['message' => 'Xóa thành công'], 200);
      }
}