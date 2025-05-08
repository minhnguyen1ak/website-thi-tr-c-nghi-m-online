<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamRoomsTable extends Migration
{
    public function up()
    {
        Schema::create('exam_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_name');
            $table->string('room_code')->unique();
            $table->string('exam_code');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exam_rooms');
    }
}