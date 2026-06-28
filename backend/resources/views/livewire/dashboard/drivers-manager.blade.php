<div>
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input type="search" wire:model.live.debounce.300ms="search" placeholder="{{ __('dashboard.common.search') }}" class="w-full max-w-md rounded-lg border px-3 py-2 text-sm">
        <button wire:click="openCreate" type="button" class="dashboard-btn-primary">{{ __('dashboard.drivers.add') }}</button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        @forelse ($drivers as $driver)
            <div wire:key="driver-{{ $driver->id }}" class="dashboard-panel !p-4">
                <div class="flex items-start gap-4">
                    @if ($driver->photoUrl())
                        <img src="{{ $driver->photoUrl() }}" alt="" class="h-16 w-16 rounded-full object-cover">
                    @else
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-600">{{ strtoupper(substr($driver->name, 0, 1)) }}</div>
                    @endif
                    <div class="min-w-0 flex-1">
                        <h3 class="font-semibold text-slate-900">{{ $driver->name }}</h3>
                        <p class="text-sm text-amber-600">★ {{ number_format($driver->rating, 2) }}</p>
                        <p class="mt-1 text-sm text-slate-600">{{ $driver->vehicle }}</p>
                        <a href="tel:{{ $driver->phone }}" class="mt-1 block text-sm text-emerald-700">{{ $driver->phone }}</a>
                    </div>
                </div>
                <div class="mt-4 flex gap-2">
                    <button wire:click="openEdit({{ $driver->id }})" class="rounded-lg border px-3 py-1.5 text-xs">{{ __('dashboard.common.edit') }}</button>
                    <button wire:click="delete({{ $driver->id }})" wire:confirm="{{ __('dashboard.common.confirm_delete') }}" class="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600">{{ __('dashboard.common.delete') }}</button>
                </div>
            </div>
        @empty
            <p class="col-span-full text-center text-slate-500">{{ __('dashboard.common.no_results') }}</p>
        @endforelse
    </div>
    @if ($drivers->hasPages())<div class="mt-4">{{ $drivers->links() }}</div>@endif

    @if ($showForm)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeForm"></div>
            <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
                <div class="border-b px-6 py-4"><h3 class="text-lg font-semibold">{{ $editingId ? __('dashboard.drivers.edit') : __('dashboard.drivers.add') }}</h3></div>
                <form wire:submit="save" class="space-y-4 px-6 py-4">
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.photo') }}</label><input type="file" wire:model="photo" accept="image/*" class="w-full text-sm">@if($photo)<p class="mt-1 text-xs text-slate-500">{{ __('dashboard.drivers.preview') }}</p>@endif @if($existingPhoto && !$photo)<img src="{{ $existingPhoto }}" class="mt-2 h-20 w-20 rounded-full object-cover">@endif</div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.name') }}</label><input wire:model="name" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.phone') }}</label><input wire:model="phone" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.vehicle') }}</label><input wire:model="vehicle" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.rating') }}</label><input type="number" step="0.01" min="0" max="5" wire:model="rating" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.notes') }}</label><textarea wire:model="notes" rows="2" class="w-full rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    <div class="flex justify-end gap-2"><button type="button" wire:click="closeForm" class="rounded-lg border px-4 py-2 text-sm">{{ __('dashboard.common.cancel') }}</button><button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{{ __('dashboard.common.save') }}</button></div>
                </form>
            </div>
        </div>
    @endif
</div>
