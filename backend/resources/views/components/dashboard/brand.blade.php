@props(['variant' => 'sidebar'])

@php
    $name = config('site.name');
    $tagline = config('site.tagline');
    $logo = config('site.logo', '/assets/new-logo-taxi-rabat-removebg-preview.png');
@endphp

@if ($variant === 'sidebar')
    <div class="relative flex h-[4.25rem] shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <img src="{{ $logo }}" alt="{{ $name }}" class="h-10 w-auto max-w-[2.75rem] object-contain object-left">
        <div class="min-w-0 flex-1">
            <p class="truncate text-[15px] font-semibold text-white">{{ $name }}</p>
            <p class="truncate text-[11px] text-slate-400">{{ $tagline }}</p>
        </div>
        <button
            type="button"
            class="ml-auto inline-flex rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            data-dashboard-sidebar-close
            aria-label="{{ __('dashboard.nav.close_menu') }}"
        >
            <x-dashboard.icon name="close" class="h-5 w-5" />
        </button>
    </div>
@else
    <div class="mb-8 text-center">
        <img src="{{ $logo }}" alt="{{ $name }}" class="mx-auto mb-4 h-16 w-auto max-w-[220px] object-contain">
        <h1 class="font-display text-2xl font-semibold text-slate-900">{{ $name }}</h1>
        <p class="mt-1 text-sm text-slate-500">{{ __('dashboard.auth.subtitle', ['name' => $name]) }}</p>
    </div>
@endif
