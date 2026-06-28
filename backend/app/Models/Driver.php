<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Driver extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'vehicle',
        'rating',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:2',
        ];
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
