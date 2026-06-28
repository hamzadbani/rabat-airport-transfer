<div>
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
            type="search"
            wire:model.live.debounce.300ms="search"
            placeholder="{{ __('dashboard.common.search') }}"
            class="w-full max-w-md rounded-lg border px-3 py-2 text-sm"
        >
        <button wire:click="openCreate" type="button" class="dashboard-btn-primary">
            {{ __('dashboard.config.add') }}
        </button>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
        @forelse ($configs as $config)
            <div wire:key="quote-config-{{ $config->id }}" class="dashboard-panel !p-4">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <h3 class="font-semibold text-slate-900">{{ $config->name }}</h3>
                        @if ($config->is_default)
                            <span class="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">{{ __('dashboard.config.default') }}</span>
                        @endif
                        @if (! $config->is_active)
                            <span class="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{{ __('dashboard.config.inactive') }}</span>
                        @endif
                    </div>
                    <div class="text-right text-sm font-semibold text-slate-900">
                        {{ number_format($config->unit_price, 2) }} {{ $config->currency }}
                    </div>
                </div>

                @if ($config->description)
                    <p class="mt-2 text-sm text-slate-600">{{ $config->description }}</p>
                @endif

                <dl class="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div><dt class="font-medium text-slate-700">{{ __('dashboard.invoices.vat_rate') }}</dt><dd>{{ number_format($config->vat_rate, 2) }}%</dd></div>
                    <div><dt class="font-medium text-slate-700">EUR → MAD</dt><dd>{{ number_format($config->eur_to_mad, 4) }}</dd></div>
                    <div><dt class="font-medium text-slate-700">USD → MAD</dt><dd>{{ number_format($config->usd_to_mad, 4) }}</dd></div>
                </dl>

                <div class="mt-4 flex flex-wrap gap-2">
                    @unless ($config->is_default)
                        <button wire:click="setDefault({{ $config->id }})" type="button" class="rounded-lg border px-3 py-1.5 text-xs">
                            {{ __('dashboard.config.set_default') }}
                        </button>
                    @endunless
                    <button wire:click="openEdit({{ $config->id }})" type="button" class="rounded-lg border px-3 py-1.5 text-xs">
                        {{ __('dashboard.common.edit') }}
                    </button>
                    <button
                        wire:click="delete({{ $config->id }})"
                        wire:confirm="{{ __('dashboard.common.confirm_delete') }}"
                        type="button"
                        class="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600"
                    >
                        {{ __('dashboard.common.delete') }}
                    </button>
                </div>
            </div>
        @empty
            <p class="col-span-full text-center text-slate-500">{{ __('dashboard.common.no_results') }}</p>
        @endforelse
    </div>

    @if ($configs->hasPages())
        <div class="mt-4">{{ $configs->links() }}</div>
    @endif

    @if ($showForm)
        <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div class="fixed inset-0 bg-slate-900/50" wire:click="closeForm"></div>
            <div class="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
                <div class="border-b px-6 py-4">
                    <h3 class="text-lg font-semibold">
                        {{ $editingId ? __('dashboard.config.edit') : __('dashboard.config.add') }}
                    </h3>
                </div>
                <form wire:submit="save" class="space-y-4 px-6 py-4">
                    <div>
                        <label class="mb-1 block text-sm font-medium">{{ __('dashboard.config.name') }}</label>
                        <input wire:model="name" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                        @error('name') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium">{{ __('dashboard.invoices.description') }}</label>
                        <textarea wire:model="description" rows="3" class="w-full rounded-lg border px-3 py-2 text-sm"></textarea>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label class="mb-1 block text-sm font-medium">{{ __('dashboard.invoices.unit_price') }}</label>
                            <input type="number" step="0.01" min="0" wire:model="unit_price" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium">{{ __('dashboard.reservations.currency') }}</label>
                            <select wire:model="currency" class="w-full rounded-lg border px-3 py-2 text-sm">
                                <option value="MAD">MAD</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium">{{ __('dashboard.invoices.vat_rate') }}</label>
                            <input type="number" step="0.01" min="0" max="100" wire:model="vat_rate" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                        </div>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="mb-1 block text-sm font-medium">EUR → MAD</label>
                            <input type="number" step="0.0001" min="0.0001" wire:model="eur_to_mad" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium">USD → MAD</label>
                            <input type="number" step="0.0001" min="0.0001" wire:model="usd_to_mad" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <label class="inline-flex items-center gap-2 text-sm">
                            <input type="checkbox" wire:model="is_active" class="rounded border-slate-300">
                            {{ __('dashboard.pricing.active') }}
                        </label>
                        <label class="inline-flex items-center gap-2 text-sm">
                            <input type="checkbox" wire:model="is_default" class="rounded border-slate-300">
                            {{ __('dashboard.config.default') }}
                        </label>
                    </div>
                    <div class="flex justify-end gap-2 border-t pt-4">
                        <button type="button" wire:click="closeForm" class="rounded-lg border px-4 py-2 text-sm">{{ __('dashboard.common.cancel') }}</button>
                        <button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{{ __('dashboard.common.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    @endif
</div>
