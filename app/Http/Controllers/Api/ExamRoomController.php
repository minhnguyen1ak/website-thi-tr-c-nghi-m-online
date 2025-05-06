<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExamRoom;
use Illuminate\Http\Request;

class ExamRoomController extends Controller
{
    // Store Exam Room
    public function store(Request $request)
    {
        $request->validate([
            'room_name' => 'required|string|max:255',
            'exam_id' => 'required|integer|exists:exams,id',
            'created_at' => 'required|date',
        ]);

        $room = ExamRoom::create($request->all());
        return response()->json($room, 201);
    }

    // List Exam Rooms
    public function index()
    {
        return response()->json(ExamRoom::all(), 200);
    }

    // Show Exam Room
    public function show($id)
    {
        $room = ExamRoom::find($id);
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }
        return response()->json($room, 200);
    }

    // Update Exam Room
    public function update(Request $request, $id)
    {
        $room = ExamRoom::find($id);
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->update($request->all());
        return response()->json($room, 200);
    }

    // Delete Exam Room
    public function destroy($id)
    {
        $room = ExamRoom::find($id);
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();
        return response()->json(['message' => 'Room deleted successfully'], 200);
    }
}
