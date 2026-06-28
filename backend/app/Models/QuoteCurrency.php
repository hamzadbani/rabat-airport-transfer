<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class QuoteCurrency extends Model
{
    protected $fillable = [
        'code',
        'label',
        'symbol',
        'mad_per_unit',
        'is_base',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'mad_per_unit' => 'decimal:4',
            'is_base' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /** @return Collection<int, self> */
    public static function ordered(): Collection
    {
        if (! Schema::hasTable('quote_currencies')) {
            return collect();
        }

        return static::query()->orderBy('sort_order')->orderBy('code')->get();
    }

    /** @return list<string> */
    public static function codes(): array
    {
        $codes = static::ordered()->pluck('code')->all();

        return $codes !== [] ? $codes : ['MAD'];
    }

    public static function findByCode(string $code): ?self
    {
        return static::ordered()->firstWhere('code', strtoupper($code));
    }

    public static function convertMad(float $amountMad, string $code): float
    {
        $currency = static::findByCode($code);
        $rate = (float) ($currency?->mad_per_unit ?? 1);

        return $rate > 0 ? $amountMad / $rate : $amountMad;
    }

    public static function symbolFor(string $code): string
    {
        return static::findByCode($code)?->symbol ?? strtoupper($code);
    }

    public static function syncExchangeRates(): void
    {
        if (! Schema::hasTable('quote_currencies')) {
            return;
        }

        $eur = static::query()->where('code', 'EUR')->value('mad_per_unit');
        $usd = static::query()->where('code', 'USD')->value('mad_per_unit');

        if ($eur !== null || $usd !== null) {
            $settings = DispatchSetting::instance();
            $settings->update(array_filter([
                'eur_to_mad' => $eur,
                'usd_to_mad' => $usd,
            ], fn ($value) => $value !== null));
        }

        if (Schema::hasTable('quote_configs')) {
            QuoteConfig::query()->update(array_filter([
                'eur_to_mad' => $eur,
                'usd_to_mad' => $usd,
            ], fn ($value) => $value !== null));
        }
    }
}
