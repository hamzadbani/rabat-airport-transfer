@props([
    'invoice' => null,
    'live' => false,
    'currencies' => [],
])

@php
    use App\Models\QuoteCurrency;

    $company = config('invoice');
    $site = config('site');
    $logo = $site['logo'] ?? '/favicon.png';
    $currencyOptions = $currencies !== [] ? $currencies : [
        ['code' => 'MAD', 'label' => 'Dirham', 'symbol' => 'MAD', 'mad_per_unit' => 1],
    ];

    if ($invoice) {
        $docType = $invoice->type;
        $documentNumber = $invoice->document_number;
        $issuedAt = $invoice->issued_at;
        $clientName = $invoice->client_name;
        $clientEmail = $invoice->client_email;
        $clientPhone = $invoice->client_phone;
        $clientIce = $invoice->client_ice;
        $clientAddress = $invoice->client_address;
        $tripDate = $invoice->trip_date;
        $tripTime = $invoice->trip_time;
        $description = $invoice->description ?: $company['default_description'];
        $quantity = $invoice->quantity;
        $unitPrice = (float) $invoice->unit_price;
        $vatRate = (float) $invoice->vat_rate;
        $displayCurrency = $invoice->currency;
        $displaySymbol = QuoteCurrency::symbolFor($displayCurrency);
        $subtotalMad = $invoice->subtotal();
        $vatAmountMad = $invoice->vatAmount();
        $totalMad = $invoice->total();
        $subtotal = QuoteCurrency::convertMad($subtotalMad, $displayCurrency);
        $vatAmount = QuoteCurrency::convertMad($vatAmountMad, $displayCurrency);
        $total = QuoteCurrency::convertMad($totalMad, $displayCurrency);
    }
@endphp

