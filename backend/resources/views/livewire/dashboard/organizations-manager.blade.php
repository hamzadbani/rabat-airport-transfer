<div>
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input type="search" wire:model.live.debounce.300ms="search" placeholder="{{ __('dashboard.common.search') }}" class="w-full max-w-md rounded-lg border px-3 py-2 text-sm">
        <button wire:click="openCreate" type="button" class="dashboard-btn-primary">{{ __('dashboard.organizations.add') }}</button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        @forelse ($organizations as $org)
            <div wire:key="org-{{ $org->id }}" class="dashboard-panel !p-4">
                <h3 class="font-semibold text-slate-900">{{ $org->name }}</h3>
                @if ($org->phone)<a href="tel:{{ $org->phone }}" class="mt-1 block text-sm text-emerald-700">{{ $org->phone }}</a>@endif
                @if ($org->notes)<p class="mt-2 text-sm text-slate-600">{{ $org->notes }}</p>@endif
                <div class="mt-4 flex gap-2">
                    <button wire:click="openEdit({{ $org->id }})" class="rounded-lg border px-3 py-1.5 text-xs">{{ __('dashboard.common.edit') }}</button>
                    <button wire:click="delete({{ $org->id }})" wire:confirm="{{ __('dashboard.common.confirm_delete') }}" class="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600">{{ __('dashboard.common.delete') }}</button>
                </div>
            </div>
        @empty
            <p class="col-span-full text-center text-slate-500">{{ __('dashboard.common.no_results') }}</p>
        @endforelse
    </div>
    @if ($organizations->hasPages())<div class="mt-4">{{ $organizations->links() }}</div>@endif

    @if ($showForm)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeForm"></div>
            <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl">
                <div class="border-b px-6 py-4"><h3 class="text-lg font-semibold">{{ $editingId ? __('dashboard.organizations.edit') : __('dashboard.organizations.add') }}</h3></div>
                <form wire:submit="save" class="space-y-4 px-6 py-4">
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.organizations.name') }}</label><input wire:model="name" class="w-full rounded-lg border px-3 py-2 text-sm" required></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.phone') }}</label><input wire:model="phone" class="w-full rounded-lg border px-3 py-2 text-sm"></div>
                    <div><label class="mb-1 block text-sm font-medium">{{ __('dashboard.drivers.notes') }}</label><textarea wire:model="notes" rows="3" class="w-full rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    <div class="flex justify-end gap-2"><button type="button" wire:click="closeForm" class="rounded-lg border px-4 py-2 text-sm">{{ __('dashboard.common.cancel') }}</button><button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{{ __('dashboard.common.save') }}</button></div>
                </form>
            </div>
        </div>
    @endif
</div>
