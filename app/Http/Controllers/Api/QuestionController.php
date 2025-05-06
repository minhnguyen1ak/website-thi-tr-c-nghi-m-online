<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    // Store Question
    public function store(Request $request)
    {
        $request->validate([
            'exam_id' => 'required|integer|exists:exams,id',
            'question_text' => 'required|string|max:255',
            'option_a' => 'required|string|max:255',
            'option_b' => 'required|string|max:255',
            'option_c' => 'required|string|max:255',
            'option_d' => 'required|string|max:255',
            'correct_answer' => 'required|string|in:A,B,C,D',
        ]);

        $question = Question::create($request->all());
        return response()->json($question, 201);
    }

    // List Questions
    public function index()
    {
        return response()->json(Question::all(), 200);
    }

    // Show Question
    public function show($id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        return response()->json($question, 200);
    }

    // Update Question
    public function update(Request $request, $id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        $question->update($request->all());
        return response()->json($question, 200);
    }

    // Delete Question
    public function destroy($id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        $question->delete();
        return response()->json(['message' => 'Question deleted successfully'], 200);
    }
}
