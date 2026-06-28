<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dispatch_settings', function (Blueprint $table) {
            $table->unsignedTinyInteger('id')->primary()->default(1);
            $table->unsignedInteger('reservation_reminder_minutes')->default(60);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispatch_settings');
    }
};
