<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'currency',
        'passengers',
        'children_count',
        'baggage',
        'notes',
        'driver_name',
        'driver_id',
        'organization_id',
        'is_archived',
        'trip_mode',
        'source',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'end_at' => 'datetime',
            'price' => 'decimal:2',
            'is_archived' => 'boolean',
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

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function getClientPhoneAttribute(): string
    {
        return $this->attributes['phone'] ?? '';
    }

    public function setClientPhoneAttribute(?string $value): void
    {
        $this->attributes['phone'] = $value ?? '';
    }

    public function getPickupAddressAttribute(): string
    {
        return $this->attributes['pickup_location'] ?? '';
    }

    public function setPickupAddressAttribute(?string $value): void
    {
        $this->attributes['pickup_location'] = $value ?? '';
    }

    public function getDropoffAddressAttribute(): string
    {
        return $this->attributes['dropoff_location'] ?? '';
    }

    public function setDropoffAddressAttribute(?string $value): void
    {
        $this->attributes['dropoff_location'] = $value ?? '';
    }

    public function getTripDateAttribute(): ?string
    {
        return $this->date?->format('Y-m-d');
    }

    public function setTripDateAttribute(?string $value): void
    {
        if ($value === null || $value === '') {
            return;
        }

        $time = $this->trip_time ?? ($this->date?->format('H:i') ?? '00:00');

        $this->attributes['date'] = $value.' '.$time;
    }

    public function getTripTimeAttribute(): ?string
    {
        return $this->date?->format('H:i');
    }

    public function setTripTimeAttribute(?string $value): void
    {
        if ($value === null || $value === '') {
            return;
        }

        $date = $this->trip_date ?? ($this->date?->format('Y-m-d') ?? now()->format('Y-m-d'));

        $this->attributes['date'] = $date.' '.$value;
    }

    public function getChildrenAttribute(): int
    {
        return (int) ($this->attributes['children_count'] ?? 0);
    }

    public function setChildrenAttribute(int|string|null $value): void
    {
        $this->attributes['children_count'] = (int) ($value ?? 0);
    }
}