<article class="invoice-doc" @if ($live) aria-live="polite" @endif>
    <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
            <img src="{{ $logo }}" alt="{{ $site['name'] }}" class="invoice-doc__logo">
            <div>
                <p class="invoice-doc__company-name">{{ $company['legal_name'] }}</p>
                <p class="invoice-doc__company-line">{{ $company['subtitle'] }}</p>
                <p class="invoice-doc__company-line">{{ $company['address'] }}</p>
            </div>
        </div>
        <h2 class="invoice-doc__title">
            @if ($live)
                <span x-text="docTitle"></span>
            @else
                {{ $docType === 'quote' ? __('dashboard.invoices.quote_heading') : __('dashboard.invoices.invoice_heading') }}
            @endif
        </h2>
    </header>

    <div class="invoice-doc__blocks">
        <section class="invoice-doc__block">
            <h3>{{ __('dashboard.invoices.from') }}</h3>
            <p class="invoice-doc__strong">{{ $company['legal_name'] }}</p>
            <p>{{ $company['subtitle'] }}</p>
            <p>{{ $company['address'] }}</p>
            @if ($company['ice'])
                <p>ICE: {{ $company['ice'] }}</p>
            @endif
        </section>

        <section class="invoice-doc__block">
            <h3>{{ __('dashboard.invoices.to') }}</h3>
            @if ($live)
                <p class="invoice-doc__strong" x-text="clientName || '—'"></p>
                <p x-show="clientAddressLine2" x-text="clientAddressLine2"></p>
                <p><span>{{ __('dashboard.invoices.email_short') }}:</span> <span x-text="clientEmail || '—'"></span></p>
                <p><span>{{ __('dashboard.invoices.phone_short') }}:</span> <span x-text="clientPhone || '—'"></span></p>
                <p x-show="clientIce"><span>ICE:</span> <span x-text="clientIce"></span></p>
            @else
                <p class="invoice-doc__strong">{{ $clientName }}</p>
                @if ($clientAddress)
                    @foreach (preg_split('/\r\n|\r|\n/', $clientAddress) as $line)
                        @if (trim($line) !== '')
                            <p>{{ $line }}</p>
                        @endif
                    @endforeach
                @endif
                @if ($clientEmail)
                    <p><span>{{ __('dashboard.invoices.email_short') }}:</span> {{ $clientEmail }}</p>
                @endif
                @if ($clientPhone)
                    <p><span>{{ __('dashboard.invoices.phone_short') }}:</span> {{ $clientPhone }}</p>
                @endif
                @if ($clientIce)
                    <p><span>ICE:</span> {{ $clientIce }}</p>
                @endif
            @endif
        </section>

        <section class="invoice-doc__block invoice-doc__block--meta">
            <dl class="invoice-doc__meta">
                <div>
                    <dt>{{ __('dashboard.invoices.number_short') }}</dt>
                    <dd>
                        @if ($live)
                            <span x-text="documentNumber"></span>
                        @else
                            {{ $documentNumber }}
                        @endif
                    </dd>
                </div>
                <div>
                    <dt>{{ __('dashboard.invoices.issued_at') }}</dt>
                    <dd>
                        @if ($live)
                            <span x-text="formatIssuedAt()"></span>
                        @else
                            {{ $issuedAt?->format('d/m/Y') }}
                        @endif
                    </dd>
                </div>
                <div>
                    <dt>{{ __('dashboard.invoices.trip_date') }}</dt>
                    <dd>
                        @if ($live)
                            <span x-text="formatTripDate()"></span>
                        @else
                            {{ $tripDate?->format('d/m/Y') ?? '—' }}
                        @endif
                    </dd>
                </div>
                <div>
                    <dt>{{ __('dashboard.invoices.trip_time') }}</dt>
                    <dd>
                        @if ($live)
                            <span x-text="formatTripTime()"></span>
                        @else
                            {{ $tripTime ? str_replace(':', 'h', $tripTime) : '—' }}
                        @endif
                    </dd>
                </div>
            </dl>
        </section>
    </div>

    <table class="invoice-doc__table">
        <thead>
            <tr>
                <th>ID</th>
                <th>{{ __('dashboard.invoices.description') }}</th>
                <th>{{ __('dashboard.invoices.qty_short') }}</th>
                <th>{{ __('dashboard.invoices.unit_short') }} MAD</th>
                <th>{{ __('dashboard.invoices.line_total_short') }} MAD</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>
                    @if ($live)
                        <span x-text="description || @js($company['default_description'])"></span>
                    @else
                        {{ $description }}
                    @endif
                </td>
                <td>
                    @if ($live)
                        <span x-text="quantity"></span>
                    @else
                        {{ $quantity }}
                    @endif
                </td>
                <td>
                    @if ($live)
                        <span x-text="formatMoney(unitPrice)"></span>
                    @else
                        {{ number_format($unitPrice, 2, ',', ' ') }}
                    @endif
                </td>
                <td>
                    @if ($live)
                        <span x-text="formatMoney(subtotal)"></span>
                    @else
                        {{ number_format($subtotal, 2, ',', ' ') }}
                    @endif
                </td>
            </tr>
        </tbody>
    </table>

    <div class="invoice-doc__totals">
        @if ($live)
            <div class="invoice-doc__totals-currency">
                <label for="display_currency">{{ __('dashboard.invoices.display_currency') }}</label>
                <select id="display_currency" class="invoice-doc__currency-select" x-model="displayCurrency">
                    @foreach ($currencyOptions as $currency)
                        <option value="{{ $currency['code'] }}">{{ $currency['code'] }} — {{ $currency['label'] }}</option>
                    @endforeach
                </select>
            </div>
        @endif
        <div>
            <span>{{ __('dashboard.invoices.subtotal') }}</span>
            <span>
                @if ($live)
                    <span x-text="formatMoney(displaySubtotal)"></span> <span x-text="displaySymbol"></span>
                @else
                    {{ number_format($subtotal, 2, ',', ' ') }} {{ $displaySymbol }}
                @endif
            </span>
        </div>
        <div>
            <span>
                {{ __('dashboard.invoices.vat') }}
                @if ($live)
                    <span x-text="vatRate"></span>%
                @else
                    ({{ number_format($vatRate, 0) }}%)
                @endif
            </span>
            <span>
                @if ($live)
                    <span x-text="formatMoney(displayVat)"></span> <span x-text="displaySymbol"></span>
                @else
                    {{ number_format($vatAmount, 2, ',', ' ') }} {{ $displaySymbol }}
                @endif
            </span>
        </div>
        <div class="invoice-doc__grand">
            <span>{{ __('dashboard.invoices.total_ttc') }}</span>
            <span>
                @if ($live)
                    <span x-text="formatMoney(displayTotal)"></span> <span x-text="displaySymbol"></span>
                @else
                    {{ number_format($total, 2, ',', ' ') }} {{ $displaySymbol }}
                @endif
            </span>
        </div>
        @if ($live)
            <p class="invoice-doc__totals-note" x-show="displayCurrency !== 'MAD'">
                {{ __('dashboard.invoices.equivalent_note') }}
            </p>
        @elseif (($displayCurrency ?? 'MAD') !== 'MAD')
            <p class="invoice-doc__totals-note">{{ __('dashboard.invoices.equivalent_note') }}</p>
        @endif
    </div>

    <footer class="invoice-doc__footer">
        <p class="invoice-doc__note">{{ __('dashboard.invoices.footer_note') }}</p>
        <div class="invoice-doc__legal">
            <p><strong>{{ __('dashboard.invoices.head_office') }}:</strong> {{ $company['address'] }}</p>
            @if ($company['ice'])
                <p><strong>{{ __('dashboard.invoices.tax_id') }}:</strong> {{ $company['ice'] }}</p>
            @endif
            <p><strong>{{ __('dashboard.invoices.website') }}:</strong> {{ $site['url'] }}</p>
            <p><strong>{{ __('dashboard.invoices.phone_short') }}:</strong> {{ $site['phone_display'] }}</p>
            <p><strong>{{ __('dashboard.invoices.email_short') }}:</strong> {{ $site['email'] }}</p>
        </div>
        <div class="invoice-doc__stamp" aria-hidden="true">
            <strong>{{ $company['legal_name'] }}</strong>
            <span>{{ $company['address'] }}</span>
            <span>{{ $site['phone_display'] }}</span>
        </div>
    </footer>
</article>
