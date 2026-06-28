<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreInvoiceRequest;
use App\Models\Invoice;
use App\Models\QuoteConfig;
use App\Models\QuoteCurrency;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class InvoiceController extends Controller
{
    public function create(Request $request): View
    {
        $reservation = null;
        if ($request->filled('reservation_id')) {
            $reservation = Reservation::with(['driver', 'organization'])->find($request->integer('reservation_id'));
        }

        $type = $request->query('type', 'invoice');
        if (! in_array($type, ['invoice', 'quote'], true)) {
            $type = 'invoice';
        }

        return view('dashboard.invoices.create', [
            'reservation' => $reservation,
            'type' => $type,
            'documentNumber' => $this->generateDocumentNumber($type),
            'quoteConfig' => QuoteConfig::default(),
            'currencies' => $this->currencyOptions(),
        ]);
    }

    /** @return list<array{code: string, label: string, symbol: string, mad_per_unit: float}> */
    private function currencyOptions(): array
    {
        $options = QuoteCurrency::ordered()
            ->map(fn (QuoteCurrency $currency) => [
                'code' => $currency->code,
                'label' => $currency->label,
                'symbol' => $currency->symbol,
                'mad_per_unit' => (float) $currency->mad_per_unit,
            ])
            ->values()
            ->all();

        return $options !== [] ? $options : [[
            'code' => 'MAD',
            'label' => 'Dirham',
            'symbol' => 'MAD',
            'mad_per_unit' => 1.0,
        ]];
    }

    public function store(StoreInvoiceRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $clientAddress = trim((string) ($validated['client_address_line2'] ?? ''));
        unset($validated['client_address_line2']);
        $validated['client_address'] = $clientAddress !== '' ? $clientAddress : null;

        $issuedAt = isset($validated['issued_at'])
            ? \Illuminate\Support\Carbon::parse($validated['issued_at'])->startOfDay()
            : now();

        unset($validated['issued_at']);

        $invoice = Invoice::create([
            ...$validated,
            'document_number' => $this->generateDocumentNumber($validated['type']),
            'issued_at' => $issuedAt,
        ]);

        return redirect()
            ->route('dashboard.invoices.print', $invoice)
            ->with('success', __('dashboard.invoices.saved'));
    }

    public function print(Invoice $invoice): View
    {
        return view('dashboard.invoices.print', compact('invoice'));
    }

    private function generateDocumentNumber(string $type): string
    {
        $prefix = $type === 'quote' ? 'DEV' : 'FAC';

        return $prefix.'-'.now()->format('Ymd-Hi');
    }
}
