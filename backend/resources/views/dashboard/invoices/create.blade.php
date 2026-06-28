@php
    use Illuminate\Support\Carbon;

    $weekStart = Carbon::now()->locale(app()->getLocale())->startOfWeek();
    $weekEnd = Carbon::now()->locale(app()->getLocale())->endOfWeek();
    $invoiceConfig = config('invoice');
    $initialType = old('type', $type);
    $initialIssuedAt = old('issued_at', now()->format('Y-m-d'));
    $initialTripDate = old('trip_date', $reservation?->trip_date ?? now()->format('Y-m-d'));
    $initialTripTime = old('trip_time', $reservation?->trip_time ?? now()->format('H:i'));
    $initialDescription = old('description', $quoteConfig?->description ?? $invoiceConfig['default_description']);
    $initialVatRate = old('vat_rate', $quoteConfig?->vat_rate ?? $invoiceConfig['default_vat_rate']);
    $initialUnitPrice = old('unit_price', $reservation?->price ?? $quoteConfig?->unit_price ?? 0);
    $initialDisplayCurrency = old('currency', 'MAD');
    $clientAddressLine2 = old('client_address_line2', '');
    $currencyOptions = $currencies ?? [['code' => 'MAD', 'label' => 'Dirham', 'symbol' => 'MAD', 'mad_per_unit' => 1]];
@endphp

<x-layouts.dashboard
    :title="__('dashboard.pages.invoices.title')"
    :subtitle="__('dashboard.pages.invoices.subtitle')"
    :show-week-range="true"
    :week-start="$weekStart"
    :week-end="$weekEnd"
