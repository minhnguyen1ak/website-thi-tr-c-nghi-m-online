<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public $timestamps = false; // <- Thêm dòng này nếu bạn KHÔNG dùng created_at, updated_at
    
    protected $fillable = [
        'exam_id',
        'exam_code', // Thêm dòng này
        'question_text',
        'options',
        'correct_answer'
    ];
    protected $casts = [
        'options' => 'array' // Tự động parse cột options từ JSON thành array
    ];
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
