<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_name',
        'room_code',
        'exam_code',//doi id thanh code
        'created_at'
       
    ];
    
    public function exam()
    {
        //return $this->belongsTo(Exam::class);
        return $this->belongsTo(Exam::class, 'exam_code', 'exam_code'); // Sử dụng exam_code để liên kết

    }

    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }
}
