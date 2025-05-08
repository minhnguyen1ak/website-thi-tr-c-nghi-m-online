<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 255)->unique();
            $table->string('email', 255)->unique();
            $table->string('password', 255); // Độ dài này quá ngắn!
            $table->string('role');
      
            $table->rememberToken();
            $table->timestamps();
        });
    }
   
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('password', 50)->change(); // Khôi phục độ dài cũ nếu cần
        });
    }
};
