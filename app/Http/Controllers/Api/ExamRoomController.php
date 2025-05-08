<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamRoom;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class ExamRoomController extends Controller
{
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'room_name' => 'required|string',
            'room_code' => 'required|string|unique:exam_rooms,room_code',
            'exam_code' => 'required|string|exists:exams,exam_code',
            'limit' => 'nullable|integer|min:1', // Thêm xác thực cho trường limit
        ]);
    
        if ($validator->fails()) {
            Log::error("Lỗi xác thực khi tạo phòng thi: " . json_encode($validator->errors()));
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        try {
            // Tạo phòng thi mới
            $examRoom = ExamRoom::create([
                'room_name' => $request->room_name,
                'room_code' => $request->room_code,
                'exam_code' => $request->exam_code,
                'limit' => $request->limit ?? 50, // Nếu không có limit, sẽ gán giá trị mặc định 50
            ]);
    
            Log::info("Đã tạo phòng thi: " . json_encode($examRoom));
            return response()->json($examRoom, 201);
        } catch (\Exception $e) {
            Log::error("Lỗi khi lưu phòng thi: " . $e->getMessage());
            return response()->json(['error' => 'Lỗi khi lưu phòng thi: ' . $e->getMessage()], 500);
        }
    }
    


    public function index()
    {
        try {
            $examRooms = ExamRoom::all();
            return response()->json($examRooms, 200);
        } catch (\Exception $e) {
            Log::error("Lỗi khi lấy danh sách phòng thi: " . $e->getMessage());
            return response()->json(['error' => 'Lỗi khi lấy danh sách phòng thi'], 500);
        }
    }
    public function destroy($room_code)
{
    try {
        $examRoom = ExamRoom::where('room_code', $room_code)->firstOrFail();
        $examRoom->delete();
        return response()->json(['message' => 'Phòng thi đã được xóa'], 200);
    } catch (\Exception $e) {
        Log::error("Lỗi khi xóa phòng thi: " . $e->getMessage());
        return response()->json(['error' => 'Lỗi khi xóa phòng thi'], 500); 
    }
}
}