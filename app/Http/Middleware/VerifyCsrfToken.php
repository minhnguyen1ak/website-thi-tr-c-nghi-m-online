<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/questions/batch', // Thêm dòng này
        'api/register', // Loại trừ route /api/register 
        'api/login', 
        'api/exams', 
        '/api/exams/*', 
        'api/exam-rooms'
        
    ];
}
