<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('quote_configs')) {
            return;
        }

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

        if (class_exists(\App\Models\QuoteConfig::class)) {
            $config = \App\Models\QuoteConfig::query()->create([
                'name' => 'Transfert aéroport standard',
                'description' => config('invoice.default_description', 'Service de transport touristique'),
                'unit_price' => 350,
                'currency' => 'MAD',
                'vat_rate' => config('invoice.default_vat_rate', 10),
                'eur_to_mad' => 10.8500,
                'usd_to_mad' => 9.9500,
                'is_active' => true,
                'is_default' => true,
            ]);

            $config->setAsDefault();
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_configs');
    }
};
