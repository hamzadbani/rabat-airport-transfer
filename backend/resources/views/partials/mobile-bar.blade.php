@php
    $section = fn (string $id) => route('home')."#{$id}";
@endphp
<a href="{{ $section('accueil') }}"
    class="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 text-sm font-bold text-brand backdrop-blur safe-area-pb lg:hidden"
    aria-label="{{ __('site.mobile_bar.book') }}">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M9 16l2 2 4-4"/></svg>
    {{ __('site.mobile_bar.book') }}
</a>
