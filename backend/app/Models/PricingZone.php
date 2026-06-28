<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingZone extends Model
{
    protected $fillable = [
        'name',
        'city',
        'region',
        'is_airport',
        'radius_km',
        'day_price',
        'night_price',
        'currency',
        'is_active',
        'lat',
        'lng',
    ];

    protected function casts(): array
    {
        return [
            'is_airport' => 'boolean',
            'is_active' => 'boolean',
            'radius_km' => 'decimal:2',
            'day_price' => 'decimal:2',
            'night_price' => 'decimal:2',
            'lat' => 'decimal:7',
            'lng' => 'decimal:7',
        ];
    }
}
