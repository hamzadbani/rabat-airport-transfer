<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement(
            "ALTER TABLE reservations MODIFY COLUMN source ENUM('website', 'google_ads', 'phone', 'whatsapp', 'admin') NOT NULL DEFAULT 'website'"
        );
    }

    public function down(): void
    {
        DB::statement(
            "ALTER TABLE reservations MODIFY COLUMN source ENUM('website', 'google_ads', 'phone', 'whatsapp') NOT NULL DEFAULT 'website'"
        );
    }
};
