<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\ExamRoomController;
use App\Http\Controllers\Api\ExamResultController;
use App\Http\Controllers\Api\QuestionController;

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Exams
Route::post('/exams', [ExamController::class, 'store']);
Route::get('/exams', [ExamController::class, 'index']);

// Exam Rooms
Route::post('/exam-rooms', [ExamRoomController::class, 'store']);
Route::get('/exam-rooms', [ExamRoomController::class, 'index']);

// Questions
Route::post('/questions', [QuestionController::class, 'store']);
Route::get('/questions', [QuestionController::class, 'index']);

// Exam Results
Route::post('/exam-results', [ExamResultController::class, 'store']);
Route::get('/exam-results', [ExamResultController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
