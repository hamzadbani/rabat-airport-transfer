<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quote_configs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->enum('currency', ['MAD', 'EUR', 'USD'])->default('MAD');
            $table->decimal('vat_rate', 5, 2)->default(10);
            $table->decimal('eur_to_mad', 10, 4)->default(10.8500);
            $table->decimal('usd_to_mad', 10, 4)->default(9.9500);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_configs');
    }
};
