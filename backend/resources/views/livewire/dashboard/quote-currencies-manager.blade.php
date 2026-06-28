<div>
    <div class="config-devis-card dashboard-panel">
        <div class="config-devis-card__intro">
            <p>{{ __('dashboard.config.currencies_intro_1') }}</p>
            <p>{{ __('dashboard.config.currencies_intro_2') }}</p>
        </div>

        <div class="config-devis-table-wrap">
            <table class="config-devis-table">
                <thead>
                    <tr>
                        <th>{{ __('dashboard.config.currency_code') }}</th>
                        <th>{{ __('dashboard.config.currency_label') }}</th>
                        <th>{{ __('dashboard.config.currency_symbol') }}</th>
                        <th>{{ __('dashboard.config.mad_per_unit') }}</th>
                        <th class="config-devis-table__actions" aria-hidden="true"></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($currencies as $index => $currency)
                        <tr wire:key="quote-currency-{{ $currency['id'] ?? 'new-'.$index }}">
                            <td>
                                <input
                                    type="text"
                                    wire:model="currencies.{{ $index }}.code"
                                    class="config-devis-input"
                                    maxlength="8"
                                    @disabled($currency['is_base'])
                                    @if (! $currency['is_base']) style="text-transform: uppercase" @endif
                                >
                                @error('currencies.'.$index.'.code')
                                    <p class="config-devis-error">{{ $message }}</p>
                                @enderror
                            </td>
                            <td>
                                <input
                                    type="text"
                                    wire:model="currencies.{{ $index }}.label"
                                    class="config-devis-input"
                                >
                                @error('currencies.'.$index.'.label')
                                    <p class="config-devis-error">{{ $message }}</p>
                                @enderror
                            </td>
                            <td>
                                <input
                                    type="text"
                                    wire:model="currencies.{{ $index }}.symbol"
                                    class="config-devis-input"
                                    maxlength="8"
                                >
                                @error('currencies.'.$index.'.symbol')
                                    <p class="config-devis-error">{{ $message }}</p>
                                @enderror
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.0001"
                                    min="0.0001"
                                    wire:model="currencies.{{ $index }}.mad_per_unit"
                                    class="config-devis-input"
                                    @disabled($currency['is_base'])
                                >
                                @error('currencies.'.$index.'.mad_per_unit')
                                    <p class="config-devis-error">{{ $message }}</p>
                                @enderror
                            </td>
                            <td class="config-devis-table__actions">
                                @unless ($currency['is_base'])
                                    <button
                                        type="button"
                                        wire:click="removeCurrency({{ $index }})"
                                        class="config-devis-remove"
                                        title="{{ __('dashboard.common.delete') }}"
                                    >
                                        ×
                                    </button>
                                @endunless
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        @error('currencies')
            <p class="config-devis-error config-devis-error--block">{{ $message }}</p>
        @enderror

        <div class="config-devis-actions">
            <button type="button" wire:click="addCurrency" class="config-devis-add">
                <span aria-hidden="true">+</span>
                {{ __('dashboard.config.add_currency') }}
            </button>
            <button type="button" wire:click="save" class="config-devis-save">
                {{ __('dashboard.config.save_currencies') }}
            </button>
        </div>
    </div>
</div>
