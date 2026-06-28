<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('taxi_route_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_zone_id')->constrained('taxi_zones')->cascadeOnDelete();
            $table->foreignId('to_zone_id')->constrained('taxi_zones')->cascadeOnDelete();
            $table->string('vehicle_type', 64)->default('standard');
            $table->decimal('daytime_price', 10, 2)->default(0);
            $table->decimal('nighttime_price', 10, 2)->default(0);
            $table->decimal('return_price', 10, 2)->default(0);
            $table->decimal('vip_price', 10, 2)->default(0);
            $table->decimal('extra_luggage_price', 10, 2)->default(0);
            $table->decimal('child_seat_price', 10, 2)->default(0);
            $table->char('currency', 3)->default('MAD');
            $table->unsignedSmallInteger('estimated_duration_minutes')->nullable();
            $table->decimal('estimated_distance_km', 8, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->decimal('manual_override_price', 10, 2)->nullable();
            $table->unsignedTinyInteger('night_starts_hour')->default(22);
            $table->unsignedTinyInteger('night_ends_hour')->default(6);
            $table->timestamps();

            $table->unique(['from_zone_id', 'to_zone_id', 'vehicle_type'], 'route_vehicle_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('taxi_route_prices');
    }
};
