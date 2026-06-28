<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $fillable = [
        'client_name',
        'phone',
        'pickup_location',
        'dropoff_location',
        'flight_number',
        'date',
        'end_at',
        'status',
        'price',
        'passengers',
        'children_count',
        'baggage',
        'driver_name',
        'driver_id',
        'organization_id',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'end_at' => 'datetime',
            'price' => 'decimal:2',
        ];
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
