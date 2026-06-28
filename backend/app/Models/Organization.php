<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    protected $fillable = ['name', 'notes', 'phone'];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public static function default(): self
    {
        return static::query()->firstOrCreate(
            ['name' => config('site.default_organization_name', config('site.name'))],
            [
                'notes' => 'Organisation interne par défaut',
                'phone' => config('site.phone_display'),
            ],
        );
    }
}
