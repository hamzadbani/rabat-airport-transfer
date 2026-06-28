<div>
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input type="search" wire:model.live.debounce.350ms="search" placeholder="{{ __('dashboard.common.search') }}" class="w-full max-w-md rounded-lg border px-3 py-2 text-sm">
        <button wire:click="openCreate" type="button" class="dashboard-btn-primary">{{ __('dashboard.pricing.add') }}</button>
    </div>

    <div class="dashboard-table-wrap">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
            <thead class="bg-slate-50"><tr>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.zone') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.radius') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.city') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.airport') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.day') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.night') }}</th>
                <th class="px-4 py-3 text-left">{{ __('dashboard.pricing.active') }}</th>
                <th class="px-4 py-3 text-right">{{ __('dashboard.common.actions') }}</th>
            </tr></thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($zones as $zone)
                    <tr wire:key="zone-{{ $zone->id }}">
                        <td class="px-4 py-3 font-medium">{{ $zone->name }}</td>
                        <td class="px-4 py-3">{{ $zone->radius_km }} km</td>
                        <td class="px-4 py-3">{{ $zone->city }}</td>
                        <td class="px-4 py-3">{{ $zone->is_airport ? '✓' : '—' }}</td>
                        <td class="px-4 py-3">{{ number_format($zone->day_price, 0) }} {{ $zone->currency }}</td>
                        <td class="px-4 py-3">{{ number_format($zone->night_price, 0) }} {{ $zone->currency }}</td>
                        <td class="px-4 py-3">{{ $zone->is_active ? __('dashboard.common.yes') : __('dashboard.common.no') }}</td>
                        <td class="px-4 py-3 text-right">
                            <button wire:click="openEdit({{ $zone->id }})" class="rounded px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50">{{ __('dashboard.common.edit') }}</button>
                            <button wire:click="delete({{ $zone->id }})" wire:confirm="{{ __('dashboard.common.confirm_delete') }}" class="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50">{{ __('dashboard.common.delete') }}</button>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="8" class="px-4 py-8 text-center text-slate-500">{{ __('dashboard.common.no_results') }}</td></tr>
                @endforelse
            </tbody>
        </table>
        @if ($zones->hasPages())<div class="border-t px-4 py-3">{{ $zones->links() }}</div>@endif
    </div>

    @if ($showForm)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeForm"></div>
            <div class="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
                <div class="border-b px-6 py-4"><h3 class="text-lg font-semibold">{{ $editingId ? __('dashboard.pricing.edit') : __('dashboard.pricing.add') }}</h3></div>
                <form wire:submit="save" class="grid gap-4 px-6 py-4 sm:grid-cols-2">
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.zone') }}</label><input wire:model="name" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.city') }}</label><input wire:model="city" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.region') }}</label><input wire:model="region" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.radius') }}</label><input type="number" step="0.01" wire:model="radius_km" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.day') }}</label><input type="number" step="0.01" wire:model="day_price" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.night') }}</label><input type="number" step="0.01" wire:model="night_price" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.currency') }}</label><select wire:model="currency" class="w-full rounded-lg border px-3 py-2 text-sm"><option value="MAD">MAD</option><option value="EUR">EUR</option><option value="USD">USD</option></select></div>
                    <div class="flex items-center gap-4 pt-6"><label class="flex items-center gap-2 text-sm"><input type="checkbox" wire:model="is_airport"> {{ __('dashboard.pricing.airport') }}</label><label class="flex items-center gap-2 text-sm"><input type="checkbox" wire:model="is_active"> {{ __('dashboard.pricing.active') }}</label></div>
                    <div class="sm:col-span-2"><label class="mb-1 block text-sm font-medium">{{ __('dashboard.pricing.map') }}</label><div id="pricing-map" wire:ignore class="h-64 rounded-lg border"></div><div class="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-500"><span>Lat: {{ $lat }}</span><span>Lng: {{ $lng }}</span></div></div>
                    <div class="flex justify-end gap-2 sm:col-span-2"><button type="button" wire:click="closeForm" class="rounded-lg border px-4 py-2 text-sm">{{ __('dashboard.common.cancel') }}</button><button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{{ __('dashboard.common.save') }}</button></div>
                </form>
            </div>
        </div>
    @endif

    @push('head')
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    @endpush
    @push('scripts')
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            let pricingMap, pricingMarker;
            document.addEventListener('livewire:init', () => {
                Livewire.on('pricing-map-init', ({ lat, lng, componentId }) => {
                    setTimeout(() => {
                        const el = document.getElementById('pricing-map');
                        if (!el || typeof L === 'undefined') return;
                        if (pricingMap) { pricingMap.remove(); pricingMap = null; }
                        pricingMap = L.map(el).setView([lat, lng], 12);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(pricingMap);
                        pricingMarker = L.marker([lat, lng], { draggable: true }).addTo(pricingMap);
                        const component = Livewire.find(componentId);
                        pricingMarker.on('dragend', () => {
                            const p = pricingMarker.getLatLng();
                            component?.setCoordinates(p.lat, p.lng);
                        });
                        pricingMap.on('click', (e) => {
                            pricingMarker.setLatLng(e.latlng);
                            component?.setCoordinates(e.latlng.lat, e.latlng.lng);
                        });
                    }, 200);
                });
            });
        </script>
    @endpush
</div>
