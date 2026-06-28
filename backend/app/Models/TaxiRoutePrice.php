<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaxiRoutePrice extends Model
{
    protected $fillable = [
        'from_zone_id',
        'to_zone_id',
        'vehicle_type',
        'daytime_price',
        'nighttime_price',
        'return_price',
        'vip_price',
        'extra_luggage_price',
        'child_seat_price',
        'currency',
        'estimated_duration_minutes',
        'estimated_distance_km',
        'is_active',
        'manual_override_price',
        'night_starts_hour',
        'night_ends_hour',
    ];

    protected function casts(): array
    {
        return [
            'daytime_price' => 'decimal:2',
            'nighttime_price' => 'decimal:2',
            'return_price' => 'decimal:2',
            'vip_price' => 'decimal:2',
            'extra_luggage_price' => 'decimal:2',
            'child_seat_price' => 'decimal:2',
            'estimated_distance_km' => 'decimal:2',
            'manual_override_price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function fromZone(): BelongsTo
    {
        return $this->belongsTo(TaxiZone::class, 'from_zone_id');
    }

    public function toZone(): BelongsTo
    {
        return $this->belongsTo(TaxiZone::class, 'to_zone_id');
    }
}
