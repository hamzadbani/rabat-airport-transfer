<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('quote_currencies')) {
            return;
        }

        Schema::create('quote_currencies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 8);
            $table->string('label', 80);
            $table->string('symbol', 8);
            $table->decimal('mad_per_unit', 12, 4)->default(1);
            $table->boolean('is_base')->default(false);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique('code');
        });

        DB::table('quote_currencies')->insert([
            [
                'code' => 'MAD',
                'label' => 'Dirham',
                'symbol' => 'MAD',
                'mad_per_unit' => 1,
                'is_base' => true,
                'sort_order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'EUR',
                'label' => 'Euro',
                'symbol' => '€',
                'mad_per_unit' => 10.8500,
                'is_base' => false,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'USD',
                'label' => 'Dollar',
                'symbol' => '$',
                'mad_per_unit' => 9.9500,
                'is_base' => false,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_currencies');
    }
};
