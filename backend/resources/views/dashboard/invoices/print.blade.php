<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $invoice->document_number }}</title>
    <link href="https://fonts.bunny.net/css?family=libre-baskerville:700|dm-sans:400,500,600" rel="stylesheet">
    @vite(['resources/css/app.css'])
    <style>
        body {
            margin: 0;
            padding: 1.5rem;
            background: #eef2f7;
            font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        }

        @media print {
            body { padding: 0; background: #fff; }
            .invoice-print-actions { display: none !important; }
            .invoice-preview-panel { padding: 0; background: #fff; }
            .invoice-doc { box-shadow: none; max-width: none; }
        }
    </style>
</head>
<body>
    <div class="invoice-print-actions" style="max-width: 920px; margin: 0 auto 1rem; display: flex; gap: 0.75rem;">
        <a href="{{ route('dashboard.invoices.create') }}" class="invoice-btn-secondary">{{ __('dashboard.invoices.back_editor') }}</a>
        <button type="button" class="invoice-btn-primary" onclick="window.print()">{{ __('dashboard.invoices.print_pdf') }}</button>
    </div>

    <div class="invoice-preview-panel" style="min-height: auto;">
        <x-dashboard.invoice-document :invoice="$invoice" />
    </div>
</body>
</html>
