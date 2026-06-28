<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('phone', 64);
            $table->string('pickup_location', 500);
            $table->string('dropoff_location', 500);
            $table->string('flight_number', 32)->default('');
            $table->dateTime('date');
            $table->dateTime('end_at')->nullable();
            $table->enum('status', ['planned', 'confirmed', 'cancelled'])->default('planned');
            $table->decimal('price', 10, 2)->default(0);
            $table->unsignedSmallInteger('passengers')->default(1);
            $table->unsignedSmallInteger('children_count')->default(0);
            $table->string('baggage')->default('');
            $table->string('driver_name')->default('Non assigné');
            $table->foreignId('driver_id')->nullable()->constrained('drivers')->nullOnDelete();
            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->string('type', 32)->default('byAdmin');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
