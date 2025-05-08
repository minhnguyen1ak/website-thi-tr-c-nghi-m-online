<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    // Khai báo rõ tên bảng
    protected $table = 'users';

    // Khai báo khóa chính
    protected $primaryKey = 'user_id';

    // Các cột có thể điền
    protected $fillable = [
        'username',
        'email',
        'password',
        'role'
    ];

    // Ẩn cột password trong phản hồi JSON
    protected $hidden = [
        'password',
    ];
}