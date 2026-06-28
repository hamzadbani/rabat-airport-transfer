<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DispatchSetting extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'reservation_reminder_minutes',
        'eur_to_mad',
        'usd_to_mad',
    ];

    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'eur_to_mad' => 'decimal:4',
            'usd_to_mad' => 'decimal:4',
        ];
    }

    public static function instance(): self
    {
        return static::query()->firstOrCreate(
            ['id' => 1],
            [
                'reservation_reminder_minutes' => 60,
                'eur_to_mad' => 10.8500,
                'usd_to_mad' => 9.9500,
            ],
        );
    }
}
