<div>
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
            type="search"
            wire:model.live.debounce.300ms="search"
            placeholder="{{ __('dashboard.common.search') }}"
            class="w-full max-w-md rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
        <button wire:click="openCreate" type="button" class="dashboard-btn-primary">
            {{ __('dashboard.actions.new_reservation') }}
        </button>
    </div>

    <div class="dashboard-table-wrap">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200 text-sm">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.client') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.route') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.flight') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.datetime') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.driver') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.price') }}</th>
                        <th class="px-4 py-3 text-left font-medium text-slate-600">{{ __('dashboard.reservations.status') }}</th>
                        <th class="px-4 py-3 text-right font-medium text-slate-600">{{ __('dashboard.common.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse ($reservations as $reservation)
                        <tr wire:key="res-{{ $reservation->id }}" class="hover:bg-slate-50">
                            <td class="px-4 py-3">
                                <div class="font-medium text-slate-900">{{ $reservation->client_name }}</div>
                                <div class="text-xs text-slate-500">{{ $reservation->client_phone }}</div>
                            </td>
                            <td class="max-w-xs px-4 py-3 text-slate-600">
                                <div class="truncate">{{ $reservation->pickup_address }}</div>
                                <div class="truncate text-xs">→ {{ $reservation->dropoff_address }}</div>
                            </td>
                            <td class="px-4 py-3 text-slate-600">{{ $reservation->flight_number ?: '—' }}</td>
                            <td class="px-4 py-3 text-slate-600">{{ $reservation->date?->format('d/m/Y H:i') }}</td>
                            <td class="px-4 py-3 text-slate-600">{{ $reservation->driver?->name ?? $reservation->driver_name }}</td>
                            <td class="px-4 py-3 font-medium">{{ number_format($reservation->price, 0) }} MAD</td>
                            <td class="px-4 py-3"><x-dashboard.status-badge :status="$reservation->status" /></td>
                            <td class="px-4 py-3 text-right">
                                <div class="flex flex-wrap justify-end gap-1">
                                    <button wire:click="openDetail({{ $reservation->id }})" class="rounded px-2 py-1 text-xs text-slate-600 hover:bg-slate-100">{{ __('dashboard.common.view') }}</button>
                                    <button wire:click="openEdit({{ $reservation->id }})" class="rounded px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50">{{ __('dashboard.common.edit') }}</button>
                                    <button wire:click="delete({{ $reservation->id }})" wire:confirm="{{ __('dashboard.common.confirm_delete') }}" class="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50">{{ __('dashboard.common.delete') }}</button>
                                    <a href="{{ route('dashboard.invoices.create', ['reservation_id' => $reservation->id, 'type' => 'invoice']) }}" class="rounded px-2 py-1 text-xs text-indigo-700 hover:bg-indigo-50">{{ __('dashboard.reservations.invoice') }}</a>
                                    <a href="{{ route('dashboard.invoices.create', ['reservation_id' => $reservation->id, 'type' => 'quote']) }}" class="rounded px-2 py-1 text-xs text-indigo-700 hover:bg-indigo-50">{{ __('dashboard.reservations.quote') }}</a>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8" class="px-4 py-8 text-center text-slate-500">{{ __('dashboard.common.no_results') }}</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        @if ($reservations->hasPages())
            <div class="border-t border-slate-200 px-4 py-3">{{ $reservations->links() }}</div>
        @endif
    </div>

    @if ($showForm)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeModals"></div>
            <div class="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-between border-b px-6 py-4">
                    <h3 class="text-lg font-semibold">{{ $editingId ? __('dashboard.reservations.edit') : __('dashboard.reservations.create') }}</h3>
                    <button type="button" wire:click="closeModals" class="text-2xl text-slate-400">&times;</button>
                </div>
                <form wire:submit="save" class="grid gap-4 px-6 py-4 sm:grid-cols-2">
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.client') }}</label><input wire:model="client_name" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.phone') }}</label><input wire:model="client_phone" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div class="sm:col-span-2"><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.pickup') }}</label><input wire:model="pickup_address" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div class="sm:col-span-2"><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.dropoff') }}</label><input wire:model="dropoff_address" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.flight') }}</label><input wire:model="flight_number" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.date') }}</label><input type="date" wire:model="trip_date" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.time') }}</label><input type="time" wire:model="trip_time" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.price') }}</label><input type="number" step="0.01" wire:model="price" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.currency') }}</label><select wire:model="currency" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="MAD">MAD</option><option value="EUR">EUR</option><option value="USD">USD</option></select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.passengers') }}</label><input type="number" min="1" wire:model="passengers" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.children') }}</label><input type="number" min="0" wire:model="children" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.driver') }}</label><select wire:model="driver_id" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="">{{ __('dashboard.reservations.unassigned') }}</option>@foreach($drivers as $d)<option value="{{ $d->id }}">{{ $d->name }}</option>@endforeach</select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.organization') }}</label><select wire:model="organization_id" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="">{{ __('dashboard.common.none') }}</option>@foreach($organizations as $o)<option value="{{ $o->id }}">{{ $o->name }}</option>@endforeach</select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.status') }}</label><select wire:model="reservation_status" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="planned">{{ __('dashboard.status.planned') }}</option><option value="confirmed">{{ __('dashboard.status.confirmed') }}</option><option value="cancelled">{{ __('dashboard.status.cancelled') }}</option></select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.trip_mode') }}</label><select wire:model="trip_mode" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="one_way">{{ __('dashboard.reservations.one_way') }}</option><option value="round_trip">{{ __('dashboard.reservations.round_trip') }}</option></select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.source') }}</label><select wire:model="source" class="w-full rounded-lg border px-3 py-2 text-sm">@foreach(__('dashboard.reservations.sources') as $value => $label)<option value="{{ $value }}">{{ $label }}</option>@endforeach</select></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.baggage') }}</label><input wire:model="baggage" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div class="sm:col-span-2"><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.notes') }}</label><textarea wire:model="notes" rows="2" class="w-full rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    <div class="flex justify-end gap-2 sm:col-span-2">
                        <button type="button" wire:click="closeModals" class="rounded-lg border px-4 py-2 text-sm">{{ __('dashboard.common.cancel') }}</button>
                        <button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{{ __('dashboard.common.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    @endif

    @if ($showDetail && $detail)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeModals"></div>
            <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-between border-b px-6 py-4">
                    <h3 class="text-lg font-semibold">{{ $detail->client_name }}</h3>
                    <button type="button" wire:click="closeModals" class="text-2xl text-slate-400">&times;</button>
                </div>
                <div class="space-y-3 px-6 py-4 text-sm">
                    <p><strong>{{ __('dashboard.reservations.phone') }}:</strong> {{ $detail->client_phone }}</p>
                    <p><strong>{{ __('dashboard.reservations.route') }}:</strong> {{ $detail->pickup_address }} → {{ $detail->dropoff_address }}</p>
                    <p><strong>{{ __('dashboard.reservations.flight') }}:</strong> {{ $detail->flight_number ?: '—' }}</p>
                    <p><strong>{{ __('dashboard.reservations.datetime') }}:</strong> {{ $detail->date?->format('d/m/Y H:i') }}</p>
                    <p><strong>{{ __('dashboard.reservations.passengers') }}:</strong> {{ $detail->passengers }} / {{ __('dashboard.reservations.children') }}: {{ $detail->children }}</p>
                    <p><strong>{{ __('dashboard.reservations.baggage') }}:</strong> {{ $detail->baggage ?: '—' }}</p>
                    <p><strong>{{ __('dashboard.reservations.driver') }}:</strong> {{ $detail->driver?->name ?? $detail->driver_name }}</p>
                    <p><strong>{{ __('dashboard.reservations.price') }}:</strong> {{ number_format($detail->price, 2) }} {{ $detail->currency }}</p>
                    <p><x-dashboard.status-badge :status="$detail->status" /></p>
                </div>
                <div class="flex flex-wrap gap-2 border-t px-6 py-4">
                    @if ($detail->driver?->phone)
                        <a href="https://wa.me/{{ preg_replace('/\D/', '', $detail->driver->phone) }}?text={{ urlencode(__('dashboard.reservations.whatsapp_msg', ['client' => $detail->client_name, 'route' => $detail->pickup_address.' → '.$detail->dropoff_address, 'time' => $detail->date?->format('d/m/Y H:i')])) }}" target="_blank" class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">WhatsApp</a>
                    @endif
                    <button wire:click="openEdit({{ $detail->id }})" class="rounded-lg border px-3 py-2 text-xs">{{ __('dashboard.common.edit') }}</button>
                    <a href="{{ route('dashboard.invoices.create', ['reservation_id' => $detail->id, 'type' => 'invoice']) }}" class="rounded-lg border px-3 py-2 text-xs">{{ __('dashboard.reservations.invoice') }}</a>
                    <a href="{{ route('dashboard.invoices.create', ['reservation_id' => $detail->id, 'type' => 'quote']) }}" class="rounded-lg border px-3 py-2 text-xs">{{ __('dashboard.reservations.quote') }}</a>
                </div>
            </div>
        </div>
    @endif
</div>