>
    @push('head')
        <link href="https://fonts.bunny.net/css?family=libre-baskerville:700" rel="stylesheet">
    @endpush

    <div
        class="invoice-workspace"
        x-data="{
            type: @js($initialType),
            documentNumber: @js($documentNumber),
            issuedAt: @js($initialIssuedAt),
            clientName: @js(old('client_name', $reservation?->client_name ?? '')),
            clientAddressLine2: @js($clientAddressLine2),
            clientIce: @js(old('client_ice', '')),
            clientEmail: @js(old('client_email', '')),
            clientPhone: @js(old('client_phone', $reservation?->client_phone ?? '')),
            pickup: @js(old('pickup', $reservation?->pickup_address ?? '')),
            dropoff: @js(old('dropoff', $reservation?->dropoff_address ?? '')),
            tripDate: @js($initialTripDate),
            tripTime: @js($initialTripTime),
            passengers: {{ (int) old('passengers', $reservation?->passengers ?? 1) }},
            children: {{ (int) old('children', $reservation?->children ?? 0) }},
            baggage: @js(old('baggage', $reservation?->baggage ?? '')),
            description: @js($initialDescription),
            quantity: {{ (int) old('quantity', 1) }},
            unitPrice: {{ (float) $initialUnitPrice }},
            vatRate: {{ (float) $initialVatRate }},
            currencies: @js($currencyOptions),
            displayCurrency: @js($initialDisplayCurrency),
            get activeCurrency() {
                return this.currencies.find((currency) => currency.code === this.displayCurrency)
                    ?? this.currencies[0]
                    ?? { code: 'MAD', label: 'Dirham', symbol: 'MAD', mad_per_unit: 1 };
            },
            get madPerUnit() {
                return Number(this.activeCurrency.mad_per_unit || 1);
            },
            get displaySymbol() {
                return this.activeCurrency.symbol || this.displayCurrency;
            },
            convertMad(amount) {
                return Number(amount || 0) / this.madPerUnit;
            },
            get displaySubtotal() { return this.convertMad(this.subtotal); },
            get displayVat() { return this.convertMad(this.vat); },
            get displayTotal() { return this.convertMad(this.total); },
            get docTitle() {
                return this.type === 'quote'
                    ? @js(__('dashboard.invoices.quote_heading'))
                    : @js(__('dashboard.invoices.invoice_heading'));
            },
            get subtotal() { return this.quantity * this.unitPrice; },
            get vat() { return this.subtotal * (this.vatRate / 100); },
            get total() { return this.subtotal + this.vat; },
            formatMoney(value) {
                return Number(value || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            },
            formatIssuedAt() {
                if (!this.issuedAt) return '—';
                const [y, m, d] = this.issuedAt.split('-');
                return `${d}/${m}/${y}`;
            },
            formatTripDate() {
                if (!this.tripDate) return '—';
                const [y, m, d] = this.tripDate.split('-');
                return `${d}/${m}/${y}`;
            },
            formatTripTime() {
                if (!this.tripTime) return '—';
                return this.tripTime.replace(':', 'h');
            },
        }"
    >
        <div class="invoice-toolbar">
            <div class="invoice-type-toggle" role="group" aria-label="{{ __('dashboard.invoices.type_toggle') }}">
                <button
                    type="button"
                    class="invoice-type-toggle__btn"
                    :class="type === 'invoice' ? 'invoice-type-toggle__btn--active' : ''"
                    @click="type = 'invoice'"
                >{{ __('dashboard.invoices.invoice') }}</button>
                <button
                    type="button"
                    class="invoice-type-toggle__btn"
                    :class="type === 'quote' ? 'invoice-type-toggle__btn--active' : ''"
                    @click="type = 'quote'"
                >{{ __('dashboard.invoices.quote') }}</button>
            </div>

            <div class="invoice-toolbar__actions">
                <a href="{{ route('dashboard.index') }}" class="invoice-btn-secondary">{{ __('dashboard.invoices.back_home') }}</a>
                <button type="submit" form="invoice-form" class="invoice-btn-primary">{{ __('dashboard.invoices.print_pdf') }}</button>
            </div>
        </div>

        <div class="invoice-layout">
            <aside class="invoice-form-panel">
                <form id="invoice-form" method="POST" action="{{ route('dashboard.invoices.store') }}" class="invoice-form">
                    @csrf
                    <input type="hidden" name="type" :value="type">
                    <input type="hidden" name="reservation_id" value="{{ old('reservation_id', $reservation?->id) }}">

                    <div class="invoice-form__section">
                        <h3 class="invoice-form__heading">{{ __('dashboard.invoices.document_section') }}</h3>
                        <div class="invoice-form__field">
                            <label>{{ __('dashboard.invoices.number') }}</label>
                            <input type="text" class="invoice-form__input invoice-form__input--readonly" x-model="documentNumber" readonly>
                        </div>
                        <div class="invoice-form__field">
                            <label for="issued_at">{{ __('dashboard.invoices.issued_at') }}</label>
                            <input type="date" id="issued_at" name="issued_at" class="invoice-form__input" x-model="issuedAt" required>
                        </div>
                    </div>

                    <div class="invoice-form__section">
                        <h3 class="invoice-form__heading">{{ __('dashboard.invoices.client_section') }}</h3>
                        <div class="invoice-form__field">
                            <label for="client_name">{{ __('dashboard.invoices.client_name') }}</label>
                            <input type="text" id="client_name" name="client_name" class="invoice-form__input" x-model="clientName" required>
                        </div>
                        <div class="invoice-form__field">
                            <label for="client_address_line2">{{ __('dashboard.invoices.client_line2') }}</label>
                            <input type="text" id="client_address_line2" name="client_address_line2" class="invoice-form__input" x-model="clientAddressLine2">
                        </div>
                        <div class="invoice-form__field">
                            <label for="client_ice">{{ __('dashboard.invoices.client_ice') }}</label>
                            <input type="text" id="client_ice" name="client_ice" class="invoice-form__input" x-model="clientIce">
                        </div>
                        <div class="invoice-form__field">
                            <label for="client_email">{{ __('dashboard.invoices.client_email') }}</label>
                            <input type="email" id="client_email" name="client_email" class="invoice-form__input" x-model="clientEmail">
                        </div>
                        <div class="invoice-form__field">
                            <label for="client_phone">{{ __('dashboard.invoices.client_phone') }}</label>
                            <input type="text" id="client_phone" name="client_phone" class="invoice-form__input" x-model="clientPhone">
                        </div>
                    </div>

                    <div class="invoice-form__section">
                        <h3 class="invoice-form__heading">{{ __('dashboard.invoices.trip_section') }}</h3>
                        <div class="invoice-form__field">
                            <label for="pickup">{{ __('dashboard.invoices.pickup') }}</label>
                            <input type="text" id="pickup" name="pickup" class="invoice-form__input" x-model="pickup">
                        </div>
                        <div class="invoice-form__field">
                            <label for="dropoff">{{ __('dashboard.invoices.dropoff') }}</label>
                            <input type="text" id="dropoff" name="dropoff" class="invoice-form__input" x-model="dropoff">
                        </div>
                        <div class="invoice-form__grid">
                            <div class="invoice-form__field">
                                <label for="trip_date">{{ __('dashboard.invoices.trip_date') }}</label>
                                <input type="date" id="trip_date" name="trip_date" class="invoice-form__input" x-model="tripDate">
                            </div>
                            <div class="invoice-form__field">
                                <label for="trip_time">{{ __('dashboard.invoices.trip_time') }}</label>
                                <input type="time" id="trip_time" name="trip_time" class="invoice-form__input" x-model="tripTime">
                            </div>
                        </div>
                        <div class="invoice-form__grid invoice-form__grid--3">
                            <div class="invoice-form__field">
                                <label for="passengers">{{ __('dashboard.invoices.passengers') }}</label>
                                <input type="number" id="passengers" name="passengers" min="1" class="invoice-form__input" x-model.number="passengers">
                            </div>
                            <div class="invoice-form__field">
                                <label for="children">{{ __('dashboard.invoices.children') }}</label>
                                <input type="number" id="children" name="children" min="0" class="invoice-form__input" x-model.number="children">
                            </div>
                            <div class="invoice-form__field">
                                <label for="baggage">{{ __('dashboard.invoices.baggage') }}</label>
                                <input type="text" id="baggage" name="baggage" class="invoice-form__input" x-model="baggage">
                            </div>
                        </div>
                    </div>

                    <div class="invoice-form__section">
                        <h3 class="invoice-form__heading">{{ __('dashboard.invoices.service_section') }}</h3>
                        <div class="invoice-form__field">
                            <label for="description">{{ __('dashboard.invoices.description') }}</label>
                            <textarea id="description" name="description" rows="3" class="invoice-form__input" x-model="description"></textarea>
                        </div>
                        <div class="invoice-form__grid invoice-form__grid--3">
                            <div class="invoice-form__field">
                                <label for="quantity">{{ __('dashboard.invoices.quantity') }}</label>
                                <input type="number" id="quantity" name="quantity" min="1" class="invoice-form__input" x-model.number="quantity" required>
                            </div>
                            <div class="invoice-form__field">
                                <label for="unit_price">{{ __('dashboard.invoices.unit_price_mad') }}</label>
                                <input type="number" id="unit_price" name="unit_price" step="0.01" min="0" class="invoice-form__input" x-model.number="unitPrice" required>
                            </div>
                            <div class="invoice-form__field">
                                <label for="vat_rate">{{ __('dashboard.invoices.vat_rate') }}</label>
                                <input type="number" id="vat_rate" name="vat_rate" step="0.01" min="0" max="100" class="invoice-form__input" x-model.number="vatRate" required>
                            </div>
                        </div>
                        <div class="invoice-form__field">
                            <label for="display_currency_form">{{ __('dashboard.invoices.display_currency') }}</label>
                            <select id="display_currency_form" class="invoice-form__input" x-model="displayCurrency">
                                @foreach ($currencyOptions as $currency)
                                    <option value="{{ $currency['code'] }}">{{ $currency['code'] }} — {{ $currency['label'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <input type="hidden" name="currency" :value="displayCurrency">
                        <p class="invoice-form__hint">{{ __('dashboard.invoices.amounts_in_mad') }}</p>
                    </div>

                    @if ($errors->any())
                        <ul class="invoice-form__errors">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    @endif
                </form>
            </aside>

            <div class="invoice-preview-panel">
                <x-dashboard.invoice-document :live="true" :currencies="$currencyOptions" />
            </div>
        </div>
    </div>
</x-layouts.dashboard>
