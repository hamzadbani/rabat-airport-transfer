<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaxiZone extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'city',
        'region',
        'is_airport',
        'latitude',
        'longitude',
        'radius_km',
        'is_active',
        'seo_name',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_airport' => 'boolean',
            'is_active' => 'boolean',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'radius_km' => 'decimal:2',
        ];
    }

    public function routePricesFrom(): HasMany
    {
        return $this->hasMany(TaxiRoutePrice::class, 'from_zone_id');
    }

    public function routePricesTo(): HasMany
    {
        return $this->hasMany(TaxiRoutePrice::class, 'to_zone_id');
    }
}
