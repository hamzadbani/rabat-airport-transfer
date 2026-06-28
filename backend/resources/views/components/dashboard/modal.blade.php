@props(['title' => null, 'show' => false])

@if ($show)
    <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" x-data x-trap.noscroll="true">
        <div class="fixed inset-0 bg-slate-900/50" wire:click="closeModals"></div>
        <div class="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            @if ($title)
                <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h3 class="text-lg font-semibold text-slate-900">{{ $title }}</h3>
                    <button type="button" wire:click="closeModals" class="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">&times;</button>
                </div>
            @endif
            <div class="px-6 py-4">{{ $slot }}</div>
        </div>
    </div>
@endif
