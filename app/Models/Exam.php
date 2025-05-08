<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $primaryKey = 'exam_id'; // Chỉ định exam_id là khóa chính
    protected $fillable = [
        'exam_code',
        'exam_name',
        'duration',
        'question_count',
        'total_score',
        'created_by'
    ];

    public function examRooms()
    {
        return $this->hasMany(ExamRoom::class); 
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
