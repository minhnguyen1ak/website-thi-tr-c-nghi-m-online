<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_name',
        'exam_id',
        'created_at'
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }
}
