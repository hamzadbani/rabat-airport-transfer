<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('currency', ['MAD', 'EUR', 'USD'])->default('MAD')->after('price');
            $table->text('notes')->nullable()->after('baggage');
            $table->boolean('is_archived')->default(false)->after('organization_id');
            $table->enum('trip_mode', ['one_way', 'round_trip'])->default('one_way')->after('is_archived');
            $table->enum('source', ['website', 'google_ads', 'phone', 'whatsapp'])->default('website')->after('trip_mode');
        });

        Schema::table('drivers', function (Blueprint $table) {
            $table->string('photo_path')->nullable()->after('notes');
        });

        Schema::table('dispatch_settings', function (Blueprint $table) {
            $table->decimal('eur_to_mad', 10, 4)->default(10.8500)->after('reservation_reminder_minutes');
            $table->decimal('usd_to_mad', 10, 4)->default(9.9500)->after('eur_to_mad');
        });

        Schema::create('pricing_zones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('region')->default('');
            $table->boolean('is_airport')->default(false);
            $table->decimal('radius_km', 8, 2)->default(0);
            $table->decimal('day_price', 10, 2)->default(0);
            $table->decimal('night_price', 10, 2)->default(0);
            $table->enum('currency', ['MAD', 'EUR', 'USD'])->default('MAD');
            $table->boolean('is_active')->default(true);
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->timestamps();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['invoice', 'quote']);
            $table->string('document_number')->unique();
            $table->foreignId('reservation_id')->nullable()->constrained('reservations')->nullOnDelete();
            $table->string('client_name');
            $table->string('client_email')->default('');
            $table->string('client_phone', 64)->default('');
            $table->string('client_address', 500)->default('');
            $table->string('client_ice', 64)->default('');
            $table->date('trip_date')->nullable();
            $table->time('trip_time')->nullable();
            $table->string('pickup', 500)->default('');
            $table->string('dropoff', 500)->default('');
            $table->unsignedSmallInteger('passengers')->default(1);
            $table->unsignedSmallInteger('children')->default(0);
            $table->string('baggage')->default('');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('quantity')->default(1);
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->decimal('vat_rate', 5, 2)->default(20);
            $table->enum('currency', ['MAD', 'EUR', 'USD'])->default('MAD');
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('pricing_zones');

        Schema::table('dispatch_settings', function (Blueprint $table) {
            $table->dropColumn(['eur_to_mad', 'usd_to_mad']);
        });

        Schema::table('drivers', function (Blueprint $table) {
            $table->dropColumn('photo_path');
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn(['currency', 'notes', 'is_archived', 'trip_mode', 'source']);
        });
    }
};
