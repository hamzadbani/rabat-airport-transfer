<?php

namespace App\Livewire\Dashboard;

use App\Models\QuoteConfig;
use App\Models\QuoteCurrency;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Livewire\Component;

class QuoteCurrenciesManager extends Component
{
    use AuthorizesRequests;

    /** @var array<int, array{id: int|null, code: string, label: string, symbol: string, mad_per_unit: string, is_base: bool}> */
    public array $currencies = [];

    public function mount(): void
    {
        $this->loadCurrencies();
    }

    public function updatedCurrencies(mixed $value, string $key): void
    {
        if (str_ends_with($key, '.code') && is_string($value)) {
            [$index] = explode('.', $key);
            $this->currencies[(int) $index]['code'] = strtoupper($value);
        }
    }

    public function addCurrency(): void
    {
        $this->authorize('create', QuoteConfig::class);

        $this->currencies[] = [
            'id' => null,
            'code' => '',
            'label' => '',
            'symbol' => '',
            'mad_per_unit' => '1',
            'is_base' => false,
        ];
    }

    public function removeCurrency(int $index): void
    {
        $this->authorize('create', QuoteConfig::class);

        if (($this->currencies[$index]['is_base'] ?? false) === true) {
            return;
        }

        unset($this->currencies[$index]);
        $this->currencies = array_values($this->currencies);
    }

    public function save(): void
    {
        $this->authorize('create', QuoteConfig::class);

        $validated = $this->validate([
            'currencies' => ['required', 'array', 'min:1'],
            'currencies.*.id' => ['nullable', 'integer'],
            'currencies.*.code' => ['required', 'string', 'max:8', 'regex:/^[A-Z0-9]+$/'],
            'currencies.*.label' => ['required', 'string', 'max:80'],
            'currencies.*.symbol' => ['required', 'string', 'max:8'],
            'currencies.*.mad_per_unit' => ['required', 'numeric', 'min:0.0001'],
            'currencies.*.is_base' => ['boolean'],
        ], [], [
            'currencies.*.code' => __('dashboard.config.currency_code'),
            'currencies.*.label' => __('dashboard.config.currency_label'),
            'currencies.*.symbol' => __('dashboard.config.currency_symbol'),
            'currencies.*.mad_per_unit' => __('dashboard.config.mad_per_unit'),
        ]);

        $codes = collect($validated['currencies'])->pluck('code');
        if ($codes->duplicates()->isNotEmpty()) {
            $this->addError('currencies', __('dashboard.config.duplicate_code'));

            return;
        }

        $baseCount = collect($validated['currencies'])->where('is_base', true)->count();
        if ($baseCount !== 1) {
            $this->addError('currencies', __('dashboard.config.base_required'));

            return;
        }

        DB::transaction(function () use ($validated) {
            $keptIds = [];

            foreach ($validated['currencies'] as $index => $row) {
                $payload = [
                    'code' => strtoupper($row['code']),
                    'label' => $row['label'],
                    'symbol' => $row['symbol'],
                    'mad_per_unit' => $row['is_base'] ? 1 : $row['mad_per_unit'],
                    'is_base' => (bool) $row['is_base'],
                    'sort_order' => $index,
                ];

                if (! empty($row['id'])) {
                    $currency = QuoteCurrency::query()->findOrFail($row['id']);
                    $currency->update($payload);
                    $keptIds[] = $currency->id;
                } else {
                    $currency = QuoteCurrency::query()->create($payload);
                    $keptIds[] = $currency->id;
                }
            }

            QuoteCurrency::query()->whereNotIn('id', $keptIds)->delete();
            QuoteCurrency::syncExchangeRates();
        });

        $this->loadCurrencies();
        session()->flash('success', __('dashboard.config.currencies_saved'));
    }

    public function render(): View
    {
        return view('livewire.dashboard.quote-currencies-manager');
    }

    private function loadCurrencies(): void
    {
        $rows = QuoteCurrency::ordered();

        if ($rows->isEmpty()) {
            $this->currencies = [[
                'id' => null,
                'code' => 'MAD',
                'label' => 'Dirham',
                'symbol' => 'MAD',
                'mad_per_unit' => '1',
                'is_base' => true,
            ]];

            return;
        }

        $this->currencies = $rows->map(fn (QuoteCurrency $currency) => [
            'id' => $currency->id,
            'code' => $currency->code,
            'label' => $currency->label,
            'symbol' => $currency->symbol,
            'mad_per_unit' => (string) $currency->mad_per_unit,
            'is_base' => (bool) $currency->is_base,
        ])->all();
    }
}
