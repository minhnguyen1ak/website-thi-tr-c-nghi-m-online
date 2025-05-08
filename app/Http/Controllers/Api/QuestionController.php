<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Exam; // Thêm model Exam
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'exam_code' => 'required|exists:exams,exam_code',  // Xác thực exam_code có tồn tại trong bảng exams
            'question_text' => 'required|string',
            'options' => 'required|array',
            'options.a' => 'required|string',
            'options.b' => 'required|string',
            'options.c' => 'required|string',
            'options.d' => 'required|string',
            'correct_answer' => 'required|in:a,b,c,d',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            // Tìm exam bằng exam_code thay vì exam_id
            $exam = Exam::where('exam_code', $request->exam_code)->first();

            if (!$exam) {
                return response()->json(['error' => 'Đề thi không tồn tại!'], 404);
            }

            // Tạo câu hỏi mới và gắn exam_id
            $question = Question::create([
                'exam_id' => $exam->id,  // Lưu exam_id sau khi tìm được exam
                'question_text' => $request->question_text,
                'options' => json_encode($request->options),  // Chuyển mảng options thành JSON
                'correct_answer' => $request->correct_answer,
            ]);

            return response()->json($question, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi khi lưu câu hỏi: ' . $e->getMessage()], 500);
        }
    }

    public function storeBatch(Request $request)
{
    $questions = $request->all();

    if (!is_array($questions) || empty($questions)) {
        return response()->json(['error' => 'Dữ liệu gửi lên không hợp lệ hoặc trống.'], 400);
    }

    $errors = [];
    $createdQuestions = [];

    foreach ($questions as $index => $q) {
        $validator = Validator::make($q, [
            'exam_code' => 'required|exists:exams,exam_code',
            'question_text' => 'required|string',
            'options' => 'required|array',
            'options.a' => 'required|string',
            'options.b' => 'required|string',
            'options.c' => 'required|string',
            'options.d' => 'required|string',
            'correct_answer' => 'required|in:a,b,c,d',
        ]);

        if ($validator->fails()) {
            $errors[$index] = $validator->errors();
            continue;
        }

        $exam = Exam::where('exam_code', $q['exam_code'])->first();

        if (!$exam) {
            $errors[$index] = ['exam_code' => ['Đề thi không tồn tại']];
            continue;
        }

        try {
            $created = Question::create([
                'exam_id' => $exam->id,
                'exam_code' => $exam->exam_code, // Gán thêm dòng này nếu giữ cột
                'question_text' => $q['question_text'],
                'options' => $q['options'], // đảm bảo đã dùng $casts trong model
                'correct_answer' => $q['correct_answer'],
            ]);
            $createdQuestions[] = $created;
        } catch (\Exception $e) {
            $errors[$index] = ['exception' => [$e->getMessage()]];
        }
    }

    if (!empty($errors)) {
        return response()->json([
            'message' => 'Một số câu hỏi không được lưu thành công.',
            'created' => $createdQuestions,
            'errors' => $errors
        ], 207); // 207: Multi-Status
    }

    return response()->json([
        'message' => 'Tất cả câu hỏi đã được lưu thành công.',
        'exam_id' => $exam->id,
        'exam_code' => $exam->exam_code,
        'created' => $createdQuestions
    ], 201);
}



public function storeMultiple(Request $request)
{
    $questions = $request->all();
    $created = [];
    $errors = [];

    foreach ($questions as $index => $data) {
        $validator = Validator::make($data, [
            'exam_code' => 'required|exists:exams,exam_code',
            'question_text' => 'required|string',
            'options' => 'required|array',
            'options.a' => 'required|string',
            'options.b' => 'required|string',
            'options.c' => 'required|string',
            'options.d' => 'required|string',
            'correct_answer' => 'required|in:a,b,c,d',
        ]);

        if ($validator->fails()) {
            $errors[$index] = $validator->errors();
            continue;
        }

        try {
            $exam = Exam::where('exam_code', $data['exam_code'])->first();
            $question = Question::create([
                'exam_id' => $exam->id,
                'question_text' => $data['question_text'],
                'options' => json_encode($data['options']),
                'correct_answer' => $data['correct_answer'],
            ]);
            $created[] = $question;
        } catch (\Exception $e) {
            $errors[$index] = ['error' => $e->getMessage()];
        }
    }

    if (count($errors) > 0) {
        return response()->json([
            'created' => $created,
            'errors' => $errors,
        ], count($created) > 0 ? 207 : 400); // 207 = multi-status
    }

    return response()->json(['created' => $created], 201);
}

}
