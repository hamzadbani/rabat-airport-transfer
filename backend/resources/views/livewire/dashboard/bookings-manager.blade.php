<div>
    <div class="dashboard-panel mb-6">
        <div class="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div><label class="mb-1 block text-xs font-medium text-slate-500">{{ __('dashboard.bookings.from') }}</label><input type="date" wire:model.live="dateFrom" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
            <div><label class="mb-1 block text-xs font-medium text-slate-500">{{ __('dashboard.bookings.to') }}</label><input type="date" wire:model.live="dateTo" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
            <div class="sm:col-span-2"><label class="mb-1 block text-xs font-medium text-slate-500">{{ __('dashboard.bookings.company') }}</label><select wire:model.live="organizationId" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="">{{ __('dashboard.bookings.all_companies') }}</option>@foreach($organizations as $o)<option value="{{ $o->id }}">{{ $o->name }}</option>@endforeach</select></div>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
                <thead><tr class="border-b text-left text-slate-500"><th class="py-2 pr-4">{{ __('dashboard.bookings.company') }}</th><th class="py-2 pr-4">{{ __('dashboard.reservations.phone') }}</th><th class="py-2 pr-4">{{ __('dashboard.bookings.trips') }}</th><th class="py-2 pr-4">{{ __('dashboard.bookings.revenue') }}</th><th class="py-2">{{ __('dashboard.common.actions') }}</th></tr></thead>
                <tbody>
                    @foreach ($partnerStats as $partner)
                        @php
                            $waPhone = preg_replace('/\D/', '', $partner->phone);
                            $waText = urlencode(__('dashboard.bookings.whatsapp_billing', [
                                'company' => $partner->name,
                                'trips' => $partner->trip_count,
                                'total' => number_format($partner->total_revenue ?? 0, 0),
                                'from' => $dateFrom,
                                'to' => $dateTo,
                            ]));
                        @endphp
                        <tr class="border-b border-slate-100" wire:key="partner-{{ $partner->id }}">
                            <td class="py-3 pr-4 font-medium">{{ $partner->name }}</td>
                            <td class="py-3 pr-4">{{ $partner->phone ?: '—' }}</td>
                            <td class="py-3 pr-4">{{ $partner->trip_count }}</td>
                            <td class="py-3 pr-4">{{ number_format($partner->total_revenue ?? 0, 0) }} MAD</td>
                            <td class="py-3">@if($waPhone)<a href="https://wa.me/{{ $waPhone }}?text={{ $waText }}" target="_blank" class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">WhatsApp</a>@endif</td>
                        </tr>
                    @endforeach
                    <tr class="bg-slate-50 font-semibold"><td class="py-3 pr-4" colspan="3">{{ __('dashboard.bookings.grand_total') }}</td><td class="py-3 pr-4">{{ number_format($grandTotal, 0) }} MAD</td><td></td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="mb-4"><input type="search" wire:model.live.debounce.300ms="search" placeholder="{{ __('dashboard.common.search') }}" class="w-full max-w-md rounded-lg border px-3 py-2 text-sm"></div>

    <div class="dashboard-table-wrap">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
            <thead class="bg-slate-50"><tr>
                <th class="px-4 py-3 text-left">{{ __('dashboard.reservations.client') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.bookings.company') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.reservations.route') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.reservations.datetime') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.reservations.price') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.reservations.status') }}</th>
            </tr></thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($bookings as $booking)
                    <tr wire:key="booking-{{ $booking->id }}">
                        <td class="px-4 py-3">{{ $booking->client_name }}</td>
                        <td class="px-4 py-3">{{ $booking->organization?->name }}</td>
                        <td class="px-4 py-3 max-w-xs truncate">{{ $booking->pickup_address }} → {{ $booking->dropoff_address }}</td>
                        <td class="px-4 py-3">{{ $booking->date?->format('d/m/Y H:i') }}</td>
                        <td class="px-4 py-3">{{ number_format($booking->price, 0) }} MAD</td>
                        <td class="px-4 py-3"><x-dashboard.status-badge :status="$booking->status" /></td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-4 py-8 text-center text-slate-500">{{ __('dashboard.common.no_results') }}</td></tr>
                @endforelse
            </tbody>
        </table>
        @if ($bookings->hasPages())<div class="border-t px-4 py-3">{{ $bookings->links() }}</div>@endif
    </div>
</div>
