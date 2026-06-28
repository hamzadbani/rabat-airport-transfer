<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class QuoteConfig extends Model
{
    protected $fillable = [
        'name',
        'description',
        'unit_price',
        'currency',
        'vat_rate',
        'eur_to_mad',
        'usd_to_mad',
        'is_active',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'vat_rate' => 'decimal:2',
            'eur_to_mad' => 'decimal:4',
            'usd_to_mad' => 'decimal:4',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
        ];
    }

    public static function default(): ?self
    {
        if (! Schema::hasTable('quote_configs')) {
            return null;
        }

        return static::query()
            ->where('is_default', true)
            ->where('is_active', true)
            ->first()
            ?? static::query()->where('is_active', true)->orderBy('name')->first();
    }

    public function setAsDefault(): void
    {
        static::query()->where('id', '!=', $this->id)->update(['is_default' => false]);
        $this->update(['is_default' => true]);
    }
}
